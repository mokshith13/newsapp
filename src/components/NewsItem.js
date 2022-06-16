import React from "react";

const NewsItem =(props)=> {
    let { title, description, imageUrl, author, date, source} = props;
    return (
      <div className="my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>
              {source}</span>
          <img src={imageUrl?imageUrl:"https://img.etimg.com/thumb/msid-92147672,width-1070,height-580,imgsize-81192,overlay-etmarkets/photo.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className='text-muted'>By {author} on {new Date(date).toGMTString()}</small></p>
            <a href="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
