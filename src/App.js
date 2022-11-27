import './tailwind-imports.css';
import Rooms from './pages/rooms';
import Bookings from './pages/bookings';
import Home from './pages/home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';


function App() {
  return (
    <BrowserRouter className='App'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home/>}/>  
          <Route path="/pages/rooms" element={<Rooms/>}/>  
          <Route path="/pages/bookings" element={<Bookings/>}/> 
        </Route>
      </Routes>

    </BrowserRouter>
  );
    
}

export default App;
