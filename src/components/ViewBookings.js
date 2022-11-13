function ViewBookings({username, modalID}) {
    return (
        <>
        <div className="modal" id={modalID}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Booked by:</h3>
                <p className="py-4">{username}</p>
                <div className="modal-action">
                <a href="#" className="btn">Close</a>
                </div>
            </div>
        </div>
        <a href={ "#" + modalID } className="btn">View Booking</a>                  
        </>
    );
}

export default ViewBookings;