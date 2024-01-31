import React, { useEffect, useState } from 'react'
import { OpenAI } from 'openai'
import Header from './Header'
import headerBg from './img/Frame7.png'
import sendBtnIcon from './img/send-btn.png'
import Main from './Main'
import {fetchApiKey, fetchApiNewKey} from '../firebase'

export default function App() {
  const [firebaseData, setFirebaseData] = useState([])

  const [inputValue, setInputValue] = useState('')
  const [currentLanguage, setCurrentLanguage] = useState('')
  const [renderApiKey, setRenderApiKey] = useState('')
  const [renderAiResponse, setRenderAiResponse] = useState(saveUserAiChatToLocalStorage)
  const [userChat, setUserChat] = useState(saveUserChatToLocalStorage)
  const [loading, setLoading] = useState(false)

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
    if(!currentLanguage.includes(lang)) {
      setCurrentLanguage(lang)
    }
  }

  useEffect(() => {
    const getApi = async () => {
      const apiData = await fetchApiKey()
      const apiKey = await fetchApiNewKey()
      setFirebaseData(apiData)
      setRenderApiKey(apiKey[0].apiKey)
    }
    getApi()
  },[])

  const openai = new OpenAI({
    apiKey: renderApiKey,
    dangerouslyAllowBrowser: true
    
  })

  function clearChat(){
    setRenderAiResponse([])
    setUserChat([])
    localStorage.clear()
  }
  
  const messages = [
    {
      role: 'system',
      content: `Translate the following English text to ${currentLanguage}`
    },
    {
      role: 'user',
      content: inputValue
    }
  ]
  
  async function fetchData() {
    try {
      setLoading(true) // Set loading state to true
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1,
       
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
    fetchData()
    setInputValue("")
  }

  return (
   
    <main className='font-poppins h-screen overflow-scroll bg-white'>
      <Header
        headerBg={headerBg}
      />
      <Main 
        firebaseData={firebaseData}
        handleLanguage={handleLanguage}
        handleChange={handleChange}
        inputValue={inputValue}
        sendBtnIcon={sendBtnIcon}
        renderAiResponse={renderAiResponse}
        handleSendText={handleSendText}
        userChat={userChat}
        currentLanguage={currentLanguage}
        loading={loading}
        clearChat={clearChat}
      />
    </main>
  )
}
