/***---USER INTERFACE---***/
const bookGrid = document.querySelector('.book-grid');
const clearBooksBtn = document.querySelector('#btn-clear');
const addBookBtn = document.querySelector('#btn-add');
const modalOverlay = document.querySelector('.modal-overlay');
const addBookModal = document.querySelector('#add-book-modal');
const addBookForm = document.querySelector('#add-book-form');

clearBooksBtn.addEventListener('click', clearBooks);
modalOverlay.addEventListener('click', hideModal);
addBookBtn.addEventListener('click', showModal);
addBookForm.addEventListener('submit', (e) => {
  submitBook(e);
  hideModal();
});

function showModal() {
  modalOverlay.classList.add('active');
  addBookModal.classList.add('active');
}

function hideModal() {
  modalOverlay.classList.remove('active');
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

  this.toggleRead = function (button) {
    if (this.hasRead) {
      this.hasRead = false;
      button.classList.remove('read');
      button.classList.add('not-read');
      button.textContent = 'Not read';
    } else {
      this.hasRead = true;
      button.classList.remove('not-read');
      button.classList.add('read');
      button.textContent = 'Read';
    }
  };

  this.removeBook = function (bookDiv) {
    const index = library.findIndex((book) => book === this);
    if (index !== -1) {
      library.splice(index, 1);
    }
    bookDiv.classList.add('animate-out');
    setTimeout(function () {
      bookDiv.remove();
    }, 250);
  };
}

function addBookToLibrary(newBook) {
  if (checkForCopy(newBook)) return;

  library.push(newBook);
  displayNewBook(newBook);
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
  resetBookDisplay();
}

/***---DISPLAY BOOKS---***/

function resetBookDisplay() {
  bookGrid.innerHTML = '';
}

function displayAllBooks() {
  resetBookDisplay();
  library.forEach(function (book) {
    displayNewBook(book);
  });
}

function displayNewBook(newBook) {
  let currentBook = buildBookCard(newBook);
  bookGrid.appendChild(currentBook);
  setTimeout(function () {
    currentBook.classList.add('animate-in');
  }, 10);
}

function buildBookCard(book) {
  let card = document.createElement('div');
  card.className = 'book card';

  const title = createParagraphWithText(book.title, 'title');
  const author = createParagraphWithText('by ' + book.author, 'author');
  const pages = createParagraphWithText(book.pages, 'pages');

  let hasReadButton = document.createElement('button');
  hasReadButton.addEventListener('click', () => book.toggleRead(hasReadButton));
  hasReadButton.className = 'btn btn-read';
  if (book.hasRead) {
    hasReadButton.classList.add('read');
    hasReadButton.textContent = 'Read';
  } else {
    hasReadButton.classList.add('not-read');
    hasReadButton.textContent = 'Not read';
  }

  let removeButton = document.createElement('button');
  removeButton.addEventListener('click', () => book.removeBook(card));
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
