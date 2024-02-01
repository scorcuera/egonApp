const ClapsBoard = ({ claps }) => {
  return (
    <div>
      <table>
        <tr>
          <th>Claps</th>
          <th>Who</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
        <tr>
          <td>{claps.ClapCount}</td>
        </tr>
        <tr>
          <td>{claps.FromUserId}</td>
        </tr>
        <tr>
          <td>{claps.FromUserId}</td>
        </tr>
        <tr>
          <td>{claps.Message}</td>
        </tr>
        <tr>
          <td>{claps.SentAt}</td>
        </tr>
      </table>
    </div>
  )
}

export default ClapsBoard
