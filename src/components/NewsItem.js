import React  from 'react'

const NewsItem =(props)=> {
  
    let {title , description , imageUrl, newsUrl,author , date,source} = props;
    return (
      <div className='my-3'>
        <div className="card">
          <img src={!imageUrl?"https://i0.wp.com/cricketaddictor.com/wp-content/uploads/2022/08/England-vs-South-Africa.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <span className="badge text-bg-danger">{source}</span>
              <p className="card-text">{description}</p>
              <p className='card-text' ><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
              <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  
}

export default NewsItem;