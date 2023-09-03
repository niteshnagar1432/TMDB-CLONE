import React from 'react'
import Header from './components/Header'
import TopBanner from './components/Top-Banner'
import Trending from './components/Trending'

function page() {
  return (
    <React.StrictMode>
      <div className="main">
        <Header/>
        <TopBanner/>
        <Trending/>
        <div className="my_blank" style={{width:'100vw',height:'80vh',background:'red'}}></div>
      </div>
    </React.StrictMode>
  )
}

export default page
