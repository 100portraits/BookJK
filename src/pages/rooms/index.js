import { useState, useEffect } from 'react';
import '../../tailwind-imports.css';
import {db} from '../../firebase-config';
import {collection, getDocs, updateDoc, doc, addDoc, serverTimestamp} from 'firebase/firestore';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import ViewBookings from '../../components/ViewBookings';
import { useNavigate } from "react-router-dom";
import ConfirmBooking from '../../components/ConfirmBooking';



function Rooms() {

  const navigate = useNavigate();

  //list of rooms
  const [rooms, setRooms] = useState([]);

  const [bookings, setBookings] = useState({});

  
  const [username, setUsername] = useState("");

  //get user
  const auth = getAuth();
  const user = auth.currentUser;
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUsername(user.displayName);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  

  


  useEffect(() => {
    
    //get collection of bookings
    const bookingsRef=collection(db, 'bookings');

    //send the collection bookings to an array
    const getBookings = async () => {
      const data= await getDocs(bookingsRef);
      let bookingsArray=data.docs.map((doc) => ({
          roomID: doc.data().roomID,
          username: doc.data().username,
          bookedUntil: doc.data().bookUntil,
          bookingNote: doc.data().bookingNote
      }));
      let bookingsDict={}
      for (const booking of bookingsArray) {
          bookingsDict[booking.roomID] = {
            username: booking.username,
            bookedUntil: booking.bookedUntil, 
            bookingNote: booking.bookingNote
          };
      }
      setBookings(bookingsDict);
      console.log(bookingsDict)

    }
    getBookings();

    
    const roomsCollectionRef=collection(db, 'rooms')
    //send the collection rooms to an array
    const getRooms = async () => {
      const data = await getDocs(roomsCollectionRef);
      setRooms(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }
    getRooms();
    
    //log to console when the webpage updates for debugging, avoid infinite loops
    console.log("made a read");


    //update using a bookingstate helper called in the bookRoom function
  }, [username]);


  return (
    <div className="Rooms mx-10 my-0">
      <h1 className='text-2xl justify-center w-max mx-auto  rounded-lg p-5 font-bold'>ROOMS</h1>
      {!user ? <h1 className="text-lg flex justify-center p-5">Sign in to create and view bookings</h1>: ""}

      {rooms.map((room) => {
          return (
            <div className='m-5 mx-auto shadow-md bg-base-200 rounded-md max-w-screen-sm px-4 py-3 flex justify-between items-center gap-5'>
              <h2 className='text-2xl'>{room.number}</h2>
              <h4 className='text-lg'>{room.occupied ? "Occupied": "Available"}</h4>
              
              
              {!user ? 
                <button className='btn btn-disabled'>BOOK</button>
                :
                <>
                {room.occupied ? 
                  <ViewBookings 
                    username = {bookings[room.id].username}
                    modalID = {room.id}
                    bookedUntil = {bookings[room.id].bookedUntil}
                    bookingNote = {bookings[room.id].bookingNote}
                  />
                  //<p>{bookings[room.id]}</p>
  
                  :
                    <ConfirmBooking
                              roomNumber={room.number}
                              roomID={room.id}
                              userUID={user.uid}
                              modalID={room.number}
                              username={user.displayName}
                    /> 
                }
                </>
              }
              
            </div>
          );
        })
      }

      <div className='p-3 rounded-md bg-base-200 shadow-sm max-w-md mx-auto mt-10'>
        <p className='text-center text-md font-normal font-sans mt-0 spacing leading-loose'>Prototype of a booking system for the JK building,<br /><span className='text-sm font-light'>built by <a href='https://www.instagram.com/sahir.de/' target="_blank" rel="noreferrer"><span className='hover:bg-slate-200 hover:text-base-300 bg-inherit text-inherit hover:p-2 rounded-md font-normal'>Sahir</span></a></span></p>
      </div>
    </div>

  );
}

export default Rooms;
