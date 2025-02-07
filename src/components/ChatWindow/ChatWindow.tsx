import { IMessage } from '../../types/types';
import styles from './ChatWindow.module.css';

interface MessageListProps {
  messages: IMessage[];
}

const ChatWindow: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className={styles['chat-box']}>
      {messages.map((msg, index) => (
        <div key={index} className={msg.sender === 'Вы' ? styles.sent : styles.received}>
          <span className={styles.sender}>{msg.sender}</span>
          <span className={styles.message}>{msg.text}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
