import React, { useEffect } from 'react';

export default function Footer({
  handleChange, // Function to handle input change
  inputValue, // Value of the input textarea
  handleSendText, // Function to handle sending text
  sendBtnIcon, // Icon for the send button
  textareaRef // Reference to the textarea element
}) {

  // Effect to handle keypress events on the textarea
  useEffect(() => {
    function handleKeyPress(e) {
      // Adjust border radius based on conditions
      if (e.key === 'Enter' || inputValue.length > 28) {
        textareaRef.current.style.borderRadius = '16px';
      } else if (inputValue === "") {
        textareaRef.current.style.borderRadius = '100px';
        textareaRef.current.style.height = '40px'; // Reset height to 40px when value is empty
      } else {
        textareaRef.current.style.borderRadius = '100px';
      }
    }

    // Add event listener for keydown
    textareaRef.current.addEventListener('keydown', handleKeyPress);

    // Cleanup function to remove event listener
    return () => {
      textareaRef.current.removeEventListener('keydown', handleKeyPress);
    };
  }, [inputValue]);

  // Render the footer component with dynamic styles and content
  return (
    <footer className={`fixed z-[999] w-full bottom-0 left-0 
      backdrop-blur-[100px] bg-white/75 px-3 pt-4 pb-8
      `
    }>
      <div className='flex items-center gap-2'>
        {/* Textarea for input */}
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
        {/* Send button */}
        <img 
          onClick={handleSendText}
          className='w-[40px] h-[40px]'
          src={sendBtnIcon}
          alt="send-btn-icon" 
        />
      </div>
    </footer>
  );
}
