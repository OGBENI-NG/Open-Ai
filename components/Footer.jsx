import React from 'react'

export default function Footer({handleChange, inputValue, handleSendText, sendBtnIcon}) {
  return (
    <footer className='fixed z-[5] w-full bottom-[0] left-[0] backdrop-blur-[100px]
    bg-white/50 px-4 py-3'>
      <textarea
        className='relative h-[50px] bg-txtAreaBg w-full border-[1.5px]
          border-red-400 text-userTxt font-medium pt-2
        rounded-full outline-none text-xl pl-3 pr-16 resize-none' 
        type="text" 
        onChange={handleChange}  
        value={inputValue}
        name='textInput'
        id='textInput'
      />
      <button 
        onClick={handleSendText}
        className='absolute top-[4px] right-[15px] h-[66px] w-[40px]'
      >
        <img src={sendBtnIcon} alt="send-btn-icon" />
      </button>
      {/* <section className='px-4 py-2 fixed w-full bottom-[0] left-[0] backdrop-blur-[100px]
            bg-white/50'>
             { loading 
              ? (<span className="loading loading-dots loading-md text-aiChatBg"></span>) 
              : (<p 
                onClick={clearChat}
                className={`${userChat.length < 4 ? "hidden" : `text-gray-500 font-semibold py-1 px-4 w-max bg-txtAreaBg rounded-md mb-2 m-auto`}`}>
              Clear chat
            </p>)} 
            
          </section> */}
          
    </footer>
  )
}
