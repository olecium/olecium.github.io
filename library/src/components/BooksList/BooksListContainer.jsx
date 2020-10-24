import React, {Component} from "react";
import {connect} from "react-redux";
import { getBooks} from "../../redux/books-selectors";
import { requestBooks } from "./../../redux/books-reducer";
import BooksList from "./BooksList";

class BooksListContainer extends Component{

    componentDidMount() {
        this.props.requestBooks();
    }
    render() {

        return (
            <>
                <BooksList books={this.props.books}/>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        books: getBooks(state)
    }
}

export default connect(mapStateToProps, { requestBooks })(BooksListContainer);
