import React, {Component} from 'react';
import articles from './articles.json';
import Article from './Article';
import { Route, Link } from 'react-router-dom';

class Articles extends Component{
    
    render() {
        return(
            <div>
                <ul>
                    {articles.map(article => 
                        <li key={article.id}>
                            <Link to={`/articles/${article.id}`}>{article.title}</Link>
                        </li> 
                    )}
                </ul>
                <div>{this.props.children}</div>
                <Route path={`/articles/:articleId`} component={Article} />
            </div>
        );
    }
}
export default Articles;