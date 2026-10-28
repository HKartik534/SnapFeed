
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Apiservice from "../utils/Apiservice";
import "./CreatePost.css";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const nav = useNavigate();

  const handleform = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("caption", caption);

    Apiservice.CreatePost(formdata)
      .then((res) => {
        console.log(res);
        nav("/feed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="create-post-section">
      <div className="create-post-card">
        <div className="post-header">
          <span className="post-icon">✦</span>
          <h1>Create a Post</h1>
          <p>Share your moments with the world.</p>
        </div>

        <form onSubmit={handleform}>
          <label className="field-label">Upload your image</label>

          <label className="upload-box">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Selected preview"
                className="image-preview"
              />
            ) : (
              <div className="upload-content">
                <span className="upload-icon">↑</span>
                <h3>Choose an image</h3>
                <p>Click here to browse your files</p>
                <small>PNG, JPG or JPEG</small>
              </div>
            )}

            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </label>

          <label className="field-label" htmlFor="caption">
            Caption
          </label>

          <textarea
            id="caption"
            name="caption"
            placeholder="Write something about your moment..."
            required
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows="4"
          />

          <button type="submit" className="submit-btn">
            Share Post <span>→</span>
          </button>
        </form>

        <p className="post-footer">
          ✨ Your next favorite memory starts here.
        </p>
      </div>
    </section>
  );
}
