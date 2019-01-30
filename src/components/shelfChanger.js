import React, { Component } from 'react';

class ShelfChanger extends React.Component {
    constructor(props) {
        super(props);
    }

    handleShelfChange(e){
        this.props.changeShelfHandler(this.props.book, e.target.value);
    }

    render() {
        let currentShelf = this.props.book.shelf;
        let shelfOptions = [
                { shelfDescription: "Move to...", shelfValue: "move" },
                { shelfDescription: "Currently Reading", shelfValue: "currentlyReading" },
                { shelfDescription: "Want to Read", shelfValue: "wantToRead" },
                { shelfDescription: "Read", shelfValue: "read" },
                { shelfDescription: "None", shelfValue: "none" },
            ];
        
        return (
            <div className="book-shelf-changer">
                <select onChange={(e) => this.handleShelfChange(e)} >
                    {shelfOptions.map((shelf, index) => 
                        (
                            <option key={index} value={shelf.shelfValue} 
                            disabled={ (currentShelf === undefined && shelf.shelfValue === 'none') || shelf.shelfValue === currentShelf} >{shelf.shelfDescription}</option>
                        )
                    )}
                </select>
            </div>
        );
    }

}

export default ShelfChanger;