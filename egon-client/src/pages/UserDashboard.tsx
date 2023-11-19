import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/auth.context"

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    useEffect(() => {
        console.log(user)
    }, [user])
  return (
    <div>
        This is the user dashboard
    </div>
  )
}

export default UserDashboard
