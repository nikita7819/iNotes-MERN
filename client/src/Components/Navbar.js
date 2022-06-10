import React from 'react'
import { Link, useLocation , useNavigate} from "react-router-dom";

  

const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate()
    const handlLogout = () => {
        localStorage.removeItem('auth-token');
        navigate("/login")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid ">
                <Link className="navbar-brand" to="/">iNotes</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {!localStorage.getItem('auth-token')?<form className="d-flex"> 
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form> :
                    <button className='btn btn-primary' onClick={handlLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar