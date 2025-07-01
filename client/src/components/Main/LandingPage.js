import React, { useRef, useState, useEffect } from "react";
import socket from "../../socket";
import "./landingPage.css";

export default function LandingPage({ history }) {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    socket.on("frontendErrorUserExist", ({ error }) => {
      if (!error) {
        const roomName = roomRef.current.value;
        const userName = userRef.current.value;

        sessionStorage.setItem("user", userName);
        history.push(`/room/${roomName}`);
      } else {
        setErr(true);
        setErrMsg("User name already exists");
      }
    });
  }, [history]);

  function clickJoin() {
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;
    if (!roomName || !userName) {
      setErr(true);
      setErrMsg("Enter Room Name and User Name");
    } else {
      console.log('Emitting ', {roomId: roomName, userName})
      socket.emit("backendCheckUser", { roomId: roomName, userName });
    }
  }

  return (
    <div className="landing-container">
      <div className="card">
        <h1 className="heading">Join a Video Meeting</h1>
        <div className="form-group">
          <label htmlFor="roomName">Room ID</label>
          <input ref={roomRef} id="roomName" type="text" placeholder="Enter Room ID" required />
        </div>
        <div className="form-group">
          <label htmlFor="userName">Your Name</label>
          <input ref={userRef} id="userName" type="text" placeholder="Enter Your Name" required />
        </div>
        <button className="join-button" onClick={clickJoin}>
          Join Now
        </button>
        {err && <p className="error">{errMsg}</p>}
      </div>
    </div>
  );
}