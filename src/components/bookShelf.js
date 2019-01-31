import React, { Component, PureComponent } from 'react';
import * as BooksAPI from '../BooksAPI';
import ShelfChanger from '../components/shelfChanger'

class BookShelf extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            shelfBooks:this.props.books
        };

        this.changeShelfHandler = this.changeShelfHandler.bind(this);
    }

    changeShelfHandler(bookChanged, newShelf) {
        this.props.changeShelf(bookChanged, newShelf);
    }


    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                        {this.props.books.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.smallThumbnail}")` }}></div>
                                        <ShelfChanger book={book} changeShelfHandler={this.changeShelfHandler} />
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;