import React, { createContext, useContext, useEffect, useState } from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import {useStateContext} from "./StateContextProvider";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const {user} = useStateContext();
    const [messages, setMessages] = useState(new Map());
    const [contactData, setContactData] = useState(new Map());
    const [stompClient, setStompClient] = useState(null);
    const [receiver, setReceiver] = useState(null);

    useEffect(() => {
        if (receiver && !messages.get(receiver.id)) {
            messages.set(receiver.id, []);
            setMessages(new Map(messages));
        }
        if (receiver) {
            markAsRead(receiver.id);
            downloadContactData(receiver.id);
        }
    }, [receiver])

    useEffect(() => {
        if(user.id != undefined)    onLogin();
        else                        onLogout();
    }, [user]);

    useEffect(() => {
        if(stompClient) stompClient.connect({"userID": user.id}, onConnected, onError);
    }, [stompClient]);

    const onError = (err) => {
        console.log(err);
    }

    const onConnected = () => {
        stompClient.subscribe(`/user/${user.id}/messages`, onNewMessage);
        stompClient.subscribe(`/user/${user.id}/messageUpdate`, onMessageUpdate);
        stompClient.subscribe(`/user/${user.id}/contactStatusUpdate`, updateContactStatus);
        retrieveMessages(user);
    }

    const onLogin = () => {
        let client = over(new SockJS(`${process.env.REACT_APP_BASE_URL}/ws`));
        client.debug = null;   // disable log messages
        setStompClient(client);
    }

    const onLogout = () => {
        if (!stompClient)   return;
        stompClient.disconnect();
        setStompClient(null);
        setMessages(new Map());
        setContactData(new Map());
    }

    const onMessageUpdate = (payload) => {
        var payload = JSON.parse(payload.body);
        var messageList = messages.get(payload.receiverID);
        for(const message of messageList) {
            if (message.status == "SENT")   message.status = payload.status;
            if (message.status == "DELIVERED" && payload.status == "READ")  message.status = payload.status;
        }
        messages.set(payload.receiverID, messageList);
        setMessages(new Map(messages));
    }

    const updateContactStatus = (payload) => {
        var userID = JSON.parse(payload.body);
        contactData.delete(userID);
        downloadContactData(userID, true);
    }

    const downloadContactData = async (userID, force=false) => {
        if (!force && contactData.get(userID))  return;
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userID}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        });
        contactData.set(userID, await res.json());
        setContactData(new Map(contactData));
    }

    const retrieveMessages = async () => {
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/message/getMessages?userID=${user.id}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });

          var senders = new Set();

          const data = await res.json();
          data.map((item, index) => {
              downloadContactData(item.senderID);
              downloadContactData(item.receiverID);
              if (item.status == "SENT" && item.senderID != user.id) {
                item.status = "DELIVERED";
                senders.add(item.senderID);
              }
              let key = item.senderID === user.id ? item.receiverID : item.senderID;
              if(messages.get(key)) {
                  messages.get(key).push(item);
                  setMessages(new Map(messages));
              }
              else {
                  let list = [item];
                  messages.set(key, list);
                  setMessages(new Map(messages));
              }
          });

          for(const sender of senders) {
            if (receiver && sender == receiver.id)  markAsRead(sender);
            else    markAsDelievered(sender);
          }

    }

    const markAsDelievered = (senderID) => {
        stompClient.send("/chat/markAsDelivered", {}, JSON.stringify(senderID));
    }

    const markAsRead = (senderID) => {
        const hasUnread = messages.get(senderID).some((message) => message.status != "READ");
        if (!hasUnread) return;
        stompClient.send("/chat/markAsRead", {}, JSON.stringify(senderID));
    }
    
    const onNewMessage = (payload) => {
        var payloadData = JSON.parse(payload.body);
        
        if (receiver && payloadData.senderID == receiver.id)  markAsRead(payloadData.senderID);
        else    markAsDelievered(payloadData.senderID);
        
        downloadContactData(payloadData.senderID);
        if(messages.get(payloadData.senderID)) {
            messages.get(payloadData.senderID).push(payloadData);
            setMessages(new Map(messages));
        }
        else {
            let list = [];
            list.push(payloadData);
            messages.set(payloadData.senderID, list);
            setMessages(new Map(messages));
        }
    }

    const sendMessage = async(message) => {
        if (!stompClient || !receiver)   return;
        var chatMessage = {
            senderID: user.id,
            receiverID: receiver.id,
            message: message,
            status: "SENT"
        };

        if(user.id !== receiver.id) {
            messages.get(receiver.id).push(chatMessage);
            setMessages(new Map(messages));
        }

        stompClient.send("/chat/messages", {}, JSON.stringify(chatMessage));
    }

    return (
        <ChatContext.Provider value={{
            messages, contactData, sendMessage, receiver, setReceiver
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => useContext(ChatContext);
