let books = [
    {
      ISBN: "12345ONE",
      title: "Getting started with MERN",
      authors: [1, 2],
      language: "en",
      pubDate: "2021-09-07",
      numOfPage: 225,
      category: ["fiction", "programming", "tech", "web dev"],
      publication: 1
    },
    {
      ISBN: "12345Two",
      title: "Getting started with Python",
      authors: [1, 2],
      language: "en",
      pubDate: "2021-08-07",
      numOfPage: 225,
      category: ["fiction", "tech", "web dev"],
      publication: 1
    }
];

let authors = [
    {
      id: 1,
      name: "nikhil",
      books: ["12345ONE", "12345Two"]
    },
    {
      id: 2,
      name: "Ram",
      books: ["12345ONE"]
    }
];
  
let publications = [
    {
      id: 1,
      name: "ShapeAI Publications",
      books: ["12345ONE", "12345Two"]
    },
    {
      id: 2,
      name: "Agarwal Publications",
      books: []
    }
];

module.exports={books, authors, publications}
  
  