import React from 'react'
import { useNavigate} from 'react-router-dom';
import { Link,useLocation } from "react-router-dom";
const Navbar = () => {
    let loc=useLocation();
    const navigate=useNavigate();
    const handleLogout=()=>{
            localStorage.removeItem('token');
            navigate('/login');
    }
    
    return (
            <div><nav className="navbar navbar-expand-lg navbar-light bg-primary " id='navbar'>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 fw-bold" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item ">
                                <Link className={`  fs-4 nav-link  ${loc.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={` fs-4 nav-link  ${loc.pathname==='/about'?"active":""}`} to="/about">About</Link>
                            </li>


                        </ul>
                       {!localStorage.getItem('token')? <form className="d-flex">
                        <Link className="btn btn-light mx-2" to='/login' role="button">Login</Link>
                        <Link className="btn btn-light mx-2" to='/signup' role="button">Sign Up</Link>
                        </form>:<button className='btn btn-light' onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav></div>
    )
}

export default Navbar