import { useState } from 'react';

import styles from './ChatInput.module.css';
import sendSVG from './../../assets/send.svg';

interface ChatInputProps {
  phoneNumber: string;
  onSendMessage: (phoneNumber: string, message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ phoneNumber, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(phoneNumber, message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles['chat-input-container']}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение..."
        maxLength={500}
        className={styles.textarea}
      ></textarea>
      <button className={styles['send-button']} onClick={handleSendMessage}>
        <img src={sendSVG} alt="send" />
      </button>
    </div>
  );
};

export default ChatInput;
