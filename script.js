const bookContainer = document.querySelector('.book-container');

let library = [];

let book0 = new Book('Test Title', 'Test Author', '55', false);
let book1 = new Book('Test Title1', 'Test Author1', '56', false);
let book2 = new Book('Test Title2', 'Test Author2', '57', false);
let book3 = new Book('Test Title3', 'Test Author3', '58', false);

library.push(book0, book1, book2, book3);

displayBooks();

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary() {
  // do stuff here
}

function displayBooks() {
  console.log('displaying');

  library.forEach(function (book) {
    let currentBook = buildBookCard(book);
    bookContainer.appendChild(currentBook);
  });
}

function buildBookCard(book) {
  let card = document.createElement('div');
  card.className = 'book card';

  const title = createDivWithText(book.title, 'title');
  const author = createDivWithText(book.author, 'author');
  const pages = createDivWithText(book.pages, 'pages');

  let hasReadButton = document.createElement('button');
  hasReadButton.className = 'hasRead';
  hasReadButton.textContent = 'Not read';

  let removeButton = document.createElement('button');
  removeButton.className = 'remove';
  removeButton.textContent = 'remove';

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(hasReadButton);
  card.appendChild(removeButton);

  return card;
}

function createDivWithText(text, className) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = className;
  return div;
}
