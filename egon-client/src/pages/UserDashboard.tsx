import { useContext, useState } from "react"
import { AuthContext } from "../contexts/auth.context"
import clapService from "../services/claps.service";
import ClapsBoard from "../components/ClapsBoard";
import { Button, Stack } from '@chakra-ui/react'
import "./UserDashboard.css";
import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [clapsModal, setClapsModal] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
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
            <motion.p
              initial={{ x: 150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="dashboard__info__greeting">
                Hello {user.userName} 👋
            </motion.p>
            <motion.p 
              className="dashboard__info__claps"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}>
                Available claps: {user.clapsAvailable}
            </motion.p>
          </div>
          <div className="dashboard__container__buttons">
            {isFormOpen ? (
              <Stack>
                <Link to="/userDashboard" onClick={() => setIsFormOpen(false)}>
                  <Button>Back</Button>
                </Link>
                <Outlet />
              </Stack>
            ) : (
              <>
                <Button colorScheme='messenger' variant='outline' onClick={() => setModal(user.userId)}>
                  See my claps
                </Button>
                <Link to="/userDashboard/sendClaps" onClick={() => setIsFormOpen(!isFormOpen)}>
                  <Button colorScheme='messenger' variant='solid'>
                    Send claps
                  </Button>
                </Link>
              </>
            )}
          </div>
          {clapsModal && <ClapsBoard claps={claps} />}
        </section>
      )}
    </>
  )
}

export default UserDashboard
