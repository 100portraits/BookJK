import {Link} from 'react-router-dom'  
import Login from './Login';
function Nav() {
    return (

            <div className="navbar bg-base-200 p-4 mb-3 shadow-md">

                

                {/*Link to rooms*/}
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-3">
                    <li><Link to="/pages/rooms">Rooms</Link></li>
                    </ul>
                </div>

                {/*Link to my bookings*/}
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-3">
                    <li><Link to="/pages/bookings">My Bookings</Link></li>
                    </ul>
                </div>

                <div className="flex-1 grow justify-items-end">
                    <ul className="menu menu-horizontal px-3 flex grow justify-end">
                    <li><Login/></li>
                    </ul>
                </div>

            </div>

    );
}


export default Nav;