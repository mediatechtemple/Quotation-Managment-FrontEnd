'use client';
import React, { useState, useEffect } from 'react';

const ChatApp = () => {
  // Sample users array (id, name)
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  // Sample chat threads array (id, chat_name, is_group, created_by)
  const [chats, setChats] = useState([
    { id: 1, chat_name: 'Chat with Bob', is_group: false, created_by: 1 },
    { id: 2, chat_name: 'Family Group', is_group: true, created_by: 1 },
  ]);

  // Sample messages array (id, chat_id, sender_id, content)
  const [messages, setMessages] = useState([
    { id: 1, chat_id: 1, sender_id: 1, content: 'Hey Bob!' },
    { id: 2, chat_id: 1, sender_id: 2, content: 'Hey Alice!' },
    { id: 3, chat_id: 2, sender_id: 3, content: 'Hello Family!' },
  ]);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  // State to track selected chat
  const [selectedChat, setSelectedChat] = useState(null);
  

  // Function to send a new message
  const sendMessage = (chatId, userId, content) => {
    const newMessage = {
      id: messages.length + 1,
      chat_id: chatId,
      sender_id: userId,
      content: content,
    };
    setMessages([...messages, newMessage]);
  };

  // Function to handle chat selection or creation
  const handleChatSelect = (userId, isGroup = false, groupName = '') => {
    if (isGroup) {
      // Check if group chat already exists
      const existingGroupChat = chats.find((chat) => chat.chat_name === groupName);
      if (!existingGroupChat) {
        const newGroupChat = {
          id: chats.length + 1,
          chat_name: groupName,
          is_group: true,
          created_by: 1,
        };
        setChats([...chats, newGroupChat]);

        // Add a starting message
        const newMessage = {
          id: messages.length + 1,
          chat_id: newGroupChat.id,
          sender_id: 1,
          content: `Welcome to ${groupName}!`,
        };
        setMessages([...messages, newMessage]);

        setSelectedChat(newGroupChat.id);
      } else {
        setSelectedChat(existingGroupChat.id);
      }
    } else {
      // Check if the one-on-one chat already exists
      const existingChat = chats.find(
        (chat) =>
          chat.created_by === 1 &&
          !chat.is_group &&
          chat.chat_name.includes(users.find((user) => user.id === userId).name)
      );

      if (!existingChat) {
        const newChat = {
          id: chats.length + 1,
          chat_name: `Chat with ${users.find((user) => user.id === userId).name}`,
          is_group: false,
          created_by: 1,
        };
        setChats([...chats, newChat]);

        // Add a starting message
        const newMessage = {
          id: messages.length + 1,
          chat_id: newChat.id,
          sender_id: 1,
          content: `Hello ${users.find((user) => user.id === userId).name}, this is the start of our chat!`,
        };
        setMessages([...messages, newMessage]);

        setSelectedChat(newChat.id);
      } else {
        setSelectedChat(existingChat.id);
      }
    }
  };

  return (
    <div className="flex max-w-4xl mx-auto p-4">
      {/* Sidebar for Users */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="p-2 cursor-pointer hover:bg-blue-200"
              onClick={() => handleChatSelect(user.id)}
            >
              {user.name}
            </li>
          ))}
        </ul>
        {/* Button to create a group chat */}
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleChatSelect(null, true, 'New Group')}
        >
          Create Group Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">Chat Application</h1>

        {/* Chat Threads */}
        {selectedChat && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {chats.find((chat) => chat.id === selectedChat)?.chat_name}
            </h2>
            <ul>
              {messages
                .filter((message) => message.chat_id === selectedChat)
                .map((message) => (
                  <li key={message.id} className="p-2">
                    <strong>{users.find((user) => user.id === message.sender_id).name}:</strong>{' '}
                    {message.content}
                  </li>
                ))}
            </ul>

            {/* Input to send new message */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => sendMessage(selectedChat, 1, 'New message from Alice!')}
            >
              Send Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
