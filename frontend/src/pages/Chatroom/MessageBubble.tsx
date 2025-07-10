interface Props {
  text: string;
}

const MessageBubble: React.FC<Props> = ({ text }) => {
  return <div style={{ margin: '4px 0' }}>👤 <strong>User:</strong> {text}</div>;
};

export default MessageBubble;
