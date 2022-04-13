import ReactModal from "react-modal";
import React, {useState} from "react";
import {Subjects} from "./searchBar/Subjects";
import {Grades} from "./searchBar/Grades";
import {Location} from "./Location";
import "../stylesheets/TutorProfileForm.css";
import {useStateContext} from "../contexts/StateContextProvider";

export const TutorProfileForm = (props) => {
    const {user, setUser} = useStateContext();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [grades, setGrades] = useState([]);
    const [wage, setWage] = useState(0);

    const createProfile = async (event) => {
        event.preventDefault();

        props.onHide();
        const res = await fetch(`http://localhost:8080/tutor/add`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, location, phone, grades, subjects, "min_wage": wage}),
        });
        setUser(await res.json());
    }
    return (
        <ReactModal
            isOpen={props.show}
            onRequestClose={() => props.onHide()}
            className="TutorProfileForm"
            overlayClassName="TutorProfileFormOverlay"
        >
            <form onSubmit={createProfile} className="optionsContainer">
                <div className="d-inline-flex">
                    <p className="align-self-center me-5">Name:</p>&nbsp;&nbsp;
                    <input name="name" type="text" onChange={(event) => setName(event.target.value)}/>
                </div>
                <div className="d-inline-flex">
                    <p className="align-self-center me-5">Phone:</p>&nbsp;&nbsp;
                    <input name="phone" type="text" onChange={(event) => setPhone(event.target.value)}/>
                </div>
                <div className="d-inline-flex">
                    <p className="align-self-center me-5">Location:</p>&nbsp;&nbsp;
                    <Location allowNewValues={true} onLocationChange={setLocation} />
                </div>
                <div className="d-inline-flex">
                    <p className="align-self-center me-5">Subjects:</p>&nbsp;&nbsp;
                    <Subjects allowNewValues={true} subjects={[]} onSubjectChange={setSubjects} />
                </div>
                <div className="d-inline-flex">
                    <p className="align-self-center me-5">Grades:</p>&nbsp;&nbsp;
                    <Grades allowNewValues={true} grades={[]} onGradeChange={setGrades} />
                </div>
                <div className="d-inline-flex">
                    <p className="align-self-center me-5">Wages:</p>
                    <input name="wage" type="number" onChange={(event) => setWage(event.target.value)}/>
                </div>
                <div className="d-inline-flex">
                    <button className="button" type="submit">Submit</button>
                    <button className="button" type="button" onClick={() => props.onHide()}>Cancel</button>
                </div>
            </form>
        </ReactModal>
    );
}