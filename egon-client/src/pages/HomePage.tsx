import IconLogo from "../assets/logo_solid.svg"
import "./HomePage.css";
import { LazyMotion, domAnimation, m } from "framer-motion";

const HomePage = () => {
  return (
    <div className="heroContainer">
      <LazyMotion features={domAnimation}>
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{delay: 0.8, duration: 1.4}}>
          <img className="heroContainer__image" src={IconLogo} alt="logo-image" />
        </m.div>
      </LazyMotion>
    </div>
  )
}

export default HomePage
