import React from 'react'
import '@/app/css/header.css';
import LogoImg from '../images/tmdb.png';
import Image from 'next/image';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

function header() {
  return (
    <React.StrictMode>
      <div className="header">
        <div className="start">
            <Image src="/tmdb.png" alt="My Image" width={200} height={100} layout="responsive" />
            <span className="link"><Link href={"/movies"}>Movies</Link></span>
            <span className="link"><Link href={"/tv-shows"}>TV Shows</Link></span>
            <span className="link"><Link href={"/people"}>People</Link></span>
            <span className="link"><Link href={"/more"}>More</Link></span>
        </div>
        <div className="end">
          <AddIcon sx={25} style={{color:'white'}}/>
          <span className="lang">EN</span>
          <span className="link"><Link href={"/login"}>Login</Link></span>
          <span className="link"><Link href={"/sign-up"}>Join TMDB</Link></span>
          <SearchIcon className='serchIcon' sx={25} style={{color:'white'}} />
        </div>
      </div>
    </React.StrictMode>
  )
}

export default header
