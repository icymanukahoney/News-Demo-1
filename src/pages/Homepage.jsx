import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
import { Navigate, useNavigate } from 'react-router-dom'
import { ArticleContext } from '../context/ArticleContext'

// API key
const apiKey = import.meta.env.VITE_YOUR_API_KEY



const Homepage = () => {
// set up the article context 
const { setSelectedArticle } = useContext (ArticleContext)

    // useState definitions for all our inputs:
    const [searchTerm, setSearchTerm] = useState('')
    const [country, setCountry] = useState('us')
    const [language, setLanguage] = useState('en')
    const [topic, setTopic] = useState('general')
    // set a state for news (all my articles)
    const [news, setNews] = useState([])
    // set a state for loading
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    // useEffect - api call inside
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=${country}&language=${language}&category=${topic}&q=${searchTerm}&apiKey=${apiKey}`
                )

                const articles = response.data.articles.map((article) => {
                    return {
                    ...article,
                    onSelect: () => setSelectedArticle(article)
                    }
                })

                console.log(response.data.articles)
                setNews(articles)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchNews()
    }, [country, language, topic, searchTerm, apiKey])


 
     return (
        
    <div className="container">
            <h1>News Articles</h1>
    
            <form>
                {/* Search Bar */}
                <label htmlFor="search">Search</label>
                <input 
                    type="text" 
                    name="search" 
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            
    
            {/* Country Select */}
           
                <label htmlFor="country">Country:</label>
                <select 
                    name="country" 
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value="us">United States</option>
                    <option value="in">India</option>
                    <option value="gb">United Kingdom</option>
                    <option value="ca">Canada</option>
                </select>
           
    
            {/* Language Select */}
          
                <label htmlFor="language">Language:</label>
                <select 
                    name="language" 
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                </select>
           
    
            {/* Topic Select */}
           
                <label htmlFor="topic">Topic:</label>
                <select 
                    name="topic" 
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                >
                    <option value="general">General</option>
                    <option value="business">Business</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                </select>
                </form>
            {/* News Atricles Results */}
        <div>
        {loading ? (
            <div className="loader">
                <Puff color="#00BFFF" height={100} width={100}/>
                </div>

                ) : news.length === 0 ? (
                <p>No Articles Found</p>
                ) : (
                news.map((item) => (
                    <div className="news-item" key={item.url}>
        <img src={item.urlToImage} alt={item.title} />
        <div className="news-item-content">
          <h2>{item.title}</h2>
          <p>{item.author}</p>
          <p>{item.source.name}</p>
          <p>{item.description}</p>
          <p>{item.publishedAt}</p>
          <button onClick={() => 
          {item.onSelect()
            navigate('/article/')
        }
    }>Read More</button>
        </div>
      </div>
                ))
            )}
        </div>
    </div>

  )
}

export default Homepage
