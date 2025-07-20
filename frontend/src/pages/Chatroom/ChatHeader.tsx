import React from 'react';


interface TeamsHeaderProps {
  activeTab: any;
  setActiveTab: any;
  onClose: any;
  onFullscreen: any;
  isFullscreen: any;
}

const TeamsHeader: React.FC<TeamsHeaderProps> = ({ activeTab, setActiveTab, onClose, onFullscreen, isFullscreen }) => (
  <div className="teams-header">
    <div className="tabs">
      <button onClick={() => setActiveTab('chat')} className={activeTab === 'chat' ? 'active' : ''}>💬 Chat</button>
      <button onClick={() => setActiveTab('call')} className={activeTab === 'call' ? 'active' : ''}>📞 Call</button>
    </div>
    <div>
      <button onClick={onFullscreen} title="Toggle Fullscreen">
        {isFullscreen ? '🗗' : '🗖'}
      </button>
      <button onClick={onClose} className="close-btn" title="Close">✖</button>
    </div>
  </div>
);

export default TeamsHeader;
