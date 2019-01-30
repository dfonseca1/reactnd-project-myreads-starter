import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import ShelfChanger from '../components/shelfChanger'

class SearchBooks extends Component {
    constructor(props){
        super(props);
        this.state = {
            allBooks:[],
            searchValue:"",
            searchResult:[],
            searchTerms:['Android', 'Art', 'Artificial Intelligence',
             'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat',
              'Biography', 'Brief', 'Business', 'Camus', 'Cervantes',
               'Christie', 'Classics', 'Comics', 'Cook', 'Cricket',
                'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 
                'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 
                'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games',
                 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 
                 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make',
                  'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting',
                   'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming',
                    'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction',
                     'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy',
                      'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
        }
        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
        this.handleShelfChange = this.handleShelfChange.bind(this);
    }

    handleSearchValueChange(event){
        this.setState({searchValue: event.target.value});
        
        if(this.state.searchTerms.includes(event.target.value)){
            BooksAPI.search(this.state.searchValue)
            .then((books) => {
                this.setState({
                    searchResult: books
                });
                console.log("BooksApiSearch", books);
            });
        }
    }

    handleShelfChange(bookChanged, newShelf) {
        let newBook = this.state.searchResult.filter(book => book.id === bookChanged.id)[0];
        newBook.shelf = newShelf;

        console.log("BookToUpdate", newBook);
        BooksAPI.update(newBook, newShelf)
        .then((responseData) => {
            console.log("BooksApiUpdate", responseData);

            let searchBooks = this.state.searchResult;
            let index = searchBooks.findIndex(book =>  book.id === newBook.id);
            searchBooks.splice(index, 1, newBook);

            this.setState({
                searchResult: searchBooks
            });

        });
    }

    componentDidMount(){
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
            <div className="search-books">
                <div className="search-books-bar">
                    
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" value={this.state.searchValue} 
                        onChange={this.handleSearchValueChange}  placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResult.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.smallThumbnail}")` }}></div>
                                        
                                        <ShelfChanger book={this.state.allBooks.find(x => x.id === book.id) || book}
                                         changeShelfHandler={this.handleShelfChange} />
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

export default SearchBooks;