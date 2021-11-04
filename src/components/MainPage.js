import axios from 'axios';
import fire from '../fire';
import React, { useState, useEffect } from 'react'
import { useHistory,Link } from 'react-router-dom';
import search_man from '../images/search_man.png'



const MainPage = (props) => {

    let history = useHistory()

    const [apiData, setApiData] = useState([])
    const [search, setSearch] = useState("")
    const [loading ,setLoading] = useState(true)

    const handleLogout = () =>{
        fire.auth().signOut();
        console.log("uhsuh")
        history.push("/login")
    }

    
    // const id_handler = () => {
    //     res.anilist_id ;   
    // }
 

//     const handleSearch = () => {
//         if(search){
//         axios.get(`https://api.aniapi.com/v1/anime?title=${search}`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMiIsIm5iZiI6MTYzNTc1MTgxNSwiZXhwIjoxNjM4MzQzODE1LCJpYXQiOjE2MzU3NTE4MTV9.4LqHcVFDJ1sGSE3Dlrsj7-_oa-Vb-rfPJLLA_MOwFJo',
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         }).then(res => {
//             if(res.status_code !== 200 ){
//             console.log(res.data.data.documents)
//             setApiData(res.data.data.documents);
//         }}).catch(err => {
//             console.log(err?.response)
            
//         })
//     }
// }

useEffect(()=>{
    if(search){
                axios.get(`https://api.aniapi.com/v1/anime?title=${search}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMiIsIm5iZiI6MTYzNTc1MTgxNSwiZXhwIjoxNjM4MzQzODE1LCJpYXQiOjE2MzU3NTE4MTV9.4LqHcVFDJ1sGSE3Dlrsj7-_oa-Vb-rfPJLLA_MOwFJo',
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(res => {
                    if(res.status_code !== 200 ){
                        setLoading(false)
                    console.log(res.data.data.documents)
                    setApiData(res.data.data.documents);
                }}).catch(err => {
                    console.log(err?.response)
                    
                })
            }
},[search])
  

    return (
        <div className="Mainpage">
            <ul className="navbar">
                <li className="project_title">Anime Shows</li>
                <li ><button className="signout_btn" onClick={handleLogout}>Sign out</button></li>
            </ul>

            <div>
                <input className="searchbar" type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                
                {loading ? (
                    <>
                    <p className="seach_guide">Search Your favourite Animes</p>
                    <img className="search_img" src={search_man} width="400px" height="400px" />
                    </>
                ) : (
                apiData && apiData.map((res) => {
                    
                    

                    return (
                       <Link to={`/anime/${res.id}`}>
                       <div className="eachItem" key={res.id}  >
                            <h1 className="item_header">{res.titles.en}</h1>
                            <img className="item_img" src={res.banner_image} width="320px" height="200px" />
                            <p className="episodes">{`No of episodes ${res.episodes_count}`}</p>
                            <p>{`Rating: ${res.score / 20}`}</p>
                        </div>
                        </Link>
                    );
                })
                  )}
            </div>
        </div>


    )
}

export default MainPage