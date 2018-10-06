import React, { Component } from 'react';
import articles from './articles.json';
import './article.css';

class Article extends Component{
   
    render() {

        const articleId = this.props.match.params.articleId;
        const article = articles.find(({ id }) => id === parseInt(articleId));
        const art = article;
        return(
            <div>
                <div className="news-item">
                    <h2 className="news-title">{art.title}</h2>
                    <p className="news-text">{art.text}</p>
                </div>
            </div>
        );
    }
}

export default Article;