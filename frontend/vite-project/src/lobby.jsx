import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './lobby.css';

const socket = io.connect('http://localhost:5000');


function Lobby(){
    const navigate = useNavigate();
    const [inputvalue, setInputvalue] = useState("");
    const [nickname, setNickname] = useState("guest");
    const Enter = (num, username) => {
        socket.emit("enter_room", num);
        navigate("/chat", { state: {nickname: username, room_num: num}});
    }
    

    return (
        <>
            <div className = "nickname">
                <h1>Hello, {nickname}</h1>
                <input type = "text" value = {inputvalue} onChange = {(e) => setInputvalue(e.target.value)} placeholder = "new nickname"></input>
                <button onClick = {()=>setNickname(inputvalue)}>save</button>
            </div>
            <div className = "roombutton">
                <button onClick ={() => Enter(1, nickname)}>Room1</button><br></br>
                <button onClick ={() => Enter(2, nickname)}>Room2</button><br></br>
                <button onClick ={() => Enter(3, nickname)}>Room3</button><br></br>
            </div>
        </>
    )
}

export default Lobby
/*
useEffect(() => {
    socket.on("reply",(num) => {
        console.log(num);
    });
}, [socket]);
*/