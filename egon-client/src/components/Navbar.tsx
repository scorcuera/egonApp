import { Link } from "react-router-dom"
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Stack } from "@chakra-ui/react";


const Navbar = () => {

  const { user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar__container">
        <LazyMotion features={domAnimation}>
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.3 }}>
            {user && user.name ? (
              <Stack spacing={6} direction="row">
                 <Link to="/userDashboard" className="navbar__link">
                  My profile
                </Link>
                <Link to="login" className="navbar__link" onClick={logOutUser}>
                  Log out
                </Link>
              </Stack>

            ) : (
              <Stack spacing={6} direction="row">
                <Link to="login" className="navbar__link">
                  Sign In
                </Link>
                <Link to="register" className="navbar__link navbar__link--primary">
                  Register
                </Link>
              </Stack>
            )}
          </m.div>
        </LazyMotion>
    </nav>
  )
}

export default Navbar
