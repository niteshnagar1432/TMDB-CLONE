'use client'
import MyAPI from '@/app/config/MyAPI';
import React, { useEffect, useState } from 'react';
import Header from '@/app/components/Header';
import './page.css';
import Image from 'next/image';
import '../../components/loading.css'

function Page(para) {
  const [tvId, setTvId] = useState('');
  const [tvDetailes, setTvDetailes] = useState({});
  const [userScores, setUserScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTvId(para.params.id);
  }, [tvId]);

  useEffect(() => {
    MyAPI.get(`https://api.themoviedb.org/3/tv/${tvId}?language=en-US`)
      .then((res) => {
        if (res.status == 200) {
          setTvDetailes(res.data);
        }
        console.log(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tvId]);


  const backgroundStyle = {
    backgroundImage: `url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${tvDetailes.backdrop_path}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'right',
    width: '100%',
    height: '100%',
  };

  return (
    <React.StrictMode>
      <Header />
      <div className="movie-container">
        {loading ? <div className="loading-spinner">
          <div className="spinner"></div>
        </div> :
          (<div className="backImgae" style={backgroundStyle}>
            <div className="cover">
              <div className="left">
                <div className="img">
                  <img
                    style={{ borderRadius: '7px' }}
                    src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${tvDetailes.poster_path}`}
                    width={400}
                    height={400}
                    alt="Poster"
                  />
                </div>
              </div>
              <div className="right">
                <div className="blank"></div>
                <h1>{tvDetailes.original_name}</h1>
                <p>
                  <div className="na">TV-MA</div>
                  {tvDetailes.genres &&
                    tvDetailes.genres.map((gen, index) => (
                      <span key={gen.id}>
                        {gen.name}
                        {index !== tvDetailes.genres.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                </p>
                <span className="title">Overview</span>
                <div className="over">{tvDetailes.overview}</div>
                <div className="create" style={{ color: 'white', marginTop: '30px', marginBottom: '5px', fontWeight: '800' }}>
                {tvDetailes.created_by && tvDetailes.created_by[0]?.name ? tvDetailes.created_by[0].name : 'Unknown'}
                </div>
                <div className="create" style={{ color: 'white', marginTop: '5px', marginBottom: '10px' }}>Creator</div>
              </div>
            </div>
          </div>)}
      </div>
    </React.StrictMode>
  );
}

export default Page;
