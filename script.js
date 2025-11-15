const btn = document.querySelector(".btn"); //Select a button

// Book class : Represent a book
class Book {
  // Constructor
  constructor(id, bookName, author, price) {
    //Assign a data in bookName, author, price.
    this.id = id;
    this.bookName = bookName;
    this.author = author;
    this.price = price;
  }

  //Method for showing a bookInfo all on UI
  static showBookInfo(data) {
    //for iteration on every object use foreach loop
    data.forEach((bookData) => {
      const list = document.querySelector("#book-list"); //Select a table head for add a child in this thead
      const row = document.createElement("tr"); // Create a table row for showing a book details
      //In row showing a all book information on UI
      row.innerHTML = `
      <td>${bookData.bookName}</td>
      <td>${bookData.author}</td>
      <td>${bookData.price}</td>
      <span class="remove-info"><img src="close.png" alt="img"></span>
      `;
      list.appendChild(row); //Add node in DOM
    });
  }

  //Show only one bok information after enter new book data
  static addBook(data) {
    //Get a last of object in array
    let bookNew = data.at(-1);
    const list = document.querySelector("#book-list"); //Select a table head for add a child in this thead
    const row = document.createElement("tr"); // Create a table row for showing a book details
    row.innerHTML = `
      <td>${bookNew.bookName}</td>
      <td>${bookNew.author}</td>
      <td>${bookNew.price}</td>
      <td><img class="remove-info" data-id="${bookNew.id}" src="close.png" alt="remove"></td>
      `;
    list.appendChild(row);

    //#Remove data
    row.querySelector(".remove-info").addEventListener("click", (e) => {
      //# get a id odf clicked row
    let bookId = e.target.dataset.id; 
    //# get a array of books 
    let books = JSON.parse(localStorage.getItem("Information")) || [];
    //#Filter which books they are not same carry a id which is clicked 
    let updateBook = books.filter(book => book.id !== bookId);
    //#After that again add in local storage 
    localStorage.setItem("Information", JSON.stringify(updateBook));
    //#and then remove it 
    row.remove();
  });
  }
}

//# After submit the information about book show the data on UI
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault(); //Stop form from reloading page {It is stop browser default behave}

  // Take information in inputs, Information enter by user
  const bookName = document.querySelector("#bookName").value;
  const author = document.querySelector("#author").value;
  const price = document.querySelector("#price").value;

  // Check if inout is null
  if (!bookName || !author || !price) {
    //Alert for input is null
    alert("Fill details of book");
  } else {
    //Create a array in localstorage if exist so get a array for add new information of book
    let books = JSON.parse(localStorage.getItem("bookInformation")) || [];
    let id = "id" + Math.random().toString(16).slice(2);

    //Object of new book create here
    const newBook = new Book(id, bookName, author, price);

    //Push data in array
    books.push(newBook);
    //set book object in localstorage
    localStorage.setItem("bookInformation", JSON.stringify(books));
    //call addBook function for showing a book information
    Book.addBook(JSON.parse(localStorage.getItem("bookInformation")));
  }

  // clear inputs
  document.querySelector("#bookName").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#price").value = "";
});

//After load website still show a information of book so add DOMContentLoaded eventlistener.
// document.addEventListener("DOMContentLoaded", () => {
const storedBooks = JSON.parse(localStorage.getItem("bookInformation")) || [];
Book.showBookInfo(storedBooks);
// });
