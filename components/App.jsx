import React, { useEffect, useState } from 'react'
import { OpenAI } from 'openai'
import Header from './Header'
import headerBg from './img/Frame7.png'
import sendBtnIcon from './img/send-btn.png'
import Main from './Main'
import data from '../data'

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [language, setLanguage] = useState('')
  const [renderAiResponse, setRenderAiResponse] = useState(saveUserAiChatToLocalStorage)
  const [userChat, setUserChat] = useState(saveUserChatToLocalStorage)
  const [loading, setLoading] = useState(false)
  const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY

  function saveUserChatToLocalStorage() {
    const userChatMg = localStorage.getItem("userChat") 
    return userChatMg ? JSON.parse(userChatMg) : []
  }
  function saveUserAiChatToLocalStorage() {
    const aiChatResponse = localStorage.getItem("renderAiResponse")
    return aiChatResponse ? JSON.parse(aiChatResponse) : []
  }

  useEffect(() => {
    localStorage.setItem("userChat", JSON.stringify(userChat))
    localStorage.setItem("renderAiResponse", JSON.stringify(renderAiResponse))
  }, [userChat, renderAiResponse])

  localStorage.clear()
  function handleChange(e) {
    setInputValue(e.target.value)
  }

  function handleLanguage(lang) {
   setLanguage(lang)
  }
  
  const openai = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true
    
  })

  function clearChat(){
    setRenderAiResponse([])
    setUserChat([])
    localStorage.clear()
  }
  
  
  async function fetchData() {
    try {
      setLoading(true) // Set loading state to true
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Translate the following English text to ${language}`
          },
          {
            role: 'user',
            content: inputValue
          }
        ]
      })

      setRenderAiResponse(prevAiRes => [...prevAiRes, response.choices[0].message.content])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false); // Set loading state to false after response
    }
  }

  function handleSendText() {
    setUserChat(prevUserChat => [...prevUserChat, inputValue]) 
    fetchData("Spanish")
    setInputValue("")
  }

  return (
    <main className='font-poppins h-[100%]'>
      <Header
        headerBg={headerBg}
      />
      <Main 
        data={data}
        handleLanguage={handleLanguage}
        handleChange={handleChange}
        inputValue={inputValue}
        sendBtnIcon={sendBtnIcon}
        renderAiResponse={renderAiResponse}
        handleSendText={handleSendText}
        userChat={userChat}
        language={language}
        loading={loading}
        clearChat={clearChat}
      />

    </main>
  )
}
