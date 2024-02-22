import React, { useEffect } from 'react'

export default function Footer({
  handleChange, // Function to handle input change
  inputValue, // Value of the input textarea
  handleSendText, // Function to handle sending text
  sendBtnIcon, // Icon for the send button
  textareaRef, // Reference to the textarea element
  handleRenderAiImg, // function to render ai image
  toggleImgGen, // variable to switch between ai language translator and ai img generator
  aiImgInput, // value of the input of ai img generator aka prompt
  handleAiImgGenChange, // function to handle ai img generator input change
  sendBtnImg
}) {

  // Effect to handle keypress events on the textarea
  useEffect(() => {
    function handleKeyPress(e) {
      // Adjust border radius based on conditions
      if (e.key === 'Enter' || inputValue.length > 28 || aiImgInput.length > 28 ) {
        textareaRef.current.style.borderRadius = '16px'
      } else if (inputValue === "" || aiImgInput === "") {
        textareaRef.current.style.borderRadius = '100px'
        textareaRef.current.style.height = '40px' // Reset height to 40px when value is empty
      } else {
        textareaRef.current.style.borderRadius = '100px'
      }
    }

    // Add event listener for keydown
    textareaRef.current.addEventListener('keydown', handleKeyPress)

    // Cleanup function to remove event listener
    return () => {
      textareaRef.current.removeEventListener('keydown', handleKeyPress)
    }
  }, [inputValue, aiImgInput])

  const textareaData = {
    minHeight: '40px', 
    height: '40px', 
    padding: '8px', 
    fontSize: '22px'
  }

  const textareaStyle = `bg-txtAreaBg w-full border-[1.5px] transition-all
    text-userTxt font-medium leading-[110%]
    rounded-[100px] outline-none resize-none`
  ;

  // Render the footer component with dynamic styles and content
  return (
    <footer className={`fixed z-[999] w-full bottom-0 left-0 
      backdrop-blur-[100px] bg-white/75 px-3 pt-4 pb-8
      `
    }>
      <div>
        {/* Textarea for input */}
        {!toggleImgGen ? (
          <div className='flex items-center gap-2'>
            <textarea
              className={`${textareaStyle}  border-orange-700`}
              type="text" 
              onChange={handleChange}  
              value={inputValue}
              style={textareaData}
              name='textInput'
              id='textInput'
              ref={textareaRef}
            />
            {/* Send button */}
            <img 
              onClick={handleSendText}
              className='w-[40px] h-[40px]'
              src={sendBtnIcon}
              alt="send-btn-icon" 
            />
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <textarea
              className={`${textareaStyle} border-blue-500`} 
              type="text" 
              onChange={handleAiImgGenChange}  
              value={aiImgInput}
              style={textareaData}
              name='textInput'
              id='textInput'
              ref={textareaRef}
            />
            {/* Send button */}
            <img 
              onClick={handleRenderAiImg}
              className='w-[40px] h-[40px]'
              src={sendBtnImg}
              alt="send-btn-icon" 
            />
          </div>
        )}
      </div>
    </footer>
  )
}
