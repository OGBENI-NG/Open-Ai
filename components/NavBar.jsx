import React from 'react'

export default function NavBar({firebaseData, clearChat, handleLanguage, 
  isToggled, currentLanguage}
  ) {

  const renderFlag = firebaseData.map((item) => {
    const isCurrentLanguage = currentLanguage === item.language;
    const transitLanBg = ["French", "Japan", "China", "Spanish"].includes(item.language)
  
    const languageClasses = `
      relative flex items-center pt-4 
      ${isCurrentLanguage ? `text-green-600 before:content-['']
        before:h-[35px] 
        before:absolute before:border-[1.5px] before:rounded-lg before:border-green-100
        before:bottom-[0] before:-left-[0] before:transition-all before:shadow-lg
        before:shadow-boxShadow before:right-[0] before:-mx-[12px]` : ""}
      ${transitLanBg ? `before:bg-green-50 before:top-[12px]
      before:backdrop-blur-[100px] before:-z-[1]` 
      : ""}
    `;
  
    return (
      <div key={item.id} className='px-6 w-full transition text-orange-900'>
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
    

  return (
    <nav className={`absolute transition-all left-[98px] top-[63px] h-max
      overflow-x-hidden pb-6  bg-white/90 w-[40%] backdrop-blur-3xl 
      ${isToggled ? 'h-[265px]' : 'h-[0px] opacity-0'} z-[10] rounded-b-lg`}
    >
      {renderFlag}
      <div className=' mt-10 font-bold text-xl text-red-500 bg-red-100 
        w-max m-auto py-1 px-4 rounded-full'
      >
        <button onClick={clearChat}>Clear chat</button>
      </div>
    </nav>
  )
}
