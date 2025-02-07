import { useEffect, useState } from 'react';
import axios from 'axios';

import NewChat from '../NewChat/NewChat';

import defaultAvatar from './../../assets/default-avatar.png';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../utils/constants';
import styles from './SideMenu.module.css';
import { ILastMessage, SideMenuProps } from '../../types/types';
import { getLastMessageText } from '../../utils/GetLastMessageText';

const SideMenu: React.FC<SideMenuProps> = ({ chatList, onChatSelect, sendMessage, phoneNumber, setPhoneNumber }) => {
  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const [lastIncoming, setLastIncoming] = useState<ILastMessage[]>([]);
  const [lastOutgoing, setLastOutgoing] = useState<ILastMessage[]>([]);

  const { userData, idInstance, apiTokenInstance } = useAuth();

  const lastIncomingMessages = async () => {
    try {
      const { data } = await axios.get(API_URL + `waInstance${idInstance}/lastIncomingMessages/${apiTokenInstance}`);
      setLastIncoming(data);
    } catch (error) {
      console.error('Error get last incomming messages', error);
    }
  };

  const lastOutgoingMessages = async () => {
    try {
      const { data } = await axios.get(API_URL + `waInstance${idInstance}/lastOutgoingMessages/${apiTokenInstance}`);
      setLastOutgoing(data);
    } catch (error) {
      console.error('Error get last outgoing messages', error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      await lastIncomingMessages();
      await lastOutgoingMessages();
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles['side-menu']}`}>
      <div className={styles['side-menu__header']}>
        <div className={styles['user-info']}>
          <img src={userData?.avatar || defaultAvatar} alt="Avatar" className={styles['user-avatar']} />
          <div className={styles['user-details']}>
            <p>ID Instance: {idInstance}</p>
            <p>Номер: {userData?.phone}</p>
          </div>
        </div>
        <button className={styles.createChatBtn} onClick={() => setIsCreatingChat(true)}>
          Начать новый чат
        </button>
        <h2 className={styles['chat-title']}>Чаты</h2>
      </div>

      <div className={`${styles['chat-list-container']} ${isCreatingChat ? styles.hidden : ''}`}>
        <ul className={styles['chat-list']}>
          {chatList.map((chat, index) => (
            <li
              key={index}
              className={`${styles['chat-item']} ${phoneNumber === chat ? styles.active : ''}`}
              onClick={() => onChatSelect(chat)}
            >
              <img src={defaultAvatar} alt="Avatar" className={styles['chat-avatar']} />
              <div className={styles['chat-info']}>
                <span className={styles['chat-name']}>{chat}</span>
                <div className={styles['chat-last-message-container']}>
                  <span className={styles['chat-last-message']}>
                    {getLastMessageText(`${chat}@c.us`, lastIncoming, lastOutgoing)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <NewChat
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        isCreatingChat={isCreatingChat}
        onClose={() => setIsCreatingChat(false)}
        onChatSelect={(chat) => {
          onChatSelect(chat);
        }}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default SideMenu;
