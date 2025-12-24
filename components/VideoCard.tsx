
import React, { useRef, useEffect, useState } from 'react';
import { Icons } from '../constants';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  isActive: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (video.type === 'native' && isActive && videoRef.current && !hasError) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log("Autoplay blocked or failed", e));
      }
    } else if (video.type === 'native' && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive, video.type, hasError]);

  const handleVideoError = () => {
    console.error("Video failed to load:", video.url);
    setHasError(true);
    setIsLoading(false);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Extract YouTube ID more reliably for the playlist parameter (needed for loop)
  const getYTId = (url: string) => {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    return lastPart.split('?')[0];
  };

  const ytId = video.type === 'youtube' ? getYTId(video.url) : '';
  const embedUrl = video.type === 'youtube' 
    ? `${video.url}?autoplay=${isActive ? 1 : 0}&mute=1&controls=0&loop=1&playlist=${ytId}&enablejsapi=1&origin=${window.location.origin}`
    : '';

  return (
    <div className="relative w-full h-screen bg-black snap-start flex items-center justify-center overflow-hidden">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#1a1a1a]">
          <div className="flex flex-col items-center animate-pulse">
            <span className="text-4xl mb-2">🪵</span>
            <p className="text-orange-400 text-sm font-bold">Строим плотину...</p>
          </div>
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-center p-6">
          <span className="text-6xl mb-4">🌊</span>
          <h3 className="text-xl font-bold text-orange-500 mb-2">Плотина прорвана!</h3>
          <p className="text-gray-400 text-sm max-w-xs">Это видео временно занесло илом или оно было удалено из леса.</p>
        </div>
      ) : video.type === 'native' ? (
        <video
          ref={videoRef}
          src={video.url}
          loop
          playsInline
          onCanPlay={handleVideoLoad}
          onError={handleVideoError}
          className={`w-full h-full ${video.isShort ? 'object-cover' : 'object-contain'}`}
        />
      ) : (
        <div className="w-full h-full relative">
          <iframe
            className="w-full h-full pointer-events-none"
            src={embedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={() => setIsLoading(false)}
          ></iframe>
          {/* Transparent interaction layer */}
          <div className="absolute inset-0 z-0 bg-transparent" />
        </div>
      )}
      
      {/* Overlay controls - Ensure high Z-index to avoid iframe capturing clicks */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-30">
        <div 
          className="flex flex-col items-center group cursor-pointer active:scale-90 transition-transform" 
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
        >
          <div className="p-3 bg-black/40 backdrop-blur-md rounded-full group-hover:bg-white/10 transition-all border border-white/5">
            <Icons.Like filled={isLiked} />
          </div>
          <span className="text-sm font-bold mt-1 drop-shadow-md">{(video.likes / 1000).toFixed(1)}K</span>
        </div>

        <div className="flex flex-col items-center group cursor-pointer active:scale-90 transition-transform">
          <div className="p-3 bg-black/40 backdrop-blur-md rounded-full group-hover:bg-white/10 transition-all border border-white/5">
            <Icons.Comment />
          </div>
          <span className="text-sm font-bold mt-1 drop-shadow-md">{video.comments}</span>
        </div>

        <div className="flex flex-col items-center group cursor-pointer active:scale-90 transition-transform">
          <div className="p-3 bg-black/40 backdrop-blur-md rounded-full group-hover:bg-white/10 transition-all border border-white/5">
            <Icons.Share />
          </div>
          <span className="text-sm font-bold mt-1 drop-shadow-md">{video.shares}</span>
        </div>

        <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden bg-orange-900 shadow-xl">
           <img src={`https://picsum.photos/seed/${video.creator}/100`} alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Info Overlay */}
      <div className="absolute left-4 bottom-24 right-20 z-20 pointer-events-none">
        <h3 className="font-bold text-lg mb-1 drop-shadow-lg flex items-center gap-2">
          @{video.creator}
          <span className="bg-orange-600 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-tighter">Pro</span>
        </h3>
        <p className="text-sm line-clamp-2 mb-2 font-medium drop-shadow-lg text-gray-100">{video.title}</p>
        <div className="flex items-center gap-2">
            <div className="bg-orange-600/50 p-1 rounded-full backdrop-blur-md border border-orange-400/30">
                <Icons.Beaver />
            </div>
            <span className="text-xs bg-black/30 px-2 py-1 rounded backdrop-blur-md border border-white/10">Оригинальный звук - {video.creator}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default VideoCard;
