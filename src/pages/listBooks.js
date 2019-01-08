import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BookShelf from '../components/bookShelf';
import * as BooksAPI from '../BooksAPI';

class ListBooks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allBooks: []
        }
    }

    componentDidMount() {
        BooksAPI.getAll()
        .then((books)=>{
            this.setState({
                allBooks: books
            });
            console.log(books);
        });
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf shelfName={'Currently Reading'} />
                        <BookShelf shelfName={'Want to Read'} />
                        <BookShelf shelfName={'Read'} />
                    </div>
                </div>
                <div className="open-search">
                    <button >
                        <Link style={{ display: 'block', height: '100%' }} to="/search">Add a book</Link>
                    </button>
                </div>
            </div>
        );
    }

}

export default ListBooks;