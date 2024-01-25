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

  function handleChange(e) {
    setInputValue(e.target.value)
  }

  function handleLanguage(lang) {
   setLanguage(lang)
  }
  
  const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
  })
  
  async function fetchData() {
    try {
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
    }
  }

  function handleSendText() {
    setUserChat(prevUserChat => [...prevUserChat, inputValue]) 
    fetchData()
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
      />

    </main>
  )
}
