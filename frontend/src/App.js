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
  const [updating, setUpdating] = useState(true)
  const [resetValue, setResetValue] = useState(0)

  const { status } = useWallet()

  const connectedWallet = useConnectedWallet()

  useEffect(() => {
    const prefetch = async () => {
      if (connectedWallet) {
        // setPost((await query.getCount(connectedWallet)).count)
      }
      setUpdating(false)
    }
    prefetch()
  }, [connectedWallet])

  const onClickPost = async () => {
    setUpdating(true)
    await execute.increment(connectedWallet)
    setPost((await query.getCount(connectedWallet)).count)
    setUpdating(false)
  }

  const onClickReset = async () => {
    setUpdating(true)
    console.log(resetValue)
    await execute.reset(connectedWallet, resetValue)
    setPost((await query.getCount(connectedWallet)).count)
    setUpdating(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'inline' }}>
          Insert a message:
          <input
              type="text"
              placeholder='Enter a message to share!'
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          {/* {updating ? '(Posting . . .)' : ''} */}
          <button onClick={onClickPost} type="button">
            Submit
          </button>
        </div>
        {status === WalletStatus.WALLET_CONNECTED && (
          <div style={{ display: 'inline' }}>
            Wallet Connected successfully!
          </div>
        )}
        <ConnectWallet />
      </header>
    </div>
  )
}

export default App
