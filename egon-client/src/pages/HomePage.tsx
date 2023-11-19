import IconLogo from "../assets/logo_solid.svg"
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="heroContainer">
      <img className="heroContainer__image" src={IconLogo} alt="logo-image" />
    </div>
  )
}

export default HomePage
