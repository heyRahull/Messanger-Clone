import "./App.css";
import React, { useState, useEffect } from "react";
import { Button, FormControl, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebsae";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setUsername(prompt("Enter Your Name"));
  }, []);

  useEffect(() => {
    //Reading the data from database and appending it to message array

    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            message: doc.data(),
            id: doc.id,
          }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    //adding the messages to the database
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // window.scrollTo(0, 999999999999);
    // setMessages([...messages, { message: input, username: username }]);
    setInput("");
    window.scrollTo(0, 999999999999);
  };

  return (
    <div className="App">
      <img
        className="app__image"
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="Messanger Logo"
      />
      <h1>Hello {username} 😄</h1>
      <form className="app__form">
        <FormControl className="app__formcontrol">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            type="text"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <IconButton
            className="app__iconButton"
            type="submit"
            disabled={!input}
            color="primary"
            variant="contained"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        <div className="app__messages">
          {messages.map(({ id, message }) => (
            <Message key={id} message={message} username={username} />
          ))}
        </div>
      </FlipMove>
    </div>
  );
}

export default App;
