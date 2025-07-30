'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'
import { useWallet } from '../contexts/WalletContext'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage()
  const { isConnected, address, connectWallet, disconnectWallet, isConnecting } = useWallet()
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showWalletMenu, setShowWalletMenu] = useState(false)
  const [balance, setBalance] = useState('0.00')
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)

  // 模拟获取余额
  useEffect(() => {
    if (isConnected && address) {
      setIsLoadingBalance(true)
      // 模拟API调用获取余额
      const fetchBalance = async () => {
        try {
          // 模拟网络延迟
          await new Promise(resolve => setTimeout(resolve, 1000))
          // 模拟随机余额
          const mockBalance = (Math.random() * 10000 + 1000).toFixed(2)
          setBalance(mockBalance)
        } catch (error) {
          console.error('获取余额失败:', error)
          setBalance('0.00')
        } finally {
          setIsLoadingBalance(false)
        }
      }
      fetchBalance()
    } else {
      setBalance('0.00')
    }
  }, [isConnected, address])

  // 移除语言切换功能，只支持中文

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-primary">
      <div className="responsive-container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-accent-green to-primary-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-primary">PredictMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6">
            <Link 
              href="/create" 
              className="btn-primary text-sm lg:text-base px-3 py-2 lg:px-4"
            >
              {t('nav.createMarket')}
            </Link>
            
            <Link 
              href="/my-markets" 
              className="text-secondary hover:text-primary transition-colors font-medium text-sm lg:text-base whitespace-nowrap"
            >
              {t('nav.myMarkets')}
            </Link>
            
            <Link 
              href="/portfolio" 
              className="text-secondary hover:text-primary transition-colors font-medium text-sm lg:text-base whitespace-nowrap"
            >
              投资组合
            </Link>
            
            {/* Balance Display */}
            {isConnected && (
              <div className="flex items-center space-x-2 bg-primary/10 border border-primary/20 px-3 py-2 rounded-lg">
                <svg className="w-4 h-4 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span className="text-sm font-medium text-primary">
                  {isLoadingBalance ? (
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <span>加载中...</span>
                    </div>
                  ) : (
                    `¥${balance}`
                  )}
                </span>
              </div>
            )}

            {/* Wallet Connection */}
            {isConnected ? (
              <div className="relative">
                <button
                  onClick={() => setShowWalletMenu(!showWalletMenu)}
                  className="flex items-center space-x-1 lg:space-x-2 bg-accent-green/20 border border-accent-green/30 text-accent-green px-2 lg:px-4 py-2 rounded-lg hover:bg-accent-green/30 transition-colors text-sm lg:text-base"
                >
                  <div className="w-2 h-2 bg-accent-green rounded-full" />
                  <span className="font-medium hidden lg:inline">{formatAddress(address!)}</span>
                  <span className="font-medium lg:hidden">{formatAddress(address!).slice(0, 8)}</span>
                  <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showWalletMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-tertiary border border-secondary rounded-lg shadow-xl z-50">
                    <div className="p-3 border-b border-secondary">
                      <p className="text-xs text-secondary">{t('nav.wallet.address')}</p>
                      <p className="text-sm text-primary font-mono">{formatAddress(address!)}</p>
                    </div>
                    <div className="p-3 border-b border-secondary">
                      <p className="text-xs text-secondary">账户余额</p>
                      <p className="text-lg font-bold text-accent-green">
                        {isLoadingBalance ? (
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 border-2 border-accent-green/30 border-t-accent-green rounded-full animate-spin" />
                            <span className="text-sm">加载中...</span>
                          </div>
                        ) : (
                          `¥${balance}`
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        disconnectWallet()
                        setShowWalletMenu(false)
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-secondary transition-colors"
                    >
                      {t('nav.wallet.disconnect')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="btn-primary flex items-center space-x-1 lg:space-x-2 text-sm lg:text-base px-3 py-2 lg:px-4"
              >
                {isConnecting ? (
                  <>
                    <div className="w-3 h-3 lg:w-4 lg:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="hidden lg:inline">{t('nav.wallet.connecting')}</span>
                    <span className="lg:hidden">连接中</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="hidden lg:inline">{t('nav.connectWallet')}</span>
                    <span className="lg:hidden">连接</span>
                  </>
                )}
              </button>
            )}
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="btn-secondary text-xs lg:text-sm flex items-center space-x-1 px-2 lg:px-3 py-2"
              title={t('theme.toggle')}
            >
              {theme === 'dark' ? (
                <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
              <span className="hidden xl:inline">{theme === 'dark' ? t('theme.light') : t('theme.dark')}</span>
            </button>
            
            {/* 移除语言切换按钮 */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary py-3 space-y-3">
            <Link 
              href="/create" 
              className="block btn-primary text-center py-3 mx-4"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.createMarket')}
            </Link>
            
            <Link 
              href="/my-markets" 
              className="block text-secondary hover:text-primary transition-colors font-medium text-center py-2 mx-4"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.myMarkets')}
            </Link>
            
            {/* Mobile Wallet */}
            {isConnected ? (
              <div className="space-y-2 mx-4">
                <div className="text-center p-3 bg-accent-green/20 border border-accent-green/30 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 text-accent-green mb-2">
                    <div className="w-2 h-2 bg-accent-green rounded-full" />
                    <span className="font-medium text-sm">{formatAddress(address!)}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="font-bold text-accent-green">
                      {isLoadingBalance ? (
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 border-2 border-accent-green/30 border-t-accent-green rounded-full animate-spin" />
                          <span className="text-sm">加载中...</span>
                        </div>
                      ) : (
                        `¥${balance}`
                      )}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    disconnectWallet()
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-red-400 font-medium py-3 px-4 border border-red-600/30 rounded-lg hover:bg-red-600/20 transition-colors"
                >
                  {t('nav.wallet.disconnect')}
                </button>
              </div>
            ) : (
              <div className="mx-4">
                <button
                  onClick={() => {
                    connectWallet()
                    setIsMenuOpen(false)
                  }}
                  disabled={isConnecting}
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t('nav.wallet.connecting')}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{t('nav.connectWallet')}</span>
                    </>
                  )}
                </button>
              </div>
            )}
            
            {/* Mobile Controls */}
            <div className="flex space-x-3 mx-4">
              {/* Mobile Theme Toggle */}
              <button 
                onClick={() => {
                  toggleTheme()
                  setIsMenuOpen(false)
                }}
                className="btn-secondary text-sm flex-1 flex items-center justify-center space-x-2 py-3"
                title={t('theme.toggle')}
              >
                {theme === 'dark' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
                <span>{theme === 'dark' ? t('theme.light') : t('theme.dark')}</span>
              </button>
              
              {/* 移除移动端语言切换按钮 */}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar