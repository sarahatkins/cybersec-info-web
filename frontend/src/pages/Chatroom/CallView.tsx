import React from 'react';

interface CallViewProps {
  person: any;
}

const CallView: React.FC<CallViewProps> = ({ person }) => (
  <div className="call-view">
    <h3>Call {person.name}</h3>
    <p>📹 This is a fake call screen.</p>
    <button>Start Call</button>
  </div>
);

export default CallView;
