import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './chat.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function Chat(){
    const navigate = useNavigate();
    const location = useLocation();
    const nickname = location.state?.nickname || "guest";
    const num = location.state?.room_num || 1;
    const [inputvalue, setInputvalue] = useState("");

    const sendMessage = (message) => {
        socket.emit("send_message", message);
        setInputvalue("");
    };

    const GoToLobby = () => {
        navigate("/");
    };

    return(
        <>
            <div>
                <h3>Room{num}</h3>
                <button onClick = {() => GoToLobby()}>lobby</button>
            </div>
            <div>
                채팅 내용
            </div>
            <div>
                <input className = "inputmessage" type = "text" value = {inputvalue} onChange = {(e) => setInputvalue(e.target.value)}></input>
                <button onClick = {()=> sendMessage(inputvalue)}>send</button>
            </div>
        </>
    )
}

export default Chat