import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { collection, deleteDoc, getDocs, doc, updateDoc} from "firebase/firestore";
import { db } from "../../firebase-config";
import ReactTimeAgo from "react-time-ago";

function Bookings() {

    //get the user
    const auth = getAuth();
    const user = auth.currentUser;

    //list of bookings
    const [myBookings, setMyBookings] = useState([]);
    const [rooms, setRooms] = useState({});
    const [bookingStateHelper, setBookingStateHelper] = useState(false);

    //update bookings list
    useEffect(() => {

        

        const myBookingsCollectionRef=collection(db, 'bookings');
        const roomsRef=collection(db, 'rooms');

        //send the collection bookings to an array
        const getMyBookings = async () => {
            const data = await getDocs(myBookingsCollectionRef);
            let allBookings = data.docs.map((doc) => ({
                    id: doc.id,
                    roomID: doc.data().roomID,
                    userUID: doc.data().userUID,
                    timestamp: doc.data().timestamp
                })
            )
            const matchUser = (booking) => {
                console.log(booking)
                return (booking.userUID === user.uid)
            }
            
            setMyBookings(allBookings.filter(matchUser));
        }
        getMyBookings();
        
        //create dictionary of room IDs and corresponding numbers
        const getRooms = async () => {
            const data= await getDocs(roomsRef);
            let roomsArray=data.docs.map((doc) => ({
                id: doc.id,
                number: doc.data().number,
            }));
            let roomsDict={}
            for (const room of roomsArray) {
                roomsDict[room.id] = room.number
            }
            setRooms(roomsDict);

        }
        getRooms();

        //log to console when the webpage updates for debugging, avoid infinite loops
        console.log("made a read");
    
    }, [bookingStateHelper, user]);
    
    const deleteBooking = async (booking) => {
        
        //remove from bookings collection
        await deleteDoc(doc(db, 'bookings', booking.id));
        
        //set room to unbooked
        const roomDoc = doc(db, "rooms", booking.roomID);
        const newFields = {
            occupied: false
        }
        await updateDoc(roomDoc, newFields);

        //use bookingstate helper for useeffect
        setBookingStateHelper(!bookingStateHelper);
    }

    return (
        <div className="mx-auto">
            <h1 className="text-2xl flex justify-center font-bold p-5">MY BOOKINGS</h1>
            {!user ? <h1 className="text-lg flex justify-center p-5">Sign in to create and view bookings</h1>: ""}
            {myBookings.map((booking) => {
                return (
                    <div className='m-5 mx-auto shadow-md bg-base-200 rounded-md max-w-screen-md px-4 py-3 flex justify-between items-center gap-5'>
                        <h2 className="text-2xl">{rooms[booking.roomID]}</h2>
                        <h2 className="text-lg">Booked since: <ReactTimeAgo date={booking.timestamp} locale="nl-NL" timeStyle='round'/></h2>
                        <button className="btn bg-base-300 shadow-sm border-0" onClick={() => deleteBooking(booking)}>Delete Booking</button>
                    </div>
                );
                })
            }
        </div>
    );
}

export default Bookings;