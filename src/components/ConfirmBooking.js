import { doc, updateDoc, addDoc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";


function ConfirmBooking({roomNumber, roomID, userUID, modalID, username}) {

    const dayjs = require('dayjs');
    //import dayjs from 'dayjs' // ES 2015
    dayjs().format();


    const navigate = useNavigate();
    const [bookingTime, setBookingTime] = useState();
    const [bookingNote, setBookingNote] = useState();

    const addBooking = async() => {

        //change value in rooms collection
        const roomDoc = doc(db, "rooms", roomID);
        const newFields = {
            occupied: true
        }
        await updateDoc(roomDoc, newFields);

        //add booking to bookings collection
        try{
            await addDoc(collection(db, "bookings"), {
                roomID: roomID,
                userUID: userUID,
                username: username,
                timestamp: Date(serverTimestamp().seconds*1000),
                bookUntil: bookingTime,
                bookingNote: bookingNote
            });
        } catch(e) {
            alert("please enter a time")
        }


        navigate("../pages/bookings")
    }
    
    return (
        <>
            {/* The button to open modal */}
            <label htmlFor={modalID} className="btn">book</label>

            <input type="checkbox" id={modalID} className="modal-toggle" />
            <div className="modal">
            <div className="modal-box">
                <h3 className="font-normal text-lg">Confirm booking for room <span className="font-bold">{roomNumber}</span>?</h3>
                <div className="divider"></div>

                <div className="block">
                    <label className="font-normal text-md pr-3">Book until:</label>
                    <input type="datetime-local" onChange={(e) => setBookingTime(e.currentTarget.value)} min="09:00" max="18:00" required className="text-inherit bg-inherit rounded-md border-slate-400 border-2 p-2 mt-2 max-w-md"/>
                </div>
                <div className="block mt-5">
                    <label className="font-normal text-md pr-3">leave a note:</label>
                    <input type='text' onChange={(e) => setBookingNote(e.currentTarget.value)} className='w-full text-inherit bg-inherit rounded-md border-slate-400 border-2 p-2 mt-2 max-w-xs'></input>
                </div>
                <div className="flex justify-between mt-5">
                    <button onClick={addBooking} className='btn btn-primary'>Book</button>
                    <label htmlFor={modalID} className="btn">Close</label>
                </div>
            </div>
            </div>

        </>
    );
}



export default ConfirmBooking;