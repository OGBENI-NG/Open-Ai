import React from 'react'
import NavBar from './NavBar'


export default function Header({headerBg, themeIconImg, toggleTheme, navbarRef
  , firebaseData, currentLanguage, handleLanguage, clearChat, toggle, isToggled}) {


  return (
    <header
      ref={navbarRef}
      className={`'h-max px-3 py-3 backdrop-blur-[100px] bg-white/50 
      fixed w-full z-[10] top-0 left-0`}
    >
      <div className='text-center'>
      {/* <h1 className='font-extrabold text-3xl bg-gradient-to-r from-red-600 via-green-500 to-fuchsia-500 inline-block text-transparent bg-clip-text'>MR222</h1>
      <p className='text-[#000] font-bold text-xl capitalize'>language translator</p> */}
      </div>
      <div className='flex items-center'>
        <div 
          onClick={toggle} 
          className={`flex items-center gap-2 backdrop-blur-[100px] bg-white/30 w-max
          py-2 px-3 rounded-lg`}
        >
          <img className='w-[40px] h-[40px]' src={headerBg} alt="headerBg-img" /> 
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
