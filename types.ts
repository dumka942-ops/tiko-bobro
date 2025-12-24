
export interface Video {
  id: string;
  url: string;
  thumbnail: string;
  creator: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  isShort: boolean;
  type: 'native' | 'youtube';
}

export interface BobroMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
