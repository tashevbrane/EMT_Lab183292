import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Books from "../Books/BookList/books";
import Authors from "../Authors/authors";
import Header from "../Header/header";
import BookAdd from "../Books/BookAdd/bookAdd";
import BookService from "../../repository/bookRepository";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            authors: []
        }
    }

    render() {
        return(
            <Router>
                <Header>
                <main>
                    <div className="container">
                        <Routes>
                            <Route path={"/books"} exact render = {() =>
                                <Books books={this.state.books} onDelete={this.deleteBook}/>}/>
                            <Route path={"/books/add"} exact render = {() =>
                                <BookAdd books={this.state.books}  authors={this.state.authors} onAddBook={this.addBook}/>}/>
                            <Route path={"/authors"} exact render = {() =>
                                <Authors authors={this.state.authors}/>}/>
                            <Navigate to={"/books"}/>
                        </Routes>

                    </div>
                </main>
                </Header>
            </Router>

        )
    }

    loadBooks = () => {
        BookService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    loadAuthors = () => {
        BookService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    componentDidMount() {
        this.loadBooks();
        this.loadAuthors();
    }

    deleteBook = (id) => {
        BookService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    addBook = (name, category, author, availableCopies) => {
        BookService.addBook(name, category, author, availableCopies)
            .then(() => this.loadBooks())
    }
}
export default App;
