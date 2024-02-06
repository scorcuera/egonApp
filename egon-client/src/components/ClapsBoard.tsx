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
          {claps.map((clap) => {
            return (<Tr>
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
  )
}

export default ClapsBoard
