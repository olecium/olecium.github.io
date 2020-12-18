import React from "react";
import {Route} from "react-router-dom";
import FavouriteBooks from "../FavouriteBooks/FavouriteBooks";
import Home from "../Home/Home";
import AddBook from "../Admin/AddBook/AddBook";
import BookList from "../BooksList/BooksList";
import {useAuth} from "../Login/hooks/useAuth";
import {LoginForm} from "../Login/LoginForm";

const Content = () => {

    const auth = useAuth();

    return(

        <section>
            {  auth.user ?
                <>
                    <Route exact path='/' render={() => <Home />}/>
                    <Route path="/books" render={() => <BookList />} />
                    <Route path="/favourite" component={FavouriteBooks} />
                    <Route path="/add-book" component={AddBook} />
                </>
                :
                <LoginForm />
            }
        </section>

    );
}
export default Content;
