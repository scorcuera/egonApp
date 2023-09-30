import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <ul>
        <Link to="/">
            Home
        </Link>
        <Link to="login">
            Login
        </Link>
    </ul>
  )
}

export default Navbar
