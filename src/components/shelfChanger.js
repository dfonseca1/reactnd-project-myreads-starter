import React, { Component } from 'react';

class ShelfChanger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: props.book,
            shelfOptions: [
                { shelfDescription: "Move to...", shelfValue: "move" },
                { shelfDescription: "Currently Reading", shelfValue: "currentlyReading" },
                { shelfDescription: "Want to Read", shelfValue: "wantToRead" },
                { shelfDescription: "Read", shelfValue: "read" },
                { shelfDescription: "None", shelfValue: "none" },
            ]
        }

        


    }

    handleShelfChange(e){
        this.props.changeShelfHandler(this.state.book, e.target.value);
    }

    render() {
        let currentShelf = this.state.book.shelf;
        return (
            <div className="book-shelf-changer">
                <select onChange={(e) => this.handleShelfChange(e)} >
                    {this.state.shelfOptions.map(shelf => 
                        (
                            <option key={shelf.value} value={shelf.shelfValue} disabled={shelf.shelfValue === currentShelf} >{shelf.shelfDescription}</option>
                        )
                    )}
                </select>
            </div>
        );
    }

}

export default ShelfChanger;