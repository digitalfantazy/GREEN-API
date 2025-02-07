import { useState, useEffect } from 'react';
import axios from 'axios';

import SideMenu from '../../components/SideMenu/SideMenu';
import ChatWindow from '../../components/ChatWindow/ChatWindow';
import ChatInput from '../../components/ChatInput/ChatInput';

import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../utils/constants';
import styles from './chatPage.module.css';

interface Message {
  sender: string;
  text: string;
}

const ChatPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [chatList, setChatList] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const { idInstance, apiTokenInstance } = useAuth();

  const receiveNotification = async () => {
    try {
      const res = await axios.get(API_URL + `waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);

      if (res.data && res.data.body) {
        const { senderData, messageData } = res.data.body;

        if (senderData && messageData) {
          const sender = senderData.sender.split('@')[0];
          const text = messageData.textMessageData?.textMessage || '';

          if (text) {
            setMessages((prevMessages) => ({
              ...prevMessages,
              [sender]: [...(prevMessages[sender] || []), { sender, text }],
            }));

            if (chatList.includes(sender)) {
              setChatList((prevChats) => [...prevChats, sender]);
            }
          }
        }

        await deleteNotification(res.data.receiptId);
      }
    } catch (error) {
      console.error('Ошибка получения уведомления:', error);
    }
  };

  const deleteNotification = async (receiptId: number) => {
    try {
      await axios.delete(API_URL + `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`);
    } catch (error) {
      console.error('Ошибка удаления уведомления:', error);
    }
  };
  const sendMessage = async (phoneNumber: string, message: string) => {
    if (!phoneNumber || !message.trim()) return;

    try {
      await axios.post(API_URL + `waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        chatId: `${phoneNumber}@c.us`,
        message,
      });

      setMessages((prevMessages) => ({
        ...prevMessages,
        [phoneNumber]: [...(prevMessages[phoneNumber] || []), { sender: 'Вы', text: message }],
      }));

      if (!chatList.includes(phoneNumber)) {
        setChatList((prevChats) => [...prevChats, phoneNumber]);
      }
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  const handleChatSelect = (chat: string) => {
    setPhoneNumber(chat);
  };

  useEffect(() => {
    const interval = setInterval(receiveNotification, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles['chat-container']}>
      <SideMenu
        chatList={chatList}
        onChatSelect={handleChatSelect}
        sendMessage={sendMessage}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <div className={styles['current-chat']}>
        <ChatWindow messages={messages[phoneNumber] || []} />
        <ChatInput phoneNumber={phoneNumber} onSendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;
