interface ChatMessage {
  avatar: string;
  bgColor?: string;
  name: string;
  sent: boolean;
  stamp: string;
  text: string[];
  textColor?: string;
}

interface SessionItem {
  avatar: string;
  message: ChatMessage;
  name: string;
  unread: number;
}

interface TouchPanEvent {
  isFirst: boolean;
  isFinal: boolean;
  duration: number;
  distance: {
    x: number;
    y: number;
  };
  offset: {
    x: number;
    y: number;
  };
  delta: {
    x: number;
    y: number;
  };
}

export type { ChatMessage, SessionItem, TouchPanEvent };
