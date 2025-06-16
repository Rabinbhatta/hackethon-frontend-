import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './chatBox.css';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:8000');


const ChatBox = (  ) => {
    const { slug } = useParams() // Adjust if needed
    const [receiverId,setReceiverId] = useState(slug)
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [senderId,setSenderId] = useState()
  const [username, setUsername] = useState()
  useEffect(()=>{
    const storedUser = localStorage.getItem('user')
    if(storedUser){
        setSenderId(JSON.parse(storedUser).id)
        
    }
  },[])

 useEffect(() => {
  if (!senderId) return; // Don't run until senderId is available

  // Join the chat room
  socket.emit('join-chat', { senderId, receiverId });

  // Real-time message handlers
  socket.on('chat-history', (msgs) => setMessages(msgs));
  socket.on(`receive-message-${senderId}`, (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  });

  // Fetch history
  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/message/user-message/${senderId}`);
      const data = await response.json();
      console.log(data)
      setChatHistory(data.contacts || []);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  fetchChatHistory();

  const getUser = async ()=>{
    try {
        const response = await fetch(`http://localhost:8000/api/startup/getUser/${receiverId}`)
        const data = await response.json();
        console.log(data);
        setUsername(data.firstName || [])
        
    } catch (error) {
        console.error('Error fetching name', error);  
        
    }
  }
  if(receiverId){
  getUser();}

  return () => {
    socket.off('chat-history');
    socket.off(`receive-message-${senderId}`);
  };
}, [senderId, receiverId]);
  const sendMessage = () => {
    if (messageInput.trim()) {
      const msg = {
        senderId,
        receiverId,
        message: messageInput,
      };
      socket.emit('send-message', msg);
      setMessages((prev) => [...prev, msg]); // Optimistically add to current chat
      setMessageInput('');
    }
  };

  return (
    <div className="chat-wrapper">
      {/* Sidebar: Chat History */}
      <div className="chat-history">
        <h3>Chat History</h3>
        {chatHistory.length === 0 ? (
  <p className="no-history">No messages sent or received.</p>
) : (
  chatHistory.map((msg, idx) => (
    <div key={idx} className="history-message" onClick={()=>setReceiverId(msg._id)}>
       {msg.firstName}
    </div>
  ))
)}

      </div>

      {/* Main Chat Box */}
      <div className="chat-container">
        <div className="chat-header">Chat with {username}</div>
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${msg.senderId === senderId ? 'sent' : 'received'}`}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
