import React from 'react'
import NavBar from './NavBar'

// Functional component for header section
export default function Header({
  headerBg, // Background image for header
  navbarRef, // Reference to navigation bar
  currentLangImg, // Image representing current language
  firebaseData, // Firebase data for language options
  currentLanguage, // Current selected language
  handleLanguage, // Function to handle language change
  toggle, // Function to toggle navigation menu
  clearChat, // Function to clear chat history
  dropDownIcon, // Dropdown icon
  isToggled // Toggled state for navigation menu
}) {
    
  return (
    // Header section with dynamic styles and content
    <header
      ref={navbarRef}
      className={`px-3 py-4 backdrop-blur-[100px] bg-white/75 
      fixed w-full z-[999] top-0 left-0 
      `}
    >
      <div className='flex items-center'>
        <div className='flex items-center gap-3'>
          <img className='w-[40px] h-[40px]' src={headerBg} alt="headerBg-img" />
          <p className='font-semibold text-xl text-userTxt'>To</p>
          <div 
            onClick={toggle} 
            className='flex items-center gap-3 bg-white/35 px-2 rounded-lg '>
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
      </div>
      {/* Render NavBar component with necessary props */}
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
