import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { ArticleContext } from '../context/ArticleContext'


const SingleArticle = () => {
// bring in the selected article 
const { selectedArticle } = useContext (ArticleContext)

    // create a variable for the useNavigate
    const navigate = useNavigate()


  return (
    <div className="container-single-article">
      <button onClick={() => navigate ('/')}>Go Back</button>
      <h1 className="heading">{selectedArticle.title}</h1>
      <p className="author">{selectedArticle.author}</p>
      <p className="source">{selectedArticle.source.name}</p>
      <img src={selectedArticle.urlToImage} alt={selectedArticle.title} className="image"/>
      <p className="content"> {selectedArticle.content}</p>
      <p className="publishedAt"> {selectedArticle.publishedAt}</p>


    </div>
  )
}

export default SingleArticle
