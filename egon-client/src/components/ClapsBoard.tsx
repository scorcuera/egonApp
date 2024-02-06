import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'


const ClapsBoard = ({ claps }) => {
  return (
    <TableContainer>
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
          <Tr>
            <Td isNumeric>{claps.ClapCount}</Td>
            <Td>{claps.FromUserId}</Td>
            <Td>{claps.Message}</Td>
            <Td>{claps.Date}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ClapsBoard
