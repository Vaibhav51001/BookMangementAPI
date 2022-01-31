const db = require('./DataBase/index.js')

// console.log(db.books);
// console.log(db.authors);
// console.log(db.publications);

const express = require("express");


const app = express();
app.use(express.json());


// http://localhost:3000/
app.get("/", (req, res) =>{
    return res.json({"Welcome": `To my backend Software for the book company.`});
});
// http://localhost:3000/books
app.get("/books", (req, res) =>{
    const getAllBooks = db.books;
    return res.json(getAllBooks);
});
// Here is bookid a variable to routs
// http://localhost:3000/bookid/12345Two
app.get("/book/:isbn", (req, res) =>{
    // console.log(req.params);
    const {isbn} = req.params;
    // console.log(isbn);
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBook.length===0){
        return res.json({"error": `No Book Found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook[0]);
    
});
// http://localhost:3000/book-category/tech
app.get("/book-category/:category", (req, res) =>{
    // console.log(req.params);
    const {category} = req.params;
    // console.log(category);
    const getSpecificBook = db.books.filter((book) => book.category.includes(category));
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBook.length===0){
        return res.json({"error": `No Book Found for the Category of ${category}`});
    }
    return res.json(getSpecificBook);
    
});
// http://localhost:3000/authors.
app.get("/authors", (req, res) =>{
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors);
});
// http://localhost:3000/author/1
app.get("/author/:id", (req, res) =>{
    // console.log(req.params);
    let {id} = req.params;
    id=Number(id); //here we are getting String as input So converting to number.
    // console.log(isbn);
    const getSpecificAuthor = db.authors.filter((author) => author.id === id);
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificAuthor.length===0){
        return res.json({"error": `No Book Found for the Author ID of ${id}`});
    }
    return res.json(getSpecificAuthor[0]);
    
});
// http://localhost:3000/author-book/12345Two
app.get("/author-book/:books", (req, res) =>{
    // console.log(req.params);
    const {books} = req.params;
    // console.log(isbn);
    const getSpecificAuthorBook = db.authors.filter((book) => book.books.includes(books));
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificAuthorBook.length===0){
        return res.json({"error": `No Book Found for the Author for book ${books}`});
    }
    return res.json(getSpecificAuthorBook); 
});


// http://localhost:3000/publications.
app.get("/publications", (req, res) =>{
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
});
// http://localhost:3000/publication-book/12345Two
app.get("/publication-book/:books", (req, res) =>{
    // console.log(req.params);
    const {books} = req.params;
    // console.log(isbn);
    const getSpecificPublicationBook = db.publications.filter((book) => book.books.includes(books));
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificPublicationBook.length===0){
        return res.json({"error": `No Book Found for the Publication for book ${books}`});
    }
    return res.json(getSpecificPublicationBook); 
});

// Posting 
// http://localhost:3000/book
app.post("/book", (req, res) =>{
    // console.log(req.body);
    db.books.push(req.body);
    return res.json(db.books)
});

// http://localhost:3000/author
app.post("/author", (req, res) =>{
    // console.log(req.body);
    db.authors.push(req.body);
    return res.json(db.authors)
});

// http://localhost:3000/publication
app.post("/publication", (req, res) =>{
    console.log(req.body);
    db.publications.push(req.body);
    return res.json(db.publications)
});

// Putting
// http://localhost:3000/book-update/12345ONE
app.put("/book-update/:isbn", (req, res) =>{
    console.log(req.body);
    console.log(req.params);
    const {isbn} = req.params;
    db.books.forEach((book) =>{
        if(book.ISBN===isbn) {
            console.log({...book,...req.body});
            return{...book,...req.body}; //spread operater use for overides book object by req.body put by postman.
        }
        return book;
    })
    return res.json(db.books);
});

// http://localhost:3000/author-update/1
app.put("/author-update/:id", (req, res) =>{
    // console.log(req.body);
    // console.log(req.params);
    let {id} = req.params;
    id=Number(id);
    db.authors.forEach((auther) =>{
        if(auther.id===id) {
            // console.log({...auther,...req.body});
            return{...auther,...req.body}; //spread operater use for overides book object by req.body put by postman.
        }
        return auther;
    })
    return res.json(db.authors);
});
// http://localhost:3000/book-delete/12345ONE
app.delete("/book-delete/:isbn", (req, res) =>{
    // console.log(req.params);
    const {isbn} = req.params;
    const filteredBooks = db.books.filter((book) => book.ISBN!==isbn)
    // console.log(filteredBooks);
    db.books = filteredBooks;
    return res.json(db.books);
});
// http://localhost:3000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id", (req, res) =>{
    // console.log(req.params);
    let {isbn, id} = req.params;
    id = Number(id);
    db.books.forEach((book) =>{
        if(book.ISBN===isbn) {
           if(!book.authors.includes(id)){
               return;
           }
           book.authors = book.authors.filter((auther)=> auther!==id);
           return book;
        }
        return book;
    })
    return res.json(db.books);
});


app.listen(3000,() => {
    console.log("My Express App is Running .....");
});
