
import React from 'react';
import { Video } from './types';

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    url: 'https://v.ftcdn.net/03/34/38/24/700_F_334382405_oK6kC7h8Dq8Z6NqC8H9lY2W3u3B4fJ6Z_ST.mp4',
    thumbnail: 'https://picsum.photos/seed/bobro1/400/600',
    creator: 'BobroMaster',
    title: 'Ужин в хатке!',
    description: 'Трудолюбивый бобр наслаждается свежей веткой. #beaver #nature #bobro',
    likes: 12400,
    comments: 450,
    shares: 89,
    isShort: true,
    type: 'native'
  },
  {
    id: 'yt-1',
    url: 'https://www.youtube.com/embed/9-pY8eWfWdE', 
    thumbnail: 'https://img.youtube.com/vi/9-pY8eWfWdE/maxresdefault.jpg',
    creator: 'RiverWild',
    title: 'Жизнь строителя плотин',
    description: 'Как эти удивительные существа меняют экосистемы.',
    likes: 8500,
    comments: 120,
    shares: 45,
    isShort: false,
    type: 'youtube'
  },
  {
    id: '3',
    url: 'https://v.ftcdn.net/02/10/53/33/700_F_210533319_v8Z7J9vJ6o3B2n3p9N7k8f8N9J6o3B2n_ST.mp4',
    thumbnail: 'https://picsum.photos/seed/bobro3/400/600',
    creator: 'NatureVibes',
    title: 'Идеальное место для плотины',
    description: 'Посмотрите на этот напор воды! Бобрам бы здесь понравилось.',
    likes: 45000,
    comments: 2100,
    shares: 1200,
    isShort: true,
    type: 'native'
  }
];

export const Icons = {
  Home: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Beaver: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-[#8B4513]">
      <path d="M12,2C10.89,2 10,2.89 10,4C10,4.71 10.37,5.33 10.93,5.68C8.16,6.38 6,8.91 6,12C6,15.7 8.5,18.81 12,19.74V22H14V19.74C17.5,18.81 20,15.7 20,12C20,8.91 17.84,6.38 15.07,5.68C15.63,5.33 16,4.71 16,4C16,2.89 15.11,2 14,2H12M12,8A1,1 0 0,1 13,9A1,1 0 0,1 12,10A1,1 0 0,1 11,9A1,1 0 0,1 12,8M16,10A1,1 0 0,1 17,11A1,1 0 0,1 16,12A1,1 0 0,1 15,11A1,1 0 0,1 16,10M12,14C13.1,14 14,14.9 14,16H10C10,14.9 10.9,14 12,14Z" />
    </svg>
  ),
  Like: ({ filled }: { filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-colors ${filled ? 'text-red-500 fill-current' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Comment: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Share: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  )
};
