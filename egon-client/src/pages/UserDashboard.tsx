import { useContext } from "react"
import { AuthContext } from "../contexts/auth.context"
import clapService from "../services/claps.service";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && (
        <>
          <p>Hello {user.userName}</p>
          <p>Available claps: {user.clapsAvailable}</p>
          <button onClick={() => clapService.getAllReceivedClaps(user.userId)}>See my claps</button>
        </>
      )}
    </>
  )
}

export default UserDashboard
