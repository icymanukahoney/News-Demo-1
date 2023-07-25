# NewsAPI - Multilingual News App :tv:

> Knowledge is power

**The Multilingual News App is a web application that relies on the [NewsAPI](https://newsapi.org) service to provide users with the opportunity to read news articles in four languages: English, Hindi, French, and Spanish. It offers a wide range of news articles from different countries, including the United States, India, United Kingdom, and Canada. The app covers various topics such as General, Business, Entertainment, Health, Science, Sports, and Technology, ensuring that users stay up-to-date with the latest news across diverse domains.**

## npm packages

**react-router-dom**
*Provides routing capabilities for React applications, allowing navigation between different components and pages.*

**react**
*The core library for building user interfaces in React applications. React allows developers to create reusable UI components and manage the state of these components efficiently.*

**react-bootstrap-icons**
*This package provides a collection of Bootstrap icons as React components.
Imported icons, like List and X, are used in our  app to display visual elements such as close-button and icons.*

**react-loader-spinner**
*This package is used to show a loading spinner while waiting for data to be fetched from the server or during operations.*

**axios**
*It is used to send HTTP requests to fetch data from the server, for example, news articles, to display on the app.*

![Screenshot of a Funny Pictures Coding Jokes.](https://cdn.quotesgram.com/img/58/53/1336534689-Programmers-Funny-Pictures-Coding-Jokes.jpg)

 ## :dizzy: The dynamic api call with code snippet and explanation how these work in the app

```javascript
useEffect(() => {
    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/top-headlines?country=${country}&language=${language}&category=${topic}&q=${searchTerm}&apiKey=${apiKey}`
            );

            const articles = response.data.articles.map((article) => {
                return {
                    ...article,
                    onSelect: () => setSelectedArticle(article)
                };
            });

            setNews(articles);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    fetchNews();
}, [country, language, topic, searchTerm, apiKey]);
```
**The dynamic API call is made using the Axios library to fetch news articles. 
The dynamic API call is happening inside the useEffect hook, which is a function that runs after the initial render and whenever its dependencies change. The dependencies for this useEffect are country, language, topic, searchTerm, and apiKey. This means that whenever any of these variables change, the useEffect will be triggered, and a new API call will be made with the updated parameters.**


 ## :writing_hand: The context with code snippet and explanation how these work in the app
```javascript
import { createContext, useState } from "react";

export const ArticleContext = createContext();

export const ArticleContextProvider = ({ children }) =>{
    const[selectedArticle, setSelectedArticle] = useState(null)

    return (
        <ArticleContext.Provider value={{ selectedArticle, setSelectedArticle }}>
            {children}
        </ArticleContext.Provider>
    )

}
```
**React context named ArticleContext is created using createContext(). The context will be used to share the selectedArticle state and its corresponding setter function setSelectedArticle across different components in the application.**



