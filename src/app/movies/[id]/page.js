'use client'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import MyAPI from '@/app/config/MyAPI';
import '../movies.css';
import '../../components/loading.css';
function page(par) {
    const [movieId, setMovieId] = useState('');
    const [movieDetails, setMovieDetailes] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setMovieId(par.params.id)
    }, [movieId])
    useEffect(() => {
        if (movieId) {
            MyAPI.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`)
                .then((res) => {
                    console.log(res.data);
                    setMovieDetailes(res.data)
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [movieId])

    const backgroundStyle = {
        backgroundImage: `url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center right'
    };
    return (
        <React.StrictMode>
            <Header />
            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            ) :
                (<div className="movie-m-box" style={backgroundStyle}>
                    <div className="overlay">
                        <div className="left">
                            <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movieDetails.poster_path}`} alt="" />
                        </div>
                        <div className="right">
                            <div className="blank"></div>
                            <div className="movie-title">{movieDetails.title}</div>
                            <p className="mv"><p className="na">PG-13</p> {movieDetails.release_date} (IN) {movieDetails.genres &&
                                movieDetails.genres.map((gen, index) => (
                                    <span key={gen.id}>
                                        {gen.name}
                                        {index !== movieDetails.genres.length - 1 ? ', ' : ''}
                                    </span>
                                ))}</p>
                            <div className="title">Overview</div>
                            <p className="desc">
                                {movieDetails.overview}
                            </p>
                        </div>
                    </div>
                </div>)}
        </React.StrictMode>
    )
}

export default page