
import React from 'react';
import { Icons } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 hidden lg:flex flex-col border-r border-white/10 bg-[#121212] p-4 h-screen">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Icons.Beaver />
        <h1 className="text-xl font-bold text-orange-400">Tiko-Bobro</h1>
      </div>

      <nav className="space-y-1">
        <NavItem icon={<Icons.Home />} label="For You" active />
        <NavItem icon={<Icons.Search />} label="Explore" />
        <div className="py-4 px-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Suggested Bobros</h3>
          <div className="space-y-4">
            <SuggestedAccount name="GigaBeaver" followers="1.2M" />
            <SuggestedAccount name="DamBuilder99" followers="450K" />
            <SuggestedAccount name="WoodChewer" followers="2.1M" />
          </div>
        </div>
      </nav>

      <div className="mt-auto p-4 bg-orange-900/20 rounded-xl border border-orange-500/30">
        <p className="text-xs text-orange-300 font-medium">Join the Wood Tribe Premium!</p>
        <button className="mt-2 w-full py-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-sm font-bold transition-colors">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${active ? 'text-orange-500 bg-orange-500/10' : 'hover:bg-white/5 text-gray-400'}`}>
    {icon}
    <span className="font-semibold">{label}</span>
  </div>
);

const SuggestedAccount = ({ name, followers }: { name: string, followers: string }) => (
  <div className="flex items-center gap-3 cursor-pointer group">
    <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
      <img src={`https://picsum.photos/seed/${name}/50`} alt="" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-bold group-hover:underline truncate">{name}</p>
      <p className="text-xs text-gray-500">{followers}</p>
    </div>
  </div>
);

export default Sidebar;
