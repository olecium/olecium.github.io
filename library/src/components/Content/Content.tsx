import React from "react";
import {Route} from "react-router-dom";
import FavouriteBooks from "../FavouriteBooks/FavouriteBooks";
import Home from "../Home/Home";
import AddEditBook from "../Admin/AddEditBook/AddEditBook";
import AddEditAuthor from "../Admin/AddEditAuthor/AddEditAuthor";
import BookList from "../BooksList/BooksList";
import AuthorsList from "../AuthorsList/AuthorsList";
import {useAuth} from "../Login/hooks/useAuth";
import {LoginForm} from "../Login/LoginForm";
import {BookUpdateProvider} from "../common/hooks/useBookUpdate";
import { AuthorUpdateProvider } from "../common/hooks/useAuthorUpdates";
import WeekPlanner from "../WeekPlanner/WeekPlanner";
import {FavouriteUpdateProvider} from "../common/hooks/useFavouriteBookUpdates";

const Content = () => {

    const auth = useAuth();


    return(

        <section>
            {  auth.user ?
                <>
                    <Route exact path='/' render={() => <Home />}/>

                    <Route path="/books" render={() => <BookUpdateProvider>
                                                            <FavouriteUpdateProvider>
                                                                <AuthorUpdateProvider>
                                                                    <BookList />
                                                                </AuthorUpdateProvider>
                                                            </FavouriteUpdateProvider>
                                                            </BookUpdateProvider>} />
                                                            
                    <Route path="/authors" render={() => <AuthorUpdateProvider>
                                                            <AuthorsList />
                                                        </AuthorUpdateProvider>} />

                    <Route path="/week-planner" render={() => <BookUpdateProvider>
                                                                <FavouriteUpdateProvider>
                                                                    <AuthorUpdateProvider>
                                                                        <WeekPlanner />
                                                                    </AuthorUpdateProvider>
                                                                </FavouriteUpdateProvider>
                                                            </BookUpdateProvider>} />

                    <Route path="/favourite" component={FavouriteBooks} />

                    <Route path="/add-edit-book" component={AddEditBook} />
                    <Route path="/add-edit-author" component={AddEditAuthor} />
                </>
                :
                <LoginForm />
            }
        </section>

    );
}
export default Content;
