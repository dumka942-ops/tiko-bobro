
import React, { useState } from 'react';
import { Icons } from '../constants';
import { Video } from '../types';

interface UploadModalProps {
  onClose: () => void;
  onAdd: (video: Video) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onAdd }) => {
  const [activeTab, setActiveTab] = useState<'link' | 'file'>('link');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleLinkSubmit = () => {
    const ytId = getYouTubeId(url);
    if (!ytId) {
      alert("Please enter a valid YouTube link!");
      return;
    }

    const newVideo: Video = {
      id: `yt-${Date.now()}`,
      url: `https://www.youtube.com/embed/${ytId}`,
      thumbnail: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`,
      creator: 'You',
      title: title || 'My YouTube Discovery',
      description: 'Found this cool video!',
      likes: 0,
      comments: 0,
      shares: 0,
      isShort: false,
      type: 'youtube'
    };
    onAdd(newVideo);
  };

  const handleFileSubmit = () => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    const newVideo: Video = {
      id: `local-${Date.now()}`,
      url: objectUrl,
      thumbnail: '',
      creator: 'You',
      title: title || file.name,
      description: 'Uploaded from my device',
      likes: 0,
      comments: 0,
      shares: 0,
      isShort: true,
      type: 'native'
    };
    onAdd(newVideo);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1e1e1e] w-full max-w-md rounded-3xl border border-orange-500/30 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-orange-900/10">
          <h2 className="text-xl font-bold text-orange-400">Add to the Dam 🪵</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex bg-black/30 rounded-xl p-1 mb-6">
            <button 
              onClick={() => setActiveTab('link')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'link' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              YouTube/Social Link
            </button>
            <button 
              onClick={() => setActiveTab('file')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'file' ? 'bg-orange-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Upload File
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Video Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What is this masterpiece?"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
              />
            </div>

            {activeTab === 'link' ? (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Social Link</label>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste YouTube or TikTok link..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Video</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center group-hover:border-orange-500/50 transition-all bg-black/20">
                    <div className="text-4xl mb-2">🎥</div>
                    <p className="text-sm text-gray-400 font-medium">{file ? file.name : 'Click to browse files'}</p>
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={activeTab === 'link' ? handleLinkSubmit : handleFileSubmit}
              className="w-full py-4 bg-orange-600 hover:bg-orange-500 rounded-2xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all mt-4"
            >
              Build the Dam! 🏗️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
