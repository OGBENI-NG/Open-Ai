import React from 'react'
import NavBar from './NavBar'

// Functional component for header section
export default function Header({
  usFlag, // us flag
  navbarRef, // Reference to navigation bar
  currentLangImg, // Image representing current language
  firebaseData, // Firebase data for language options
  currentLanguage, // Current selected language
  handleLanguage, // Function to handle language change
  toggle, // Function to toggle navigation menu
  clearChat, // Function to clear chat history
  dropDownIcon, // Dropdown icon
  isToggled, // Toggled state for navigation menu
  handleToggleImg, // toggleImg to navigate to ai img generator
  toggleImgGen
}) {
    
  return (
    // Header section with dynamic styles and content
    <header
      ref={navbarRef}
      className={`px-3 py-4 backdrop-blur-[100px] bg-white/75 
      fixed w-full z-[999] top-0 left-0 
      `}
    >
      <section className='flex items-center'>
        
        {toggleImgGen ? 
          (
            <h1 className='text-xl font-bold text-transparent 
                bg-clip-text bg-gradient-to-r from-sky-500 via-red-900 to-fuchsia-700'>
              AI Image Generator
            </h1>
          ) 
          : 
          (<div className={`flex items-center gap-3 `}>
              <img className='w-[40px] h-[40px]' src={usFlag} alt="usFlag-img" />
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
          </div>)
        }
        {/* Render NavBar component with necessary props */}
        <NavBar 
          firebaseData={firebaseData}
          currentLanguage={currentLanguage}
          handleLanguage={handleLanguage}
          clearChat={clearChat}
          isToggled={isToggled}
          navbarRef={navbarRef}
        />
        <button
          onClick={handleToggleImg} 
          className={`ml-auto text-[20px] 
            ${!toggleImgGen ? 'bg-white/35 text-black' : 'bg-blue-800 text-white'} 
              font-extrabold transition-all
            px-3 py-5 rounded-lg leading-[0] tracking-wide
          `}
        >
         {!toggleImgGen ? 'Ai Image' : 'Ai trans' }
        </button>
      </section>
    </header>
  )
}
