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
    const [isAgainstComputer, setIsAgainstComputer] = useState(false)

    function navigateToGame() {
        navigate("/game", {state: {columnsNumber, rowsNumber, player1Color, player2Color, isAgainstComputer}})
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px", gap: "15px", textAlign: "center" }}>
            <div style={{ border: "2px solid black", padding: "10px", backgroundColor: "#f0f0f0", marginBottom: "20px", direction: "rtl", width: "fit-content" }}>
                <h3 style={{ marginTop: "0" }}>התוספות שמומשו באפליקציה:</h3>
                <ul>
                    <li>בחירת גודל לוח מותאם אישית.</li>
                    <li>אפשרות לבחירת צבעים לכל שחקן.</li>
                    <li>ביטול מהלך אחרון מוצגת ספירה לאחור של 5 שניות.</li>
                    <li>אפשרות לשחק נגד המחשב, המחשב ממתין 3 שניות לפני מהלך.</li>
                </ul>
            </div>

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
                <div style={{ marginTop: "15px", marginBottom: "15px", fontWeight: "bold" }}>
                    <label>
                        <input type="checkbox" checked={isAgainstComputer} onChange={(e) => setIsAgainstComputer(e.target.checked)} />
                        Play against Computer (Player 2)
                    </label>
                </div>

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