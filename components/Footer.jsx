import React,{useEffect, useRef, useState} from 'react'

export default function Footer(
    {
      handleChange, inputValue, handleSendText,
      sendBtnIcon, isTyping, handleBlur, handleFocus
    }
  ) {
  const textareaRef = useRef(null)

  useEffect(() => {
    if (inputValue === '') {
      // Reset height to normal when inputValue becomes empty
      textareaRef.current.style.height = '40px'
      textareaRef.current.style.borderRadius = '100px'
    } else if(inputValue.length > 28) {
      textareaRef.current.style.borderRadius = '16px'
    } else {
      textareaRef.current.style.borderRadius = '100px'
    }
  }, [inputValue])

  return (
    <div className={`fixed z-[10] w-full bottom-0 left-0 
      backdrop-blur-[100px] bg-white/50 px-3 py-3 
      `
    }>
      <div className='flex items-center gap-2'>
        <textarea
          className='bg-txtAreaBg w-full border-[1.5px] transition-all
            border-orange-700 text-userTxt font-medium leading-[110%]
          rounded-[100px] outline-none resize-none' 
          type="text" 
          onChange={handleChange}  
          value={inputValue}
          style={{minHeight: '40px', height: '40px', padding: '8px', fontSize: '22px'}}
          name='textInput'
          id='textInput'
          ref={textareaRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <img 
          onClick={handleSendText}
          className='w-[40px] h-[40px]'
          src={sendBtnIcon}
          alt="send-btn-icon" 
        />
      </div>
      
     
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
          
    </div>
  )
}
