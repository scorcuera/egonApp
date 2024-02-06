import { Link } from "react-router-dom"
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";


const Navbar = () => {

  const { user, logOutUser} = useContext(AuthContext);

  return (
    <nav className="navbar__container">
      {user && user.userName ? (
        <>
          <Link to="/userDashboard" className="navbar__link">
            My profile
          </Link>
          <Link to="login" className="navbar__link" onClick={logOutUser}>
            Log out
          </Link>
        </>
      ) : (
        <>
          <Link to="login" className="navbar__link">
            Sign In
          </Link>
          <Link to="login" className="navbar__link navbar__link--primary">
            Start
          </Link>
        </>
      )}
    </nav>
  )
}

export default Navbar
