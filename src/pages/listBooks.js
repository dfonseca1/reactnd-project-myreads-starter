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
        this.handleShelfChange = this.handleShelfChange.bind(this);
    }

    handleShelfChange(bookChanged, newShelf) {
        let newBook = this.state.allBooks.filter(book => book.id === bookChanged.id)[0];
        newBook.shelf = newShelf;

        console.log("BookToUpdate", newBook);
        BooksAPI.update(newBook, newShelf)
        .then((book) => {
            console.log("BooksApiUpdate", book);
            this.setState({
                allBooks: [...this.state.allBooks.filter(book =>  book.id != newBook.id), newBook]
            });
        });
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({
                    allBooks: books
                });
                console.log("BooksApiGetAll", books);
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
                        <BookShelf changeShelf={this.handleShelfChange} shelfName={'Currently Reading'} books={
                            this.state.allBooks.filter((book) => book.shelf === 'currentlyReading')} />
                        <BookShelf changeShelf={this.handleShelfChange} shelfName={'Want to Read'} books={
                            this.state.allBooks.filter((book) => book.shelf === 'wantToRead')} />
                        <BookShelf changeShelf={this.handleShelfChange} shelfName={'Read'} books={
                            this.state.allBooks.filter((book) => book.shelf === 'read')} />
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