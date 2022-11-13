import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

function Home() {

    const auth = getAuth();
    
    const [user, loading] = useAuthState(auth);
    
    useEffect(() => {
      
    }, [user, loading]);

    return (
        <div className="mx-auto  max-w-md">
            <h1 className="text-3xl font-medium text-center p-5">BookJK</h1>
            {!user ? <h1 className="text-lg flex justify-center p-5">Sign in to create and view bookings</h1>: 
            

            <div className="">
                <div className="flex-1 text-center m-5">
                    <Link className="btn w-full" to='/pages/rooms'>Rooms</Link>
                </div>
                <div className="flex-1 text-center m-5">
                    <Link className="btn w-full" to='/pages/bookings'>My Bookings</Link>
                </div>
            </div>

            }

            
        </div>
    );
}

export default Home;