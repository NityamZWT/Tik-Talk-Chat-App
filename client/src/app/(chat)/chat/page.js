"use client"
import React, { useState } from 'react'

function Chat() {
  const [name, setName] = useState('Nityam');
  return (
    <>
      <h1>Chat with {name}</h1>
    </>
  )
}

export default Chat