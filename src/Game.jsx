import {useState, useEffect} from "react";
import Board from "./Board";
import {useLocation} from "react-router-dom";

function Game() {
    const location = useLocation()
    const numOfCols = location.state.columnsNumber
    const numOfRows = location.state.rowsNumber
    const player1Color = location.state.player1Color
    const player2Color = location.state.player2Color
    const isAgainstComputer = location.state.isAgainstComputer

    const [boardArr, setBoardArr] = useState(createBoardArr())
    const [correctPlayer, setCorrectPlayer] = useState(1)
    const [winner, setWinner] = useState(null)

    const [timeLeft, setTimeLeft] = useState(0)
    const [prevBoard, setPrevBoard] = useState(null)

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && prevBoard !== null) {
            setPrevBoard(null);
            updatePlayer();
        }
    }, [timeLeft, prevBoard]);

    useEffect(() => {
        if (correctPlayer === 2 && isAgainstComputer && winner === null && timeLeft === 0 && prevBoard === null) {
            const compTimer = setTimeout(() => {
                let availableCols = [];
                for (let i = 0; i < numOfCols; i++) {
                    if (boardArr[0][i] === 0) availableCols.push(i);
                }
                if (availableCols.length > 0) {
                    const randomCol = availableCols[Math.floor(Math.random() * availableCols.length)];
                    onColumnsClick(randomCol, true);
                }
            }, 3000);
            return () => clearTimeout(compTimer);
        }
    }, [correctPlayer, boardArr, winner, timeLeft, prevBoard, isAgainstComputer, numOfCols]);

    function handleUndo() {
        setBoardArr(prevBoard);
        setPrevBoard(null);
        setTimeLeft(0);
    }

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

    function onColumnsClick(colIndex, isComputerMove = false) {
        if (winner !== null)
            return
        if (timeLeft > 0) return;
        if (correctPlayer === 2 && isAgainstComputer && !isComputerMove) return;

        if ((boardArr[0][colIndex] !== 0)) {
            alert("this column is full, please click on other column")
            return
        }

        setPrevBoard(boardArr.map(row => [...row]));

        const newArr = boardArr.map(row => [...row])
        for (let i = numOfRows - 1; i >= 0; i--) {
            if (newArr[i][colIndex] === 0) {
                newArr[i][colIndex] = correctPlayer
                setBoardArr(newArr)
                const didWin = checkWin(i, colIndex, newArr)
                if (didWin) {
                    setWinner(correctPlayer)
                    setTimeLeft(0);
                    setPrevBoard(null);
                } else {
                    if (correctPlayer === 2 && isAgainstComputer) {
                        setPrevBoard(null);
                        updatePlayer();
                    } else {
                        setTimeLeft(5);
                    }
                }
                break
            }
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
            display: "grid",
            placeItems: "center"
        }}>
            {
                winner == null && timeLeft === 0 && (!isAgainstComputer || correctPlayer === 1) &&
                <h1> player number {correctPlayer} select a column and click on it</h1>
            }
            {
                winner == null && timeLeft === 0 && isAgainstComputer && correctPlayer === 2 &&
                <h1> Computer is thinking...</h1>
            }

            {
                timeLeft > 0 &&
                <div style={{textAlign: "center", marginBottom: "15px"}}>
                    <h2>You have {timeLeft} seconds to UNDO</h2>
                    <button onClick={handleUndo}
                            style={{padding: "10px", fontSize: "16px", cursor: "pointer", backgroundColor: "#ffcccc"}}>
                        UNDO Move
                    </button>
                </div>
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