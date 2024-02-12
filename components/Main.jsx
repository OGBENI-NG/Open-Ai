import React from 'react'

// Functional component for main chat section
export default function Main({
  renderAiResponse, // Array of AI responses
  userChat, // Array of user messages
  loading, // Loading state
  containerRef // Reference to main chat container
}) {

  //function to render userText and aiResponse
  const userTextAiResponse = () => (
    userChat.map((txt, i) => (
      <section key={i} className=''>
        <div className="chat chat-end">
          {/* User message */}
          <p className="chat-bubble text-lg font-semibold text-[#000] leading-[26px]  backdrop-blur-[50px] bg-white/75">{txt}</p>
        </div>
        <div>
          {/* AI response */}
          {renderAiResponse[i] && (
            <div className="chat chat-start my-2">
              <p className="chat-bubble  text-bodyBg text-lg leading-[26px] backdrop-blur-[100px] font-semibold bg-amber-900">{renderAiResponse[i]}</p>
            </div>
          )}
        </div>
      </section>
    ))
  )

  // Function to render loading indicator
  const renderLoading = () => (
    <div className='flex my-6 ml-5 space-x-1 justify-start items-center 
      bg-transparent dark:invert'
    >
      <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-4 w-4 bg-black rounded-full animate-bounce'></div>
    </div>
  )

  return (
    // Main chat section with dynamic styles and content
    <main 
      ref={containerRef} 
      className={`bg-transparent pt-[65px] pb-[90px] transition-all
      px-2 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-300 via-red-600 to-fuchsia-700 h-screen overflow-scroll relative z-[0]`}
    >
      {/* Heading for language selection */}
      <h1 className={`text-center font-[900] text-sm rounded-[8px] 
        text-[#1e1c28] w-48 tracking-[0.011rem] backdrop-blur-[100px]
        bg-white/50 py-2 my-7  p-3 m-auto `
      }>
        Select the language you 
        me to translate into.
      </h1>
      <div className='transition-all'>{userTextAiResponse()}</div>
      {loading && renderLoading()}
    </main>
  )
}
