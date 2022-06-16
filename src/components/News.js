import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
 
const[articles, setArticles] = useState([])
const [loading, setLoading] = useState(true)
const [page, setPage] = useState(1)
const [totalResults, setTotalResults] = useState(0)

  const capitalize=(string)=> {
     return string.charAt(0).toUpperCase() + string.slice(1);
   }
   document.title = `NewShot - ${capitalize(props.category)}`

   const updateNews = async ()=>{
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
}
useEffect(() => {
  updateNews();

}, [])

const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&
  category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`; 
  setPage(page +1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
    return (
        <div>
          <h1 className="text-center " style={{marginTop:'90px'}} >NewsShot - Top {capitalize(props.category)} Headlines </h1>
            {loading && <Spinner/>} 
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row" >
           {articles.map((element,index)=>{
              return <div className="col-md-4 " key={index} >
                      <NewsItem title={element.title?element.title:""} 
                      description={element.description?element.description.slice(0,100):""} 
                      imageUrl={element.urlToImage} 
                      source={element.source.name}
                      newsUrl={element.url}
                      author={element.author?element.author:"Unknown"} 
                        date={element.publishedAt}
                      />
                    </div>
           })}   
        </div>
        </div>
           </InfiniteScroll>
          
        </div>
    )
  
}
 News.defaultProps = {
  country : "in",
   pageSize: 5,
   category:"general"
 }
News.propTypes = {
country : PropTypes.string,
pageSize: PropTypes.number,
category : PropTypes.string
}
export default News;
