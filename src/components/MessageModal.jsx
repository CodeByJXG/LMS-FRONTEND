import React, { useEffect, useState } from "react";
import { FiX, FiSend, FiSearch } from "react-icons/fi";
import "../styles/MessageModal.css";

function MessageModal({ onClose }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const users = [...Array(14)].map((_, i) => ({
    id: i,
    name: i === 0 ? "Alice Johnson" : `Reader ${i + 1}`,
    online: i % 2 === 0,
    lastMsg: "Available for pickup...",
    time: "3m"
  }));

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`nb-overlay ${isVisible ? "active" : ""}`} onClick={handleClose}>
      <div className="nb-floating-card" onClick={(e) => e.stopPropagation()}>
        
        {/* SIDEBAR */}
        <aside className={`nb-side ${selectedUser ? "mobile-hidden" : "mobile-full"}`}>
          <div className="nb-side-header">
            <div className="nb-logo-row">
              <button className="nb-text-back-btn" onClick={handleClose}>
                DASHBOARD
              </button>
              <h1>NawungBook</h1>
            </div>
          </div>
          
          <div className="nb-search-box">
            <FiSearch className="nb-s-icon" />
            <input type="text" placeholder="Search NawungBook" />
          </div>

          <div className="nb-list">
            {users.map((user) => (
              <div 
                key={user.id} 
                className={`nb-user-item ${selectedUser?.id === user.id ? "active" : ""}`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="nb-avatar-wrap">
                  <div className="nb-av">{user.name.charAt(0)}</div>
                  {user.online && <span className="nb-dot"></span>}
                </div>
                <div className="nb-info">
                  <span className="nb-nm">{user.name}</span>
                  <p className="nb-pvw">{user.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* CHAT MAIN */}
        <main className={`nb-main ${!selectedUser ? "mobile-hidden" : "mobile-full"}`}>
          {selectedUser ? (
            <>
              <header className="nb-main-header">
                <div className="nb-header-left">
                  <button className="nb-text-back-btn mobile-only" onClick={() => setSelectedUser(null)}>
                    BACK
                  </button>
                  <div className="nb-av-small">{selectedUser.name.charAt(0)}</div>
                  <div className="nb-user-status">
                    <h4>{selectedUser.name}</h4>
                    <span>Active Now</span>
                  </div>
                </div>
                <div className="nb-main-ops">
                  {/* Video and Audio icons removed */}
                  <button className="nb-close-x-btn" onClick={handleClose}>
                    <FiX />
                  </button>
                </div>
              </header>

              <div className="nb-messages">
                <div className="nb-row them"><div className="nb-bubble">Welcome to NawungBook.</div></div>
                <div className="nb-row me"><div className="nb-bubble">The archive is open. How can I assist you?</div></div>
              </div>

              <footer className="nb-footer">
                <div className="nb-input-pill">
                  <input 
                    placeholder="Aa" 
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <button className="nb-send-action" disabled={!messageText.trim()}>
                    <FiSend />
                  </button>
                </div>
              </footer>
            </>
          ) : (
            <div className="nb-empty-state">
              <h2>NawungBook</h2>
              <p>Select a reader to start the correspondence</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default MessageModal;
