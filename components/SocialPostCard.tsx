import React from 'react';
import type { CardData } from '../types';
import { SocialPostPlatform } from '../types';

interface SocialPostCardProps {
  data: CardData;
  onClick: () => void;
}

const Stat: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <p className="font-bold text-xl text-gray-800">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

const SocialPostCard: React.FC<SocialPostCardProps> = ({ data, onClick }) => {
  const details = data.socialPostDetails;
  if (!details) return null;

  const { platform, mediaUrl, mediaType, likes, comments, shares, postUrl } = details;

  const handleViewPostClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(postUrl, '_blank', 'noopener,noreferrer');
  };

  const getBorderStyle = (): React.CSSProperties => {
    if (platform === SocialPostPlatform.TikTok) {
      return { 
        background: 'linear-gradient(135deg, #25f4ee 49.5%, #fe2c55 50.5%)',
        padding: '4px' 
      };
    }
    return {};
  };

  const getBorderClassName = (): string => {
    switch (platform) {
      case SocialPostPlatform.Facebook: return 'p-1 bg-blue-600';
      case SocialPostPlatform.Instagram: return 'p-1 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600';
      default: return '';
    }
  };

  return (
    <div
      onClick={onClick}
      style={getBorderStyle()}
      className={`flex-shrink-0 w-[275px] h-full rounded-2xl shadow-lg mr-4 snap-start last:mr-0 flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${getBorderClassName()}`}
    >
      <div className="bg-white rounded-[14px] overflow-hidden h-full flex flex-col">
        <div className="relative h-48 bg-gray-200">
          {mediaUrl ? (
             <img src={mediaUrl} alt={data.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-blue-100">
               <p className="text-sm text-blue-700 font-semibold mb-2">{data.title}</p>
               <div className="w-16 h-16 rounded-lg bg-blue-200 flex items-center justify-center text-3xl text-blue-600 font-bold shadow-inner">?</div>
            </div>
          )}
          {mediaType === 'video' && mediaUrl && (
            <div className="absolute top-2 right-2 bg-black/50 rounded-full w-6 h-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-3 bg-white/70 backdrop-blur-md flex-grow flex flex-col justify-between">
          <div className="flex justify-around items-center">
            {details.likes > 0 && <Stat value={likes} label="Likes" />}
            {details.comments > 0 && <Stat value={comments} label="Comments" />}
            {details.shares > 0 && <Stat value={shares} label="Shares" />}
          </div>
          <button
            onClick={handleViewPostClick}
            className="mt-3 w-full bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialPostCard;
