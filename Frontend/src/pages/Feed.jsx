
import { useEffect, useState } from "react";
import Apiservice from "../utils/Apiservice";
import "./Feed.css";

export default function Feed() {
    const [postdata, setPostdata] = useState([]);

    useEffect(() => {
        Apiservice.FeedData()
            .then((res) => {
                console.log(res);
                setPostdata(res.data.post);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const deletePost=(id)=>{
        Apiservice.DeletePost({_id:id})
        .then((res)=>{
            console.log(res.data);
            window.location.reload()
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

    return (
        <section className="feed-section">
            <div className="feed-container">
                <header className="feed-header">
                    <div>
                        <span className="feed-label">DISCOVER & SHARE</span>
                        <h1>Your Feed <span>✦</span></h1>
                        <p>Explore moments shared by everyone.</p>
                    </div>

                    <div className="feed-count">
                        <span>{postdata.length}</span>
                        <small>{postdata.length === 1 ? "Post" : "Posts"}</small>
                    </div>
                </header>

                <div className="feed-divider"></div>

                {postdata.length > 0 ? (
                    <div className="post-grid">
                        {postdata.map((el) => (
                            <article key={el._id} className="post-card">
                                <div className="post-card-image">
                                    <img
                                        src={el.image}
                                        alt={el.caption}
                                    />
                                    <span className="image-tag">✦ Shared moment</span>
                                </div>


                                <div className="post-card-content">
                                    <span className="caption-label">CAPTION</span>
                                    <p>{el.caption}</p>

                                    <button
                                        className="delete-btn"
                                        onClick={()=>{
                                            deletePost(el._id)
                                        }}
                                    >
                                        🗑 Delete Post
                                    </button>
                                </div>

                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="empty-feed">
                        <div className="empty-feed-icon">✧</div>
                        <h2>No posts available</h2>
                        <p>Your feed is waiting for something amazing!</p>
                    </div>
                )}
            </div>
        </section>
    );
}
