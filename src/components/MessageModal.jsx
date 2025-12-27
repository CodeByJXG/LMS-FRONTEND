import React, { useState } from "react";
import { FiX, FiSend, FiArrowLeft } from "react-icons/fi";
import "../styles/MessageModal.css";

function MessageModal({ onClose }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState("");
  
  // Sample conversations data
  const [conversations] = useState([
    {
      id: 1,
      userName: "John Doe",
      userAvatar: "JD",
      lastMessage: "Hi, I need help with a book request",
      timestamp: "2 min ago",
      unread: 2,
      messages: [
        { id: 1, text: "Hi, I need help with a book request", sender: "user", time: "10:30 AM" },
        { id: 2, text: "Sure! How can I help you?", sender: "librarian", time: "10:32 AM" },
        { id: 3, text: "I'm looking for 'The Great Gatsby'", sender: "user", time: "10:33 AM" },
      ]
    },
    {
      id: 2,
      userName: "Jane Smith",
      userAvatar: "JS",
      lastMessage: "Thank you for your help!",
      timestamp: "1 hour ago",
      unread: 0,
      messages: [
        { id: 1, text: "Hello! Can I extend my book loan?", sender: "user", time: "Yesterday" },
        { id: 2, text: "Yes, I can extend it for you.", sender: "librarian", time: "Yesterday" },
        { id: 3, text: "Thank you for your help!", sender: "user", time: "Yesterday" },
      ]
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userAvatar: "MJ",
      lastMessage: "When does the library close today?",
      timestamp: "3 hours ago",
      unread: 1,
      messages: [
        { id: 1, text: "When does the library close today?", sender: "user", time: "3:00 PM" },
      ]
    },
  ]);

  const handleSendMessage = () => {
    if (messageText.trim() && selectedUser) {
      // Here you would add the message to the conversation
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="message-modal-overlay" onClick={onClose}>
      <div className="message-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Conversations List View */}
        {!selectedUser ? (
          <>
            <div className="message-modal-header">
              <h2>Messages</h2>
              <button className="close-modal-btn" onClick={onClose}>
                <FiX />
              </button>
            </div>

            <div className="conversations-list">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="conversation-item"
                  onClick={() => setSelectedUser(conv)}
                >
                  <div className="conversation-avatar">{conv.userAvatar}</div>
                  <div className="conversation-content">
                    <div className="conversation-header">
                      <span className="conversation-name">{conv.userName}</span>
                      <span className="conversation-time">{conv.timestamp}</span>
                    </div>
                    <div className="conversation-preview">
                      <span className={conv.unread > 0 ? "unread-message" : ""}>
                        {conv.lastMessage}
                      </span>
                      {conv.unread > 0 && (
                        <span className="unread-badge">{conv.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Chat View */
          <>
            <div className="message-modal-header chat-header">
              <button 
                className="back-btn" 
                onClick={() => setSelectedUser(null)}
              >
                <FiArrowLeft />
              </button>
              <div className="chat-user-info">
                <div className="conversation-avatar small">{selectedUser.userAvatar}</div>
                <span className="chat-user-name">{selectedUser.userName}</span>
              </div>
              <button className="close-modal-btn" onClick={onClose}>
                <FiX />
              </button>
            </div>

            <div className="chat-messages">
              {selectedUser.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === "librarian" ? "sent" : "received"}`}
                >
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="chat-input"
              />
              <button 
                className="send-btn" 
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <FiSend />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MessageModal;