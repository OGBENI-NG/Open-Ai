import React from 'react'

export default function Header({headerBg}) {
  return (
    <header className='h-[120px] fixed z-[2] top-0 right-0 left-0' >
      <img className='w-full h-full' src={headerBg} alt="headerBg-img" />
    </header>
  )
}
