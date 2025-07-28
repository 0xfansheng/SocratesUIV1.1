'use client';

import { useState, useEffect, useCallback } from 'react';
import ThreeColumnMarketCard from '../../components/ThreeColumnMarketCard';
import { mockMarkets, Market } from '../../mock/markets';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ThreeColumnPage() {
  const { t } = useLanguage();
  const [column1Markets, setColumn1Markets] = useState<Market[]>([]);
  const [column2Markets, setColumn2Markets] = useState<Market[]>([]);
  const [column3Markets, setColumn3Markets] = useState<Market[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 初始化数据 - 每列10个市场
  useEffect(() => {
    const initialMarkets = mockMarkets.slice(0, 30);
    setColumn1Markets(initialMarkets.filter((_, index) => index % 3 === 0));
    setColumn2Markets(initialMarkets.filter((_, index) => index % 3 === 1));
    setColumn3Markets(initialMarkets.filter((_, index) => index % 3 === 2));
    setCurrentIndex(30);
  }, []);

  // 加载更多数据
  const loadMoreMarkets = useCallback(() => {
    if (isLoading || currentIndex >= mockMarkets.length) return;
    
    setIsLoading(true);
    
    // 模拟网络延迟
    setTimeout(() => {
      const nextBatch = mockMarkets.slice(currentIndex, currentIndex + 9);
      
      if (nextBatch.length > 0) {
        const newColumn1 = nextBatch.filter((_, index) => index % 3 === 0);
        const newColumn2 = nextBatch.filter((_, index) => index % 3 === 1);
        const newColumn3 = nextBatch.filter((_, index) => index % 3 === 2);
        
        setColumn1Markets(prev => [...prev, ...newColumn1]);
        setColumn2Markets(prev => [...prev, ...newColumn2]);
        setColumn3Markets(prev => [...prev, ...newColumn3]);
        setCurrentIndex(prev => prev + 9);
      }
      
      setIsLoading(false);
    }, 800);
  }, [currentIndex, isLoading]);

  // 滚动监听 - 触底加载
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          >= document.documentElement.offsetHeight - 1000) {
        loadMoreMarkets();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreMarkets]);

  return (
    <div className="min-h-screen bg-black text-white font-['Space_Grotesk']">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="responsive-container py-3 md:py-4">
          <div className="flex items-center justify-between mobile-flex-col mobile-space-y-4 md:flex-row">
            <div className="flex items-center space-x-2 md:space-x-4 mobile-text-center">
              <h1 className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Socrates Markets
              </h1>
              <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="hidden sm:inline">{t('threeColumn.liveMarkets')}</span>
                <span className="sm:hidden">Live</span>
              </div>
            </div>
            <div className="text-xs md:text-sm text-gray-400 mobile-text-center">
              <span className="hidden sm:inline">
                {column1Markets.length + column2Markets.length + column3Markets.length} {t('threeColumn.markets')}
              </span>
              <span className="sm:hidden">
                {column1Markets.length + column2Markets.length + column3Markets.length} 市场
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Three Column Layout */}
      <div className="responsive-container py-4 md:py-8">
        <div className="responsive-grid mobile-grid-1 tablet-grid-2 desktop-grid-3 wide-grid-4 ultrawide-grid-6">
          {/* 移动端：单列显示所有市场 */}
          <div className="md:hidden space-y-4">
            {[...column1Markets, ...column2Markets, ...column3Markets]
              .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())
              .map((market, index) => (
                <div 
                  key={`mobile-${market.id}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ThreeColumnMarketCard market={market} />
                </div>
              ))
            }
          </div>

          {/* 平板端及以上：多列显示 */}
          {/* Column 1 */}
          <div className="hidden md:block space-y-4 lg:space-y-6">
            {column1Markets.map((market, index) => (
              <div 
                key={`col1-${market.id}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ThreeColumnMarketCard market={market} />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="hidden md:block space-y-4 lg:space-y-6">
            {column2Markets.map((market, index) => (
              <div 
                key={`col2-${market.id}`}
                className="animate-fade-in"
                style={{ animationDelay: `${(index * 100) + 50}ms` }}
              >
                <ThreeColumnMarketCard market={market} />
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="hidden lg:block space-y-4 lg:space-y-6">
            {column3Markets.map((market, index) => (
              <div 
                key={`col3-${market.id}`}
                className="animate-fade-in"
                style={{ animationDelay: `${(index * 100) + 100}ms` }}
              >
                <ThreeColumnMarketCard market={market} />
              </div>
            ))}
          </div>

          {/* 宽屏第4列 */}
          <div className="hidden wide:block space-y-6">
            {column1Markets.slice(0, Math.ceil(column1Markets.length / 2)).map((market, index) => (
              <div 
                key={`col4-${market.id}`}
                className="animate-fade-in"
                style={{ animationDelay: `${(index * 100) + 150}ms` }}
              >
                <ThreeColumnMarketCard market={market} />
              </div>
            ))}
          </div>

          {/* 超宽屏第5、6列 */}
          <div className="hidden ultrawide:block space-y-6">
            {column2Markets.slice(0, Math.ceil(column2Markets.length / 2)).map((market, index) => (
              <div 
                key={`col5-${market.id}`}
                className="animate-fade-in"
                style={{ animationDelay: `${(index * 100) + 200}ms` }}
              >
                <ThreeColumnMarketCard market={market} />
              </div>
            ))}
          </div>

          <div className="hidden ultrawide:block space-y-6">
            {column3Markets.slice(0, Math.ceil(column3Markets.length / 2)).map((market, index) => (
              <div 
                key={`col6-${market.id}`}
                className="animate-fade-in"
                style={{ animationDelay: `${(index * 100) + 250}ms` }}
              >
                <ThreeColumnMarketCard market={market} />
              </div>
            ))}
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-400">{t('threeColumn.loadingMore')}</span>
            </div>
          </div>
        )}

        {/* End of Data Indicator */}
        {currentIndex >= mockMarkets.length && !isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-gray-400">{t('threeColumn.endOfMarkets')}</p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
              >
                {t('threeColumn.backToTop')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}