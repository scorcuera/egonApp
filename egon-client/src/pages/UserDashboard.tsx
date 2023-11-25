import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth.context"

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <p>Hello {user.userName}</p>}
    </>

  )
}

export default UserDashboard
