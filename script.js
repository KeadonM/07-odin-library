let library = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary() {
  displayBooks();
}

/***USER INTERFACE***/
const containerBook = document.querySelector('.book-container');
const btnAddBook = document.querySelector('.btn-add');
const modalBook = document.querySelector('#addBookModal');

btnAddBook.addEventListener('click', showModal);

function showModal() {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);
  overlay.addEventListener('click', hideModal);
  modalBook.classList.add('active');
}

function hideModal() {
  document.querySelector('.overlay').remove();
  modalBook.classList.remove('active');
}

/***DISPLAY BOOKS***/

function displayBooks() {
  console.log('displaying');

  library.forEach(function (book) {
    let currentBook = buildBookCard(book);
    containerBook.appendChild(currentBook);
  });
}

function buildBookCard(book) {
  let card = document.createElement('div');
  card.className = 'book card';

  const title = createParagraphWithText(book.title, 'title');
  const author = createParagraphWithText(book.author, 'author');
  const pages = createParagraphWithText(book.pages, 'pages');

  let hasReadButton = document.createElement('button');
  hasReadButton.className = 'btn btn-read';
  hasReadButton.textContent = 'Not read';

  let removeButton = document.createElement('button');
  removeButton.className = 'btn btn-remove';
  removeButton.textContent = 'remove';

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(hasReadButton);
  card.appendChild(removeButton);

  return card;
}

function createParagraphWithText(text, className) {
  const p = document.createElement('p');
  p.textContent = text;
  p.className = className;
  return p;
}
