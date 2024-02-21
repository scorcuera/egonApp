import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { LazyMotion, domAnimation, m } from "framer-motion";

const ClapsBoard = ({ claps }) => {
  
  return (
    <LazyMotion features={domAnimation}>
        <TableContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} as={m.div}>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th isNumeric>Claps</Th>
                <Th>Giver</Th>
                <Th>Message</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {claps.map((clap) => {
                return (
                  <Tr>
                    <Td isNumeric>{clap.num_claps}</Td>
                    <Td>{clap.users_claps_from_user_idTousers.name}</Td>
                    <Td>{clap.message}</Td>
                    <Td>{new Date(clap.sent_at).toLocaleDateString()}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
    </LazyMotion>
  )
}

export default ClapsBoard
