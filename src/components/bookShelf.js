import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import ShelfChanger from '../components/shelfChanger'

class BookShelf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shelfBooks:this.props.books
        };

        this.changeShelfHandler = this.changeShelfHandler.bind(this);
    }

    changeShelfHandler(bookChanged, newShelf) {
        console.log("changeShelfHandler", bookChanged);
        console.log("newShelf", newShelf);

        this.props.changeShelf(bookChanged, newShelf);

        // this.setState(prevState => {
        //         books: prevState.books.filter( book => book.id !== bookChanged.id);
        //     });

        // BooksAPI.update(book, event.target.value)
        // .then((res) => {
        //     // this.setState({
        //     //     allBooks: books
        //     // });
        //     console.log(res);
        // });
    }


    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                        {this.props.books.map((book) => (
                            <li key={book.title}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                                        {/* <div className="book-shelf-changer">
                                            <select>
                                                <option value="move" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div> */}
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