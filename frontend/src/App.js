import './App.css'

import { useEffect, useState } from 'react'
import {
  useWallet,
  useConnectedWallet,
  WalletStatus,
} from '@terra-money/wallet-provider'

import * as execute from './contract/execute'
import * as query from './contract/query'
import { ConnectWallet } from './components/ConnectWallet'

function App() {
  // const [count, setCount] = useState(null)
  const [post, setPost] = useState("")
  const [messages, setMessages] = useState([])
  const [updating, setUpdating] = useState(true)
  const [resetValue, setResetValue] = useState(0)

  const { status } = useWallet()

  const connectedWallet = useConnectedWallet()

  useEffect(() => {
    const prefetch = async () => {
      // if (connectedWallet) {
      //   setPost((await query.getPost(connectedWallet)).text)
      // }
      setUpdating(false)
    }
    prefetch()
  }, [connectedWallet])

  const addPost = (newPost) => { 
    setMessages(messages => [...messages, newPost]);
  }

  const onClickPost = async () => {
    setUpdating(true)
    console.log("new post in progress...")
    await execute.create(connectedWallet, post)
    setUpdating(false)
    await query.getPost(connectedWallet).then(
      value => {
        console.log(value.text)
        console.log("NEW POST SUCCESSFULLY SUBMITTED!")
        addPost(value.text)
      }
    )
  }

  // const onClickReset = async () => {
  //   setUpdating(true)
  //   console.log(resetValue)
  //   await execute.reset(connectedWallet, resetValue)
  //   setPost((await query.getPost(connectedWallet)).text)
  //   setUpdating(false)
  // }

  return (
    <div className="App">
      {status === WalletStatus.WALLET_CONNECTED && (
          <div style={{ display: 'inline' }}>
            Wallet Connected successfully!
          </div>
        )}
        <ConnectWallet />
      <header className="App-header">
        <div style={{ display: 'inline' }}>
          Insert a message:
          <input
              type="large-text"
              placeholder='Enter a message to share!'
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          {/* {updating ? '(Posting . . .)' : ''} */}
          <button onClick={onClickPost} type="button">
            Submit
          </button>
        </div>

        <div className='messageBoard'>
          <br/>
          Message Wall: 
          <ul>
            {messages.map(item => {
              return <li>{item}</li>;
            })}
          </ul>
        </div>
      </header>
    </div>
  )
}

export default App
