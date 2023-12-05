import { useContext } from "react"
import { AuthContext } from "../contexts/auth.context"
import clapService from "../services/claps.service";
import "./UserDashboard.css";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && (
        <section className="dashboard__container">
          <div className="dashboard__info">
            <p className="dashboard__info__greeting">Hello {user.userName} 👋</p>
            <p className="dashboard__info__claps">Available claps: {user.clapsAvailable}</p>
          </div>
          <div className="dashboard__container__buttons">
            <button className="dashboard__button" onClick={() => clapService.getAllReceivedClaps(user.userId)}>See my claps</button>
          <button className="dashboard__button dashboard__button--primary">Send claps</button>
          </div>
        </section>
      )}
    </>
  )
}

export default UserDashboard
