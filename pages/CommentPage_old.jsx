import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

const CommentPage = () => {
  let url = useLocation().pathname.slice(1);
  if(url.startsWith("http://")) {
    url = url.slice(7);
  } else if(url.startsWith("https://")) { 
    url = url.slice(8);
  }
  if(url.startsWith("www.")) url = url.slice(4);
  const isMounted = useRef(false);

  const [page, setPage] = useState();
  useEffect(() => {
    if(!isMounted.current) {
      const fetchPosts = async () => {
        const res = await fetch('https://api.allorigins.win/raw?url=https://google.com');
        const text = await res.text()
        console.log("text");
        console.log(text);
        setPage(text);
        isMounted.current = true;
      }
      fetchPosts();
    }
  }, [url])

  return (
    <div className="container">
      Hello, path is {url}
      {/*<embed src="http://www.when2meet.com" style={{width:"500px", height: "300px"}}/>*/}
      
      {page}
    </div>
  )
}

export default CommentPage