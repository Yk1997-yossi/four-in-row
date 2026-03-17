import "./board.css";

function Board(props) {
    const board = props.theBoard
    function getCellColor(cellValue) {
        if(cellValue === 0)
            return "white"
        else if(cellValue === 1)
            return props.player1Color
        else
            return props.player2Color
    }
    return (
        <>
            <table id="myBoard">
                <tbody>
                {
                    board.map((row, i) => (
                        <tr key={i}>
                            {
                                row.map((cellValue, j) => (
                                    <td key={j} id={"cell"} onClick={() => props.whenClick(j)} style={{
                                        backgroundColor:  getCellColor(cellValue)
                                    }}>
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}

export default Board