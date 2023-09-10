'use client'
import React, { useEffect, useState } from 'react';
import '@/app/css/tranding.css';
import Link from 'next/link';
import Image from 'next/image';
import MyAPI, { FormatDate } from '../config/MyAPI';
import './loading.css';

function Trending() {
    const [today, setToday] = useState([]);
    const [loading, setLoading] = useState(true); // Step 2: Create loading state

    useEffect(() => {
        MyAPI.get('https://api.themoviedb.org/3/trending/tv/day?language=en-US')
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.results)
                    setToday(res.data.results);
                }
            })
            .finally(() => { // Step 3: Toggle loading state when request completes
                setLoading(false);
            });
    }, []);

    return (
        <div className="tranding-box">
            <div className="heder">
                <span className="title">Trending</span>
                <span className="action">
                    <div className="today">
                        <Link href="/today">Today</Link>
                    </div>
                    <div className="week">This Week</div>
                </span>
            </div>
            <div className="tarnding-body">
                {loading ? ( // Step 4: Render loading element conditionally
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="wrapper-card">
                        {today.map((item) => {
                            return (
                                <div className="card" key={item.id}>
                                    <div className="image">
                                        <Link href={'/tv/'+item.id}>
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
                                        <span className="date">{FormatDate(item.first_air_date,'yyyy-dd-mm')}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Trending;
