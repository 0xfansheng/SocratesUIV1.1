'use client';

import { Market } from '../mock/markets';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ThreeColumnMarketCardProps {
  market: Market;
  onCardClick?: (marketId: string) => void;
}

export default function ThreeColumnMarketCard({ market, onCardClick }: ThreeColumnMarketCardProps) {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'ending_soon': return 'text-yellow-400 bg-yellow-400/10';
      case 'ended': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-blue-400 bg-blue-400/10';
    }
  };

  const formatVolume = (volume: string) => {
    return volume;
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'crypto': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'politics': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'sports': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'tech': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'news': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(market.id);
    }
  };

  return (
    <div 
      className={`
        relative bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-800/50 
        overflow-hidden transition-all duration-300 cursor-pointer group
        ${isHovered ? 'transform -translate-y-1 md:-translate-y-2 shadow-xl md:shadow-2xl shadow-green-500/10 border-green-500/30' : 'hover:border-gray-700'}
        w-full max-w-sm mx-auto
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Cover Image */}
      <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden rounded-md" style={{ aspectRatio: '16/9' }}>
        <img 
          src={market.coverImage || market.imageUrl || '/default-cover.png'}
          alt={market.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className={`absolute top-2 md:top-3 right-2 md:right-3 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium ${getStatusColor(market.status)}`}>
          <span className="hidden sm:inline">{market.status.replace('_', ' ').toUpperCase()}</span>
          <span className="sm:hidden">{market.status === 'ending_soon' ? '即将结束' : market.status === 'active' ? '进行中' : '已结束'}</span>
        </div>
        
        {/* Hot Badge */}
        {market.isHot && (
          <div className="absolute top-2 md:top-3 left-2 md:left-3 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
            🔥 <span className="hidden sm:inline">{t('card.hot')}</span>
          </div>
        )}
        
        {/* Icon */}
        <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 w-6 h-6 md:w-8 md:h-8 bg-gray-900/80 rounded-full flex items-center justify-center text-sm md:text-lg">
          {market.icon}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3 md:p-4 space-y-2 md:space-y-3">
        {/* Category */}
        <div className={`inline-flex px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-xs font-medium border ${getCategoryColor(market.category)}`}>
          {market.category}
        </div>

        {/* Title */}
        <h3 className="text-xs sm:text-sm font-semibold text-white leading-tight line-clamp-2 group-hover:text-green-400 transition-colors duration-200">
          {market.title}
        </h3>

        {/* Probability Bar */}
        <div className="space-y-1.5 md:space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{t('card.yes')}</span>
            <span className="text-sm md:text-lg font-bold text-green-400">{market.yesPercentage}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1 md:h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${market.yesPercentage}%` }}
            />
          </div>
        </div>

        {/* Price and Change */}
        <div className="flex justify-between items-center">
          <div className="space-y-0.5 md:space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('card.price')}</p>
            <p className="text-xs md:text-sm font-bold text-white">${market.currentPrice.toFixed(2)}</p>
          </div>
          <div className="space-y-0.5 md:space-y-1 text-right">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{t('card.24h')}</p>
            <p className={`text-xs md:text-sm font-bold ${
              market.priceChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {market.priceChange >= 0 ? '+' : ''}{market.priceChange.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Volume and Liquidity */}
        <div className="grid grid-cols-2 gap-1.5 md:gap-2 text-xs">
          <div>
            <p className="text-gray-500">{t('card.volume')}</p>
            <p className="text-white font-medium text-xs">{formatVolume(market.volume)}</p>
          </div>
          <div>
            <p className="text-gray-500">{t('card.liquidity')}</p>
            <p className="text-blue-400 font-medium text-xs">{market.liquidity}</p>
          </div>
        </div>

        {/* Participants and End Date */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            <span className="text-gray-400 text-xs">{market.participants.toLocaleString()}</span>
          </div>
          
          <span className="text-gray-500 text-xs truncate ml-2">{market.endDate}</span>
        </div>

        {/* Action Button */}
        <button className="w-full py-1.5 md:py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs md:text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105">
          {t('card.tradeNow')}
        </button>

        {/* Tags */}
        {market.tags && market.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {market.tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index}
                className="px-1.5 md:px-2 py-0.5 bg-gray-800/50 text-gray-300 text-xs rounded border border-gray-700/50"
              >
                #{tag}
              </span>
            ))}
            {market.tags.length > 2 && (
              <span className="px-1.5 md:px-2 py-0.5 bg-gray-800/50 text-gray-400 text-xs rounded border border-gray-700/50">
                +{market.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 blur-xl" />
      </div>
    </div>
  );
}