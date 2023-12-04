import { useContext } from "react"
import { AuthContext } from "../contexts/auth.context"

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && (
        <>
          <p>Hello {user.userName}</p>
          <p>Available claps: {user.clapsAvailable}</p>
        </>
      )}
    </>
  )
}

export default UserDashboard
