import React from 'react'

export default function NavBar({
  firebaseData, // Firebase data for language options
  clearChat, // Function to clear chat history
  handleLanguage, // Function to handle language change
  isToggled, // Toggled state for navigation bar
  currentLanguage, // Current selected language
}) {

  // Mapping through firebase data to render language options
  const renderFlag = firebaseData.map((item) => {
    // Check if the current language matches the item's language
    const isCurrentLanguage = currentLanguage === item.language;
    // Check if the item's language is one of the specified languages for special background
    const transitLanBg = ["French", "Japan", "China", "Spanish"].includes(item.language)
    
    // Constructing dynamic classes based on conditions
    const languageClasses = `
      relative flex items-center pt-4 
      ${isCurrentLanguage ? `text-green-700 before:content-['']
        before:h-[35px] 
        before:absolute before:border-[1.5px] before:rounded-lg before:border-red-300
        before:bottom-[0] before:-left-[0] before:shadow-lg
        before:shadow-boxShadow before:right-[0] before:-mx-[12px]` : ""}
      ${transitLanBg ? `before:bg-white/40 before:top-[12px]
      before:backdrop-blur-[100px] before:-z-[1]` : ""}
    `;
    
    // Rendering language option with its image
    return (
      <div key={item.id} className='px-6 w-full text-orange-900'>
        <div 
          onClick={() => handleLanguage(item.language, item.img)} 
          className={languageClasses}
        >
          <ul className='text-base font-semibold'>
            <li>{item.language}</li>
          </ul>
          <div className='w-[25px] h-[25px] ml-auto'>
            <img 
              className='w-full h-full'
              src={item.img} 
              alt={item.alt} 
            />
          </div>
        </div>
      </div>
    )
  })
  
  // Rendering navigation bar with language options and clear chat button
  return (
    <nav className={`absolute left-[0px] top-[71px] transition-all
      overflow-x-hidden pb-4 backdrop-blur-[100px] bg-white/75 w-[191px] 
      ${isToggled ? 'h-[238px] ' : 'h-[0] opacity-0'} rounded-b-lg`}
    >
      {renderFlag} {/* Render language options */}
      <div className='mt-6 font-bold text-lg text-red-700 bg-red-50 
        w-max m-auto py-0 px-4 rounded-full'
      >
        <button onClick={clearChat}>Clear chat</button> {/* Button to clear chat history */}
      </div>
    </nav>
  )
}
