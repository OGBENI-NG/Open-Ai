import React, { useEffect } from 'react'
import RenderInput from './RenderInput'

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
  sendBtnImg,

}) {

  // Effect to handle keypress events on the textarea
  useEffect(() => {
    function handleKeyPress(e) {
      // Adjust border radius based on conditions
      if (e.key === 'Enter' || inputValue.length > 25 || aiImgInput.length > 25 ) {
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

  // Render the footer component with dynamic styles and content
  return (
    <footer className={`fixed z-50 w-full bottom-0  
      backdrop-blur-[100px] bg-white/75 px-3 pt-4 pb-8
      `
    }>
      <div>
        {/* Conditionally render textarea and send button */}
        {!toggleImgGen ? (
          <RenderInput
            handleChange={handleChange}
            inputValue={inputValue}
            handleSend={handleSendText}
            textareaRef={textareaRef}
            inputType="text"
            sendBtnIcon={sendBtnIcon}
            placeholder='Text here...'
            toggleImgGen={toggleImgGen}
          />
        ) : (
          <RenderInput
            handleChange={handleAiImgGenChange}
            inputValue={aiImgInput}
            handleSend={handleRenderAiImg}
            textareaRef={textareaRef}
            inputType="text"
            sendBtnIcon={sendBtnImg}
            toggleImgGen={toggleImgGen}
            placeholder='Image description here...'

          />
        )}
      </div>
    </footer>
  )
}
