import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello and thank you for visiting OurClinic."}
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);  // State to manage the visibility of the chatbot

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Send message to user's message list
      const userMessage = { text: inputMessage, sender: "user" };
      setMessages(messages => [...messages, userMessage]);
      setInputMessage('');

      // Send the message to the Flask backend
      fetch('http://localhost:5002/getresponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage })
      })
      .then(response => response.json())
      .then(data => {
        // Add bot's response to the message list
        const botMessage = { text: data.response, sender: "bot" };
        setMessages(messages => [...messages, botMessage]);
      })
      .catch((error) => console.error('Error:', error));
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      <style>
        {`
          .fixed-size-btn {
            width: 80px;  // Ensures button width remains constant
            height: 6px;
            padding: 8px 16px;  // Consistent padding
          }
        `}
        </style>
      {isOpen ? (
        <MDBCard style={{ maxWidth: '300px', borderRadius: "15px" }}>
          <MDBCardHeader
            className="d-flex justify-content-between align-items-center p-3 bg-info text-white"
            style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
          >
            <MDBIcon fas icon="angle-left" onClick={toggleChat} />
            <p className="mb-0 fw-bold">Live chat</p>
            <MDBIcon fas icon="times" onClick={toggleChat} />
          </MDBCardHeader>
          <MDBCardBody className="overflow-auto" style={{ height: '300px' }}>
            {messages.map((msg, index) => (
              <div key={index} className={`d-flex flex-row ${msg.sender === 'bot' ? 'justify-content-start' : 'justify-content-end'} mb-4`}>
                <img
                  src={`https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${msg.sender === 'bot' ? '1' : '2'}-bg.webp`}
                  alt="avatar"
                  style={{ width: "35px", height: "35px" }}
                />
                <div
                  className="p-3 ms-3 me-3"
                  style={{
                    borderRadius: "15px",
                    backgroundColor: msg.sender === 'bot' ? "rgba(57, 192, 237,.2)" : "#fbfbfb",
                  }}
                >
                  <p className="small mb-0">{msg.text}</p>
                </div>
              </div>
            ))}
          </MDBCardBody>
          <div className="p-3">
            <MDBTextArea
              label="Type your message"
              id="textAreaExample"
              rows={2}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <MDBBtn className="mt-2 fixed-size-btn" color="info" onClick={handleSendMessage}>Send</MDBBtn>
          </div>
        </MDBCard>
      ) : (
        <MDBIcon fas icon="comments" className="bg-info text-white" style={{ fontSize: '24px', padding: '10px', borderRadius: '50%' }} onClick={toggleChat} />
      )}
    </div>
  );
}
