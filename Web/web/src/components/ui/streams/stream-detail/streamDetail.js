import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import * as streamService from '../../../../services/crossfit-service';
import StreamItem from '../stream-item/streamItem';



function StreamDetail({ title, image, views, author, description }) {
  const [stream, setStream] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    streamService.getStreamDetail(id)
      .then(stream => setStream(stream))
      .catch(error => console.error(error))
  }, [id])

  const handleLike = () => {
    streamService.likeStream(id).then((data) => {
      setStream({
        ...stream,
        likes: data.likes ? stream.likes + 1 : stream.likes - 1
      })
    });
  };

  const handleNewComment = (e) => {
    e.preventDefault();
    const form = e.target;

    streamService.commentStream(id, form.text.value).then((comment) => {
      setStream({
        ...stream,
        comments: [...stream.comments, comment],
      });
    });
  };

  if (!stream) return <></>

  return (
    <section className="main">
      <div className="wrapper">
        <div className="left-col">

          <div className="post">
            <div className="user">
              <div className="info">
                <div class="profile-pic"><img src="img/cover 1.png" alt="" /></div>
                <p className="username">{stream.author.name}</p>
              </div>
              <img src="img/option.PNG" class="options" alt=""></img>
            </div>

            <img className="post-image" src={stream.image} alt={stream.title} />

            <div class="post-content">
              <div class="reaction-wrapper">
                <img src="img/like.PNG" class="icon" alt="" />
                <img src="img/comment.PNG" class="icon" alt="" />
                <img src="img/send.PNG" class="icon" alt="" />
                <img src="img/save.PNG" class="save icon" alt="" />
              </div>
              <button className="btn btn-danger" onClick={handleLike}>
                <i className="fa fa-heart me-2"></i>
                {stream.likes}
              </button>
              <p class="description"><span>{stream.author.name}</span>{stream.description}</p>
              <Link to={`/`}><p class="post-time">Back</p></Link>
            </div>

            <hr />

            <h5>Comments</h5>

            <form onSubmit={handleNewComment} className="mb-3">
              <textarea
                name="text"
                className="form-control mb-2"
                placeholder="Add Comment..."
              />
              <button type="submit" className="btn btn-sm btn-primary">
                Comment
              </button>
            </form>

            {stream.comments.map((comment) => (
              <div className="mb-4 border-bottom py-2">
                <p>{comment.text}</p>
                <small>Por {comment.user.name}</small>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  )
}

export default StreamDetail