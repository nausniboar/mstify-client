import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import './CommentPage.css'

//https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png
const Comment = (comment) => {
  const date = new Date(comment.createdAt)

  return (
    <div className="comment">
      <div className="pfp-column">
        <img className="user-pic" src="https://res.cloudinary.com/beanboy/image/upload/v1697703007/585e4beacb11b227491c3399_jgrjza.png"/>
      </div>
      <div className="text-column">
        <div className="name-date-row">
          <div className="name">{comment.username ? comment.username : <i>{"anonymous"}</i>}</div>
          <div className="date">{date.toDateString()}</div>
        </div>
        <div className="text">{comment.text}</div>
      </div>
    </div>
  )
}
const CommentPage = () => {
  let url = useLocation().pathname.slice(1);
  if(url.startsWith("http://")) {
    url = url.slice(7);
  } else if(url.startsWith("https://")) { 
    url = url.slice(8);
  }
  if(url.startsWith("www.")) url = url.slice(4);
  if(url.endsWith("/")) url = url.slice(0, -1)

  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async ()=> {
      const res = await fetch("https://mstify-api.onrender.com/api/comments/" + encodeURIComponent(url))
      const data = await res.json();
      setComments(data);
    }
    fetchComments();
  }, [url, comments])

  const [username, setUsername] = useState([]);
  const [text, setText] = useState([]);
  const postComment = async() => {
    let data = {
      url: url,
      text: text
    }
    if(username.length > 0) {
      data.username = username;
    }
    console.log(data);
    const response = await fetch("https://mstify-api.onrender.com/api/comments/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(response)
  }

  return (
    <div className="container">
      <h2>Posts for {url}:</h2>
      <div className="comments">
        <div className="comment">
          <div className="pfp-column">
            <img className="user-pic" src="https://res.cloudinary.com/beanboy/image/upload/v1697703007/585e4beacb11b227491c3399_jgrjza.png"/>
          </div>
          <div className="text-column">
            <input className="input"placeholder="Username (Optional)" onChange={(e)=>setUsername(e.target.value)}/>
            <input className="input" placeholder="Write a comment..." onChange={(e)=>setText(e.target.value)}/>
            <button className="submit" onClick={()=>postComment()}>Post</button>
          </div>
        </div>
        {comments.length > 0 ?
          comments.map((c) => (
            <Comment key={c._id} {...c}/>
          )) :
          <div><i>Looks like you're the first.</i></div>
        }
      </div>
    </div>
  )
}

export default CommentPage