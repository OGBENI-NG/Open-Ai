import React from 'react'

export default function NavBar({firebaseData, clearChat, handleLanguage, 
  isToggled, currentLanguage}
  ) {

  const renderFlag = firebaseData.map((item) => {
    const isCurrentLanguage = currentLanguage === item.language;
    const transitLanBg = ["French", "Japan", "China", "Spanish"].includes(item.language);
  
    const languageClasses = `
      relative flex items-center gap-3 pt-6 
      ${isCurrentLanguage ? `text-green-500 before:content-[''] before:min-w-min before:h-[50px] 
        before:absolute before:border-[2px] before:rounded-xl before:border-red-400
        before:bottom-[0] before:-left-[0] before:transition-all before:shadow-lg
        before:shadow-boxShadow before:right-[0] before:-mx-[20px]` : ""}
      ${transitLanBg ? `before:top-[20px] before:bg-white/60 
      before:backdrop-blur-[100px] before:-z-[1]` 
      : ""}
    `;
  
    return (
      <div key={item.id} className='px-8 w-full transition-all text-orange-900'>
        <div 
          onClick={() => handleLanguage(item.language)} 
          className={languageClasses}
        >
          <ul className='text-2xl font-semibold '>
            <li>{item.language}</li>
          </ul>
          <div className='w-[40px] h-[40px] ml-auto'>
            <img 
              className='w-full h-full'
              src={item.img} 
              alt={item.alt} 
            />
          </div>
        </div>
      </div>
    );
  })
    

  return (
    <nav className={`absolute transition-all left-0 top-[80px] h-max
      overflow-x-hidden  pb-6 backdrop-blur-[100px] bg-white/95
      ${isToggled ? 'w-[60%]' : 'w-0'} z-[10] rounded-e-xl`}
    >
      {renderFlag}
      <div className=' mt-10 font-bold text-xl text-red-500 bg-red-100 
        w-max m-auto py-2 px-6 rounded-full'
      >
        <button onClick={clearChat}>Clear chat</button>
      </div>
    </nav>
  )
}
