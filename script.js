/***---USER INTERFACE---***/
const bookContainer = document.querySelector('.book-container');
const clearBooksBtn = document.querySelector('#btn-clear');
const addBookBtn = document.querySelector('#btn-add');
const addBookModal = document.querySelector('#add-book-modal');
const addBookForm = document.querySelector('#add-book-form');

clearBooksBtn.addEventListener('click', clearBooks);
addBookBtn.addEventListener('click', showModal);
addBookForm.addEventListener('submit', (e) => {
  submitBook(e);
  hideModal();
});

function showModal() {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);
  overlay.addEventListener('click', hideModal);
  addBookModal.classList.add('active');
}

function hideModal() {
  document.querySelector('.overlay').remove();
  addBookModal.classList.remove('active');
  addBookForm.reset();
}

/***---BOOK MANAGMENT---***/

let library = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.toggleRead = function () {
    if (this.hasRead) {
      this.hasRead = false;
    } else {
      this.hasRead = true;
    }
    displayBooks();
  };

  this.remove = function () {
    const index = library.findIndex((book) => book === this);
    if (index !== -1) {
      library.splice(index, 1);
    }
    displayBooks();
  };
}

function addBookToLibrary(newBook) {
  if (checkForCopy(newBook)) return;

  library.push(newBook);
  displayBooks();
}

function checkForCopy(newBook) {
  const bookExists = library.find(
    (book) => book.title === newBook.title && book.author === newBook.author
  );

  if (bookExists) {
    alert('Book already exists');
    return true;
  }
}

function submitBook(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const hasRead = document.getElementById('has-read').checked;
  addBookToLibrary(new Book(title, author, pages, hasRead));
}

function clearBooks() {
  library = [];
  displayBooks();
}

/***---DISPLAY BOOKS---***/

function resetBookDisplay() {
  bookContainer.innerHTML = '';
}

function displayBooks() {
  resetBookDisplay();
  library.forEach(function (book) {
    let currentBook = buildBookCard(book);
    bookContainer.appendChild(currentBook);
  });
}

function buildBookCard(book) {
  let card = document.createElement('div');
  card.className = 'book card';

  const title = createParagraphWithText(book.title, 'title');
  const author = createParagraphWithText('by ' + book.author, 'author');
  const pages = createParagraphWithText(book.pages, 'pages');

  let hasReadButton = document.createElement('button');
  hasReadButton.addEventListener('click', () => book.toggleRead());
  hasReadButton.className = 'btn btn-read';
  if (book.hasRead) {
    hasReadButton.classList.add('read');
    hasReadButton.textContent = 'Read';
  } else {
    hasReadButton.classList.add('not-read');
    hasReadButton.textContent = 'Not read';
  }

  let removeButton = document.createElement('button');
  removeButton.addEventListener('click', () => book.remove());
  removeButton.className = 'btn btn-remove';
  removeButton.textContent = 'Remove';

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
