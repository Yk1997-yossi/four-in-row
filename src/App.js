import Settings from "./Settings"
import Game from "./Game";
import './App.css';
import {Routes, Route} from "react-router-dom"


function App() {
    return (
        <Routes>
            <Route path="/" element={<Settings/>}/>
            <Route path="/game" element={<Game/>}/>
        </Routes>
    )
}

export default App;
