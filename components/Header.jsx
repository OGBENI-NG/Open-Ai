import React from 'react'
import NavBar from './NavBar'


export default function Header(
  {
    headerBg, themeIconImg, toggleTheme,
    navbarRef, currentLangImg, firebaseData,
    currentLanguage, handleLanguage, toggle,
    clearChat, dropDownIcon, isToggled,
  }
  ) {
    
  return (
    <header
      ref={navbarRef}
      className={`h-max px-3 py-4 backdrop-blur-[100px] bg-white/50 
      fixed w-full z-[10] top-0 left-0`}
    >
      <div className='flex items-center'>
        <div className='flex items-center gap-3'>
          <img className='w-[40px] h-[40px]' src={headerBg} alt="headerBg-img" />
          <p className='font-semibold text-xl text-userTxt'>To</p>
          <div 
            onClick={toggle} 
            className='flex items-center gap-3 bg-white/40 px-2 rounded-lg '>
            <img 
              src={currentLangImg} 
              alt="current-language-img" 
              className='w-[40px] h-[40px] transition-all' 
            />
            <img 
              className={`w-[25px] h-[25px] transition-all ${isToggled ? '-rotate-180':''}`} 
              src={dropDownIcon} 
              alt="dropdown-icon" 
            />
          </div>
        </div>
        <div className='ml-auto' onClick={toggleTheme}>
          <img className='w-[40px] h-[40px]' src={themeIconImg} alt="theme-icon" />
        </div>
      </div>
      <NavBar 
        firebaseData={firebaseData}
        currentLanguage={currentLanguage}
        handleLanguage={handleLanguage}
        clearChat={clearChat}
        isToggled={isToggled}
        navbarRef={navbarRef}
      />
    </header>
  )
}
