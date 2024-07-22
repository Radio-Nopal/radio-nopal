'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import { v4 as uuidv4 } from 'uuid';
import useFirebaseChat from './FirebaseChat';
import './ChatComponent.scss';

function Row({
  index, style, messages, userId,
}) {
  return (
    <div
      key={index}
      style={style}
      className={`${messages[index].userId === userId
        ? 'chatbox__message-container--my-message'
        : ''}`}
    >
      <div className="chatbox__message-username">
        {messages[index].username}
        :
      </div>
      <div className="chatbox__message-message">
        {messages[index].message}
      </div>
    </div>
  );
}

function ChatComponent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState();
  const [lastMessageTime, setLastMessageTime] = useState(Date.now());
  const messageListContainer = useRef(null);
  const chatContainer = useRef(null);

  useEffect(() => {
    setUserId(uuidv4());
  }, []);

  const { messages, sendChatMessage } = useFirebaseChat('Kurenniemi');

  const handleEntrar = () => {
    if (username.length) {
      setLoggedIn(true);
    }
  };

  const sendMessage = () => {
    if (!message) return;
    const now = Date.now();
    if (lastMessageTime + 1500 > now) return;
    setLastMessageTime(now);
    const messageData = {
      userId,
      username,
      message,
      timestamp: now,
    };
    sendChatMessage(messageData);

    setMessage('');
  };

  const onChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const onKeyPress = (event) => {
    if (event.charCode === 13) {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messageListContainer?.current?.scrollToItem(messages.length);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      ref={chatContainer}
      className="chatbox chatbox--show"
    >
      <script async src="https://comments.app/js/widget.js?3" data-comments-app-website="Q7bEfH3s" data-limit="5" data-color="E22F38" data-outlined="1" />
      <div className="chatbox__message-list-container">
        <div className="chatbox__message-list">
          <List
            height={500}
            itemCount={messages.length}
            itemSize={50}
            width="100%"
            scrollTo="end"
            ref={messageListContainer}
          >
            {({ index, style }) => (
              <Row
                index={index}
                style={style}
                messages={messages}
                userId={userId}
              />
            )}
          </List>
        </div>
      </div>
      {loggedIn ? (
        <>
          <input
            className="chatbox__chat-text-input"
            placeholder="mensaje"
            type="text"
            onChange={onChangeHandler}
            onKeyPress={onKeyPress}
            value={message}
          />
          <button
            type="submit"
            className="chatbox__emit-chat-message-button"
            onClick={sendMessage}
          >
            Enviar
          </button>
        </>
      ) : (
        <div>
          <input
            placeholder="nombre"
            style={{ border: '2px solid blue' }}
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <button
            style={{ border: '2px solid blue', background: 'coral' }}
            type="button"
            onClick={handleEntrar}
          >
            entrar
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;
