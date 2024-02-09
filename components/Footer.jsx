import React,{useEffect, useRef} from 'react'

export default function Footer(
    {
      handleChange, inputValue, handleSendText,
      sendBtnIcon, textareaRef
    }
  ) {
  

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key === 'Enter' || inputValue.length > 28) {
        textareaRef.current.style.borderRadius = '16px';
      } else if (inputValue === "") {
        textareaRef.current.style.borderRadius = '100px';
        textareaRef.current.style.height = '40px'; // Reset height to 40px when value is empty
      } else {
        textareaRef.current.style.borderRadius = '100px';
      }
    }
  
    textareaRef.current.addEventListener('keydown', handleKeyPress);
  
    return () => {
      textareaRef.current.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputValue]);
  
  
  

  return (
    <footer className={`fixed z-[10] w-full bottom-0 left-0 
      backdrop-blur-[100px] bg-white/75 px-3 pt-4 pb-8
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
        />
        <img 
          onClick={handleSendText}
          className='w-[40px] h-[40px]'
          src={sendBtnIcon}
          alt="send-btn-icon" 
        />
      </div>
    </footer>
  )
}
