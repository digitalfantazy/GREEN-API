import { useState } from 'react';
import Input from '../Input/Input';
import styles from './NewChat.module.css';
import { NewChatProps } from '../../types/types';

const NewChat: React.FC<NewChatProps> = ({
  isCreatingChat,
  onClose,
  onChatSelect,
  sendMessage,
  setPhoneNumber,
  phoneNumber,
}) => {
  const [message, setMessage] = useState('');

  const createChat = () => {
    if (phoneNumber) {
      onChatSelect(phoneNumber);
      onClose();

      if (message.trim()) {
        sendMessage(phoneNumber, message);
        setMessage('');
        setPhoneNumber('');
      }
    }
  };

  return (
    <div className={`${styles.overlay} ${isCreatingChat ? styles.open : ''}`}>
      <div className={styles['new-chat']} onClick={(e) => e.stopPropagation()}>
        <Input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Номер телефона"
        />
        <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Сообщение" />
        <div className={styles['buttons']}>
          <button onClick={createChat} className={styles.send}>
            Отправить
          </button>
          <button className={styles.cancel} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
