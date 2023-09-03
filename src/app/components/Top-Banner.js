import React from 'react'
import '@/app/css/top-banner.css'

function TopBanner() {
  return (
    <React.StrictMode>
      <div className="top-banner">
        <div className="content">
            <h1>Welcome.</h1>
            <span className="details">Millions of movies, TV shows and people to discover. Explore now.</span>
            <div className="serch">
                <input type="text" placeholder='Search for a movie, tv show, person......' />
                <button>Search</button>
            </div>
        </div>
      </div>
    </React.StrictMode>
  )
}

export default TopBanner
