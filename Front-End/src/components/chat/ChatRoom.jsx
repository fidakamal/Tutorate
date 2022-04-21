import React, {useEffect, useState} from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../stylesheets/ChatRoom.css";
import {useStateContext} from "../../contexts/StateContextProvider";
import {ContactList} from "./ContactList";
import {useLocation} from "react-router-dom";

var stompClient = null;
export const ChatRoom = () => {
    const location = useLocation();
    const {user} = useStateContext();
    const [messages, setMessages] = useState(new Map());
    const [receiver, setReceiver] = useState(location.state ? location.state.receiver : "");
    const [connected, setConnected] = useState(false);
    const [input, setInput] = useState("");

    useEffect(async () => {
        connect();
    }, [])

    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onError = (err) => {
        console.log(err);
    }

    const onConnected = () => {
        setConnected(true);
        stompClient.subscribe('/user/' + user.username + '/private', onPrivateMessage);
        userJoin();
    }

    const userJoin = async () => {
          let chatMessage = {
            senderName: user.username,
            status: "JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));

          const res = await fetch(`http://localhost:8080/message/prefetch?name=${user.username}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });

          const data = await res.json();
          data.map((item, index) => {
              let key = item.senderName === user.username ? item.receiverName : item.senderName;
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

          if (receiver !== "" && !messages.get(receiver)) {
              messages.set(receiver, []);
              setMessages(new Map(messages));
          }
    }
    
    const onPrivateMessage = (payload) => {
        if(payload.status != "OTHERS") {
            var payloadData = JSON.parse(payload.body);
            if(messages.get(payloadData.senderName)) {
                messages.get(payloadData.senderName).push(payloadData);
                setMessages(new Map(messages));
            }
            else {
                let list = [];
                list.push(payloadData);
                messages.set(payloadData.senderName, list);
                setMessages(new Map(messages));
            }
        }
        else {
            if(!messages.get(payloadData.senderName)) {
                messages.set(payloadData.senderName,[]);
                setMessages(new Map(messages));
            }
        }
    }

    const handleMessage = (event) => {
        const {value} = event.target;
        setInput(value);
    }

    const sendMessage = async() => {
        if (stompClient) {
            var chatMessage = {
                senderName: user.username,
                receiverName: receiver,
                message: input,
                status: "MESSAGE"
            };
            if(user.username !== receiver) {
                messages.get(receiver).push(chatMessage);
                setMessages(new Map(messages));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setInput("");
        }
    }

    return (
        <div className="chat-box">
            <ContactList contacts={[ ...messages.keys()]} selectContact={setReceiver}/>
            {receiver !== "" && messages.get(receiver) && <div className="chat-content">
                <ul className="chat-messages">
                    {[...messages.get(receiver)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === user.username && "self"}`} key={index}>
                            {chat.senderName !== user.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === user.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>
                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={input} onChange={handleMessage} />
                    <button type="button" className="send-button" onClick={sendMessage}>send</button>
                </div>
            </div>}
        </div>
    )
}