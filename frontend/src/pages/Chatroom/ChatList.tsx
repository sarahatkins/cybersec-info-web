import React from 'react';

interface ChatListProps {
  people: any;
  selectedId: any;
  onSelect: any;
}

const ChatList: React.FC<ChatListProps> = ({ people, selectedId, onSelect }) => (
  <div className="chatlist">
    {people.map((p: any) => (
      <div
        key={p.id}
        className={`chatlist-item ${p.id === selectedId ? 'selected' : ''}`}
        onClick={() => onSelect(p)}
      >
        <div className="avatar">{p.avatar}</div>
        <div className="name">{p.name}</div>
      </div>
    ))}
  </div>
);

export default ChatList;
