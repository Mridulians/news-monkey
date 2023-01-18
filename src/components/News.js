import React, { useEffect , useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


  const News = (props)=>  {
  
    const [articles, setArticles] = useState([])
    const [loading , setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


     const updateNews = async ()=>{
      props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1ba5e087a2474d81b67ae5f6e10035cf&pagesize=6&page=1`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await  data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);

     }


  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  useEffect(() => {
      updateNews();
      
    document.title = `${capitalize(props.category)} - NewsMonkey`
      //eslint-disable-next-line
  }, [])
  

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1ba5e087a2474d81b67ae5f6e10035cf&pagesize=6&page=${page+1}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  
    return (
         <>
     
          <h1 className='text-center' style={{marginTop:'90px'}}>NewsMonkey - Top {capitalize(props.category)} Headlines</h1>
          {loading && <Spinner />}
          <InfiniteScroll
           dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
          >
            <div className="container">

              <div className="row">
                { articles.map((element) => {
                  return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : "Click on the read more button to know more about the news and the facts behind it."} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                })}
              </div>
            </div>
          </InfiniteScroll>
        </>

        )
  
}
News.defaultProps = {
  country: "in",
  category: "general",

}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
}


export default News;