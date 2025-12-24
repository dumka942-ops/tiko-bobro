
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import BobroAssistant from './components/BobroAssistant';
import UploadModal from './components/UploadModal';
import { MOCK_VIDEOS, Icons } from './constants';
import { Video } from './types';

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const index = Math.round(scrollRef.current.scrollTop / window.innerHeight);
        if (index !== activeIndex && index < videos.length) {
          setActiveIndex(index);
        }
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [activeIndex, videos.length]);

  const addVideo = (video: Video) => {
    setVideos([video, ...videos]);
    setIsUploadOpen(false);
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  const currentVideo = videos[activeIndex];
  const videoContext = currentVideo ? `${currentVideo.title}: ${currentVideo.description}` : '';

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      {/* Sidebar - Desktop Only */}
      <div className="flex flex-col h-full border-r border-white/10">
        <Sidebar />
        <div className="hidden lg:flex flex-col p-4 bg-[#121212]">
           <button 
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center justify-center gap-3 w-full py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-600/20"
           >
             <Icons.Plus />
             <span>Upload</span>
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col md:flex-row h-full">
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-0 left-0 right-0 z-[30] p-4 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-2xl drop-shadow-md">🦫</span>
            <h1 className="text-xl font-bold text-orange-400 drop-shadow-md">Tiko-Bobro</h1>
          </div>
          <div className="flex items-center gap-4">
             <button 
              onClick={() => setIsUploadOpen(true)}
              className="p-2 bg-orange-600 rounded-full shadow-lg"
             >
                <Icons.Plus />
             </button>
          </div>
        </div>

        {/* Video Feed Wrapper */}
        <div 
          ref={scrollRef}
          className="flex-1 h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        >
          {videos.map((video, idx) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              isActive={idx === activeIndex} 
            />
          ))}
        </div>

        {/* Side Panel (Desktop only) */}
        <div className="hidden xl:flex w-96 flex-col p-6 border-l border-white/10 h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Bobro-Stats</h2>
            <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/5">
                <p className="text-gray-400 text-sm mb-1">Weekly Wood Collection</p>
                <div className="text-3xl font-bold text-orange-400">12.4 Tonnes</div>
                <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-600 w-3/4 shadow-[0_0_10px_rgba(234,88,12,0.5)]"></div>
                </div>
            </div>

            <h3 className="font-bold mb-3">Community Dams</h3>
            <div className="flex flex-wrap gap-2 mb-8">
                {['#damLife', '#forestVibes', '#woodEngineering', '#tailSlap', '#nature'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs cursor-pointer border border-white/5 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>

            <h3 className="font-bold mb-3">Latest Wood-Drop</h3>
            <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all cursor-pointer">
                    <p className="text-sm font-medium">Beaver in Canada builds 850m long dam visible from space!</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
            </div>
        </div>
      </main>

      {/* Modals & Assistant */}
      {isUploadOpen && (
        <UploadModal 
          onClose={() => setIsUploadOpen(false)} 
          onAdd={addVideo} 
        />
      )}
      <BobroAssistant currentVideoContext={videoContext} />
    </div>
  );
};

export default App;
