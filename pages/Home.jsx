import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const [url, setUrl] = useState("");
  const gotoUrl = () => {
    window.location.replace(url.endsWith("/") ? url : url + "/")
  }
  const handleEnter = (event) => {
    if(event.key === 'Enter') {
      gotoUrl(url);
    }
  }
  return (
    <>
      <div className="topbar">
        <div className="titletext">mstify</div>
        <a className="twitterIcon" href="https://twitter.com/jdrobinson99" target="_blank">
          <img src="https://www.iconpacks.net/icons/1/free-twitter-icon-117-thumb.png"
            style={{width: "100%", height: "100%", filter: "invert(1)"}}/>
        </a>
      </div>
      <div className="screen">
        <div className="foreground">
          <h1>See what the audience thinks about a webpage.</h1>
          <div className="inputRow">
            <input className="inputUrl"
              onChange={(e)=>setUrl(e.target.value)}
              onKeyDown={(e)=>handleEnter(e)}
              placeholder="Enter URL"
            />
            <button onClick={()=>gotoUrl(url)} className="inputBtn">Go</button>
          </div>
          Enter a webpage's URL to view a dedicated comment section for the page.
        </div>
        <div className="overlay-1">
          <div className="overlay-2">
            <div className="overlay-3">
              <div className="overlay-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home