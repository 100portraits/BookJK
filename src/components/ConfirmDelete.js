import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function ConfirmDelete({roomNumber, roomID, bookingID, modalID, username, bookingStateHelper}) {
    
    const navigate = useNavigate();

    const deleteBooking = async () => {
        
        //remove from bookings collection
        await deleteDoc(doc(db, 'bookings', bookingID));
        
        //set room to unbooked
        const roomDoc = doc(db, "rooms", roomID);
        const newFields = {
            occupied: false
        }
        await updateDoc(roomDoc, newFields);
        navigate("../pages/rooms");
    }
    
    return (
        <>
            <div className="modal" id={modalID}>
                <div className="modal-box">
                    
                        <h1 className="text-lg text-left pb-4">Delete booking for room <span className="font-bold">{roomNumber}</span>?</h1>
                        <div className="flex justify-between">
                            <button onClick={deleteBooking} className='btn btn-error shadow-sm border-0 '>
                                Confirm
                            </button>
                            <a href="#">
                                <button className='btn bg-base-300 shadow-sm border-0 '>
                                    Close
                                </button>
                            </a>
                        </div>
                </div>
            </div>
            <a href={"#" + modalID} className='btn bg-base-300 shadow-sm border-0'>Delete Booking</a>

        </>
    );
}

export default ConfirmDelete;