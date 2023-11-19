import { Link } from "react-router-dom"
import "./Navbar.css";


const Navbar = () => {
  return (
    <nav className="navbar__container">
        <Link to="login" className="navbar__link">
            Sign In
        </Link>
        <Link to="login" className="navbar__link navbar__link--primary">
            Start
        </Link>
    </nav>
  )
}

export default Navbar
