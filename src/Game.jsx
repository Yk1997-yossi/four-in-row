import {useState} from "react";
import Board from "./Board";
import {useLocation} from "react-router-dom";

function Game() {
    const location = useLocation()
    const numOfCols = location.state.columnsNumber
    const numOfRows = location.state.rowsNumber
    const player1Color = location.state.player1Color
    const player2Color = location.state.player2Color

    const [boardArr, setBoardArr] = useState(createBoardArr())
    const [correctPlayer, setCorrectPlayer] = useState(1)
    const [winner, setWinner] = useState(null)

    function checkWin(rowIndex, collIndex) {
        const playerToCheckWin = correctPlayer
        let countSequence = 1;
        const upperLimit = 0
        const lowerLimit = numOfRows - 1
        const leftLimit = 0
        const rightLimit = numOfCols - 1
        for (let i = collIndex + 1; i <= rightLimit; i++) {
            if (boardArr[rowIndex][i] === playerToCheckWin)
                countSequence++
            else
                break;
        }
        for (let i = collIndex - 1; i >= leftLimit; i--) {
            if (boardArr[rowIndex][i] === playerToCheckWin)
                countSequence++
            else
                break
        }
        if (countSequence >= 4)
            return true

        countSequence = 1
        for (let j = rowIndex + 1; j <= lowerLimit; j++) {
            if (boardArr[j][collIndex] === playerToCheckWin)
                countSequence++
            else
                break
        }
        for (let j = rowIndex - 1; j >= upperLimit; j++) {
            if (boardArr[j][collIndex] === playerToCheckWin)
                countSequence++
            else
                break
        }
        if (countSequence >= 4)
            return true

        countSequence = 1
        for (let j = rowIndex + 1, i = collIndex + 1; i <= rightLimit && j <= lowerLimit; i++, j++) {
            if (boardArr[j][i] === playerToCheckWin)
                countSequence++
            else
                break
        }
        for (let j = rowIndex - 1, i = collIndex - 1; i >= leftLimit && j >= upperLimit; i--, j--) {
            if (boardArr[j][i] === playerToCheckWin)
                countSequence++
            else
                break
        }
        if (countSequence >= 4)
            return true

        countSequence = 1
        for (let j = rowIndex + 1, i = collIndex - 1; i >= leftLimit && j <= lowerLimit; j++, i--) {
            if (boardArr[j][i] === playerToCheckWin)
                countSequence++
            else
                break
        }
        for (let j = rowIndex - 1, i = collIndex + 1; i <= rightLimit && j >= upperLimit; j--, i++) {
            if (boardArr[j][i] === playerToCheckWin)
                countSequence++
            else
                break
        }
        if (countSequence >= 4)
            return true
        return false
    }


    function createBoardArr() {
        const boardArr = new Array(numOfRows)
        for (let i = 0; i < numOfRows; i++) {
            boardArr[i] = new Array(numOfCols)
        }
        for (let i = 0; i < numOfRows; i++) {
            for (let j = 0; j < numOfCols; j++) {
                boardArr[i][j] = 0
            }
        }
        return boardArr
    }

    function onColumnsClick(colIndex) {
        if (winner !== null)
            return
        if ((boardArr[0][colIndex] !== 0))
            alert("this column is full, please click on other column")
        const newArr = boardArr.map(row => [...row])
        for (let i = numOfRows - 1; i >= 0; i--) {
            if (newArr[i][colIndex] === 0) {
                newArr[i][colIndex] = correctPlayer
                setBoardArr(newArr)
                const didWin = checkWin(i, colIndex, newArr)
                if (didWin) {
                    setWinner(correctPlayer)
                } else {
                    setCorrectPlayer(updatePlayer)
                }
                break
            }
        }

        if (boardArr[0][colIndex] === 0) {
            const newArr = boardArr.map((row) => (
                [...row]
            ))
            for (let i = numOfRows - 1; i >= 0; i--) {
                if (newArr[i][colIndex] === 0) {
                    newArr[i][colIndex] = correctPlayer
                    setBoardArr(newArr)
                    checkWin(i, colIndex)
                    updatePlayer()
                    break
                }
            }
        } else {
            alert("please click on other column")
        }
    }

    function updatePlayer() {
        if (correctPlayer === 1)
            setCorrectPlayer(2)
        else
            setCorrectPlayer(1)
    }

    return (
        <div style={{
            display: "gird",
            placeItems: "center"
        }}>
            {
                winner == null &&
                <h1> player number {correctPlayer} click on columns</h1>
            }
            <Board theBoard={boardArr} whenClick={onColumnsClick} player1Color={player1Color}
                   player2Color={player2Color}/>
            {
                winner !== null &&
                <div style={{
                    fontWeight: "bold",
                    fontSize: "40px"
                }}>
                    the winner is player number {winner}
                </div>
            }
        </div>
    )
}

export default Game