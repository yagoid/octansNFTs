import NavBar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

import { ToastContainer } from "react-toastify";


const Layout = (props) => {
    return(
        <div>

            <NavBar/>

            <ToastContainer autoClose={5000}/>

            {props.children}

            <Footer/>

        </div>
    )
}

export default Layout