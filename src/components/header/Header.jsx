import  { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
     
      /* In the context of a single-page application, if a user scrolls down significantly
       on the current page and then navigates to another page, the subsequent page will
       display with the same scroll position by default.
      To prevent this behavior and ensure a fresh view when navigating to a new page,
      we use useEffect to reset the scroll position to the top (0,0) whenever the location changes. */

     window.scrollTo(0,0)
    },[location])

    const controllNavbar=()=>{
      //window.scrollY gives us some values based on how much scroll
      //we did and accoding to that values we will handle Navbar
      // console.log(window.scrollY>200)
      if(window.scrollY > 200){
        if(window.scrollY > lastScrollY && !mobileMenu){
          setShow("hide")
        }
        else{
          setShow("show")
        }
      }else{
        setShow("top")
      }
      setLastScrollY(window.scrollY);
    }

    useEffect(()=>{
      window.addEventListener("scroll",controllNavbar)
      // It is a good way to remove event after its work done to avoid memory leakage
      return ()=>{
        window.removeEventListener("scroll",controllNavbar)
      }
    },[lastScrollY])

    const OpenSearch =()=>{
      setMobileMenu(false)
      setShowSearch(true)
    }
    const OpenMobileMenu =()=>{
      setMobileMenu(true)
      setShowSearch(false)
    }
    const SearchQueryHandler =(e)=>{
      if(e.key === "Enter" && query.length>0){
       navigate(`/search/${query}`)
       setTimeout(()=>{
           setShowSearch(false)
       },1000)
      }
     }
     const navigationHandler =(type)=>{
      if(type === "movie"){
      navigate('/explore/movie')
      }
      else{
        navigate('/explore/tv')
      }
      setMobileMenu(false)
     }

    return (
        <header className={`header ${mobileMenu?"mobileView":""} ${show}`}>
          <ContentWrapper>
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={()=>navigationHandler("movie")} >Movies</li>
              <li className="menuItem" onClick={()=>navigationHandler("tv")}>Tv Shows</li>
              <li className="menuItem">
                <HiOutlineSearch onClick={OpenSearch}/>
              </li>
            </ul>
            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={OpenSearch}/>
              {mobileMenu?(
                // Close btn
                <VscChromeClose onClick={()=>setMobileMenu(false)} />
              ):(
                // Hambugger
                <SlMenu onClick={OpenMobileMenu} />
              )}
             
            </div>
          </ContentWrapper>
          {
            showSearch &&   <div className="searchBar">
            <ContentWrapper>
            <div className="searchInput">
            <input 
            type="text"
            placeholder='Search for a movie or tv show....'
            onKeyUp={SearchQueryHandler}
            onChange={(e)=>setQuery(e.target.value)}
            />
            <VscChromeClose onClick={()=>setShowSearch(false)} />
          </div>
            </ContentWrapper>
          </div>
          }
        </header>
    );
};

export default Header;