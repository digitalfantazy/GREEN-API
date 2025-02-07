import { ILastMessage } from '../types/types';

export const getLastMessageText = (
  chatId: string,
  lastIncoming: ILastMessage[],
  lastOutgoing: ILastMessage[],
): string => {
  const incoming = lastIncoming.filter((msg) => msg.chatId === chatId);
  const outgoing = lastOutgoing.filter((msg) => msg.chatId === chatId);

  const lastMessage = [...incoming, ...outgoing].sort((a, b) => b.timestamp - a.timestamp)[0];

  return lastMessage ? `${lastMessage.senderName || 'Вы'}: ${lastMessage.textMessage}` : 'Нет сообщений';
};
