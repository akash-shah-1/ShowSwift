
import { useState } from 'react'
import './herobanner.scss'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'


const HeroBanner = () => {

  const [background, setBackground] = useState("")
  const [query, setQuery] = useState("")
  const navigate =  useNavigate();

  const {data , loading} = useFetch("/movie/upcoming") 

  const SearchQueryHandler =(e)=>{
   if(e.key === "Enter" && query.length>0){
    navigate(`/search/${query}`)
   }
  }


  return (
    <div className='heroBanner'>
      <div className="wrapper">
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="title">
            Millions of movies, TV shows and people 
            to discover.
            Explore now.
          </span>
          <div className="searchInput">
            <input 
            type="text"
            placeholder='Search for a movie or tv
            show....'
            onKeyUp={SearchQueryHandler}
            onChange={(e)=>setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner