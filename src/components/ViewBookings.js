function ViewBookings({username, modalID, bookedUntil, bookingNote}) {
    return (
        <>
        
            {/* The button to open modal */}
            <label htmlFor={modalID} className="btn">View Booking</label>

            <input type="checkbox" id={modalID} className="modal-toggle" />

            <label htmlFor={modalID} className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <p className="pb-4"><span className="text-md font-bold">Booked by: </span>{username}</p>
                    <h3 className="text-md font-normal pb-4"><span className='font-bold '>Booked until:</span> {bookedUntil}</h3>
                    <h3 className="text-md font-normal"><span className='font-bold'>Description: </span>"{bookingNote}"</h3>
                </label>
            </label>                  
        </>
    );
}

export default ViewBookings;