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
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [messages, setMessages] = useState(new Map());

  const { status, network, wallets } = useWallet();

  const connectedWallet = useConnectedWallet();

  useEffect(() => {
    const prefetch = async () => {
      if (connectedWallet) {
        console.log("wallet connected!");
        console.log(wallets[0].terraAddress);
      }
      // setUpdating(false)
    }
    prefetch()
  }, [connectedWallet])

  const addPost = (title, text) => { 
    setMessages(new Map(messages.set(title, text)));
  }

  const onClickPost = async () => {
    console.log("new post in progress...")
    await execute.create(connectedWallet, title, post)
    await query.getPost(connectedWallet).then(
      result => {
        console.log("NEW POST SUCCESSFULLY SUBMITTED!");
        console.log("title: ", result.title);
        console.log("body:", result.text);
        addPost(result.title, result.text);

      }
    )
  }

  return (
    <div className="App">
      {status === WalletStatus.WALLET_CONNECTED && (
          <div style={{ display: 'inline' }}>
            Wallet Connected successfully: {wallets[0].terraAddress} 
            <br/>
            Network: {network.chainID}
          </div>
        )}
        <ConnectWallet />
      <header className="App-header">
        <h3> Welcome to your Terra Dapp Blog.  </h3>
        <p> Simply add a title and a body below to create a post!</p>
        <div className='title'>
          Title: 
          <input 
              type="text"
              placeholder='Title of Post'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <div className='body'>
          <br/>
          <textarea
              placeholder='Enter a message to share!'
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
      
          <br/> 
          <button onClick={onClickPost} type="button">
            Submit
          </button>
        </div>

        <div className='messageBoard'>
          <br/>
          Message Wall: 
          <ul>
            {Array.from(messages.entries()).map((entry) => {
              const [title, text] = entry;
              return (<Post title={title} text={text} />);
            })}
          </ul>
        </div>
      </header>
    </div>
  )
}

export default App

function Post(props) {
  return (
    <div className="postContainer">
      <div className="postTitle"> {props.title} </div>
      <div className="postText>"> {props.text} </div>
      <div className="wallet"> {props.wallet} </div>
    </div>
  );
}