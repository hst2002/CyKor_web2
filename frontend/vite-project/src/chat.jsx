import {useState, useEffect} from 'react';
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
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("load_messages", (data) => {
            console.log("message load");
            setMessages(data);
        });

        socket.on("receive_message", (data) => {
            console.log("message receive");
            setMessages((prev) => [...prev, data]);
        });
/*
        return () => {
            socket.off("load_messages");
            socket.off("receive_message");
        }
*/
    });

    const sendMessage = (message) => {
        socket.emit("send_message", {message: message, nickname: nickname, room_num: num});
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
                <ul>
                    {messages.map((msg, index) => {
                        <li key={index}>
                            <h6>{msg.nickname}</h6><br></br>
                            {msg.message}<br></br>
                        </li>
                    })}
                </ul>
            </div>
            <div>
                <input className = "inputmessage" type = "text" value = {inputvalue} onChange = {(e) => setInputvalue(e.target.value)}></input>
                <button onClick = {()=> sendMessage(inputvalue)}>send</button>
            </div>
        </>
    )
}

export default Chat