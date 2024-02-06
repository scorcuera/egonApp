import { useContext, useState } from "react"
import { AuthContext } from "../contexts/auth.context"
import clapService from "../services/claps.service";
import ClapsBoard from "../components/ClapsBoard";
import { Button, ButtonGroup } from '@chakra-ui/react'
import "./UserDashboard.css";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [clapsModal, setClapsModal] = useState(false);
  const [claps, setClaps] = useState([]);

  const setModal = async (id: string) => {
    const claps = await clapService.getAllReceivedClaps(id);
    setClaps(claps);
    setClapsModal(!clapsModal);
  }

  return (
    <>
      {user && (
        <section className="dashboard__container">
          <div className="dashboard__info">
            <p className="dashboard__info__greeting">Hello {user.userName} 👋</p>
            <p className="dashboard__info__claps">Available claps: {user.clapsAvailable}</p>
          </div>
          <div className="dashboard__container__buttons">
            <Button colorScheme='messenger' variant='outline' onClick={() => setModal(user.userId)}>
              See my claps
            </Button>
            <Button colorScheme='messenger' variant='solid'>
              Send claps
            </Button>
          </div>
          {clapsModal && <ClapsBoard claps={claps} />}
        </section>
      )}
    </>
  )
}

export default UserDashboard
