import React from "react";

const PlaylistItem = ({
  snippet: { thumbnails, title, description, resourceId },
}) => {
  return (
    <div className="card mb-3" style={{ width: "100%" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
            <img
              src={thumbnails.high.url}
              className="img-fluid rounded-start"
              alt="course"
              style={{ height: "100%" }}
            />
          </a>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
