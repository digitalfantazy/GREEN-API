export interface IMessage {
  sender: string;
  text: string;
}

export interface ILastMessage {
  chatId: string;
  timestamp: number;
  senderName?: string;
  textMessage: string;
}

export interface SideMenuProps {
  chatList: string[];
  onChatSelect: (chat: string) => void;
  sendMessage: (chatNumber: string, messageText: string) => void;
  setPhoneNumber: (chat: string) => void;
  phoneNumber: string;
}

export interface NewChatProps {
  isCreatingChat: boolean;
  onClose: () => void;
  onChatSelect: (chatNumber: string) => void;
  sendMessage: (chatNumber: string, messageText: string) => void;
  setPhoneNumber: (chat: string) => void;
  phoneNumber: string;
}

export interface ChatWindowProps {
  messages: IMessage[];
}
