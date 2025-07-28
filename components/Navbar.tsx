'use client'

import { useState } from 'react'
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

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en')
  }

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
                  <div className="absolute right-0 mt-2 w-48 bg-tertiary border border-secondary rounded-lg shadow-xl z-50">
                    <div className="p-3 border-b border-secondary">
                      <p className="text-xs text-secondary">{t('nav.wallet.address')}</p>
                      <p className="text-sm text-primary font-mono">{formatAddress(address!)}</p>
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
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="btn-secondary text-xs lg:text-sm flex items-center space-x-1 px-2 lg:px-3 py-2 min-w-[60px] lg:min-w-[70px]"
              title="切换语言 / Switch Language"
            >
              <span className="text-sm">{language === 'en' ? '🇺🇸' : '🇨🇳'}</span>
              <span className="font-medium">{language.toUpperCase()}</span>
            </button>
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
                  <div className="flex items-center justify-center space-x-2 text-accent-green">
                    <div className="w-2 h-2 bg-accent-green rounded-full" />
                    <span className="font-medium text-sm">{formatAddress(address!)}</span>
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
              
              {/* Mobile Language Toggle */}
              <button 
                onClick={() => {
                  toggleLanguage()
                  setIsMenuOpen(false)
                }}
                className="btn-secondary text-sm flex-1 flex items-center justify-center space-x-2 py-3"
                title="切换语言 / Switch Language"
              >
                <span className="text-base">{language === 'en' ? '🇺🇸' : '🇨🇳'}</span>
                <span className="font-medium">{language.toUpperCase()}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar