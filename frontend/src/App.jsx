import "./App.css";
import React from "react";
import { useClient, ClientProvider } from "./Client";

function App() {
  return (
    <ClientProvider>
      <Chat />
    </ClientProvider>
  );
}

function Chat() {
  const client = useClient();

  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  React.useEffect(() => {
    if (client) {
      client.onmessage = (message) => {
        console.log(message);
        setMessages((messages) => [...messages, message]);
      };
    }
  }, [client]);


  const sendMessage = () => {
    if (!client) {
      return;
    }
    client.send(message);
    setMessage("");
  };
  return (
    <div>
      <ul className={"chat-messages"}>
        {messages.map((m, i) => (
          <li className={"message"} key={i}>{String(m.data)}</li>
        ))}
      </ul>

    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
    </div>
  );
  


}

export default App;
