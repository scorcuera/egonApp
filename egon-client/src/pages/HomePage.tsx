import IconLogo from "../assets/logo_solid.svg"
import "./HomePage.css";

const HomePage = () => {
  return (
    <section className="heroContainer">
      <img className="heroContainer__image" src={IconLogo} alt="logo-image" />
    </section>
  )
}

export default HomePage
