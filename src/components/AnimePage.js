import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

 const AnimePage = () => {

    const{id} = useParams()
    const[animeData, setAnimeData] = useState(null);
    const[review ,setReview] = useState("");

    useEffect(()=>{
        if(id){
            axios.get(`https://api.aniapi.com/v1/anime/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMiIsIm5iZiI6MTYzNTc1MTgxNSwiZXhwIjoxNjM4MzQzODE1LCJpYXQiOjE2MzU3NTE4MTV9.4LqHcVFDJ1sGSE3Dlrsj7-_oa-Vb-rfPJLLA_MOwFJo',
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }).then(res => { 
                        console.log(res.data.data)
                        if(res.status_code !== 200 ){
                          setAnimeData(res.data.data);  
                    }}).catch(err => {
                        console.log(err?.response)
                        
                    })
                }        
    },[id])

    const handleAddReview = () =>{
        <p>{review}</p>

    }
    
    console.log(animeData)
    return (
         <div >
              <ul className="navbar">
                <li className="project_title">Anime Shows</li>
                <li ><button className="signout_btn" >Sign out</button></li>
            </ul>
             {
                animeData ? <div >
                    <img  src={animeData?.banner_image} width="100%" height="400px"/>
                    <div className="anime_details"><img src={animeData?.cover_image}  className="cover-img" width="250px" height="350px"/>
                    <button className="trailer_btn" type="button"><a className="link" href={animeData?.trailer_url } target="blank">Watch Trailer</a></button>
                  <h1 className="anime_title">{animeData?.titles?.en}</h1>
                  <div className="anime_genres"><h1  className="genre_head">Genres:</h1>{animeData?.genres.map(val => <div><p  className="each_genre">{val}</p></div>)}</div></div>

                  <div className="full_details">
                  <p className="date"><span>Released Date</span> : {animeData?.start_date}</p>
                  <p className="season">Seaon Period : {animeData?.season_period}</p>
                  <p className="season_year">Season Year : {animeData?.season_year}</p>
                  <p className="episode_count">episode_count : {animeData?.episodes_count}</p>
                  <p className="episode_duration">episode_duration : {animeData?.episode_duration}</p>
                  <h2 className="descriptions"><span>Descriptions</span> : {animeData?.descriptions?.en}</h2>
                  <p className="score">Rating : <span className="rating">{animeData?.score / 20}</span> </p>
                  <div>
                      <h2>Reviews</h2>
                      <p>{review}</p>
                  </div>
                  </div>

                  {/* Review field */}
                  <div className="review">
                      <textarea className="textarea" type="text"  onChange={(e)=>setReview(e.target.value)} placeholder="Write a Review"/>
                      <button type="button" onClick={handleAddReview} className="review_btn">Add Review</button>
                      <p>Hello</p>
                  </div>

                </div> : <div className="loader">Loading...</div>
            }
       </div>
    )
}

export default AnimePage;