'use client'
import React, { useEffect, useState } from 'react';
import '@/app/css/tranding.css';
import Link from 'next/link';
import Image from 'next/image';
import MyAPI from '../config/MyAPI';

function Trending() {
    const [today, setToday] = useState([]);

    useEffect(() => {
        MyAPI.get('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1')
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.results)
                    setToday(res.data.results)
                }
            })
    }, [])

    return (
        <div className="tranding-box">
            <div className="heder">
                <span className="title">Trending</span>
                <span className="action">
                    <div className="today">
                        <Link href="/today">Today</Link>
                    </div>
                    <div className="week">
                        <Link href="/this-week">This Week</Link>
                    </div>
                </span>
            </div>
            <div className="tarnding-body">
                <div className="wrapper-card">
                    {today.map((item) => {
                        return (
                            <div className="card">
                                <div className="image">
                                    <Link href="/card">
                                        <Image
                                            src={"https://www.themoviedb.org/t/p/w440_and_h660_face"+item.poster_path}
                                            alt={item.name}
                                            width={200}
                                            height={100}
                                            layout="responsive"
                                            style={{ width: '100%', height: '90%' }}
                                        />
                                    </Link>
                                </div>
                                <div className="d">
                                    <span className="name">{item.name}</span> <br />
                                    <span className="date">{item.first_air_date}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Trending;
