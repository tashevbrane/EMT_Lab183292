import axios from '../custom-axios/axios'

const BookService = {
    fetchBooks: () => {
        return axios.get("/books");
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },

    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },

    addBook: (name, category, author, availableCopies) =>  {
        return axios.post("/books/add", {
            "name" : name,
            "category": category,
            "author": author,
            "availableCopies": availableCopies
        })
    }
}

export default BookService;