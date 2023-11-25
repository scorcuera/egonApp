import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth.context"

const UserDashboard = () => {
  const [userData, setUserData] = useState({});
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    return setUserData(user);
  }, [user])
  
  return (
    <div>
      Hello {userData.userName}
    </div>
  )
}

export default UserDashboard
