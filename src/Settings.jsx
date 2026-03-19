import './App.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Settings() {
    const navigate = useNavigate()
    const colors = ["red", "black", "yellow", "green", "orange", "blue"]
    const [columnsNumber, setColumnsNumber] = useState(null)
    const [rowsNumber, setRowsNumber] = useState(null)
    const [player1Color, setPlayer1Color] = useState("")
    const [player2Color, setPlayer2Color] = useState("")

    function navigateToGame() {
        navigate("/game", {state: {columnsNumber, rowsNumber, player1Color, player2Color}})
    }

    return (
        <div className="settings-page">
            <div>
                select rows number (at least 4)
                <input value={rowsNumber} onChange={(event) => {
                setRowsNumber(event.target.value)
            }}/>
            </div>
            <div>
                select columns number (at least 4)
                <input value={columnsNumber} onChange={(event) => {
                setColumnsNumber(event.target.value)
            }}/>
            </div>
            <div>
                player 1 select color:
                <select value={player1Color} onChange={(event) => {
                    setPlayer1Color(event.target.value);

                }}>
                    <option>select color</option>
                    {
                        colors.filter(color => color !== player2Color).map((color) => (
                            <option key={color}>{color}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                player 2 select color:
                <select value={player2Color} onChange={(event) => {
                    setPlayer2Color(event.target.value)
                }}>
                    <option>select color</option>
                    {
                        colors.filter(color => color !== player1Color).map((color) => (
                            <option key={color}>{color}</option>
                        ))
                    }
                </select>
                <div>
                    <button
                        disabled={columnsNumber < 4 || rowsNumber < 4 || player1Color === "" || player2Color === ""}
                        onClick={navigateToGame}>
                        start game
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Settings;
