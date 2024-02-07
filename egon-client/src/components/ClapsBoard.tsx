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
                    <Td isNumeric>{clap.ClapCount}</Td>
                    <Td>{clap.FromUserId}</Td>
                    <Td>{clap.Message}</Td>
                    <Td>{clap.Date}</Td>
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
