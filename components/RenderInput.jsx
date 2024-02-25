import React from 'react'

// Function to render the textarea and send button
export default function RenderInput({ 
    handleChange, inputValue,
   handleSend, textareaRef,
   inputType, sendBtnIcon,
   placeholder, toggleImgGen
  }) {

  //textarea styles
  const textareaData = {
    minHeight: '40px',
    height: '40px',
    padding: '8px',
    fontSize: '22px'
  };
    
  const textareaStyle = `bg-txtAreaBg w-full border-[1.5px] transition-all
    text-userTxt leading-[110%]
    rounded-[100px] outline-none resize-none`
  ;
    
  return (
    <div className='flex items-center gap-2'>
      <textarea
        className={` 
          ${textareaStyle} 
          ${!toggleImgGen ? 'border-orange-700' : 'border-blue-500'}
        `}
        type="text"
        onChange={handleChange}
        value={inputValue}
        style={textareaData}
        name='textInput'
        id='textInput'
        ref={textareaRef}
        placeholder={placeholder}
      />
      {/* Send button */}
      <img
        onClick={handleSend}
        className='w-[40px] h-[40px]'
        src={sendBtnIcon}
        alt="send-btn-icon"
      />
    </div>
  )
}
