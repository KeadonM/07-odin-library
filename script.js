const myLibrary = new Library();

class Library {
  constructor() {
    this._bookCollection = [];
  }

  get bookCollection() {
    return this._bookCollection;
  }

  set bookCollection(value) {
    this._bookCollection = value;
  }

  checkForCopy(newBook) {
    const bookExists = this._bookCollection.find(
      (book) => book.title === newBook.title && book.author === newBook.author
    );

    if (bookExists) {
      alert('Book already exists');
      return true;
    }
  }

  addBook(newBook) {
    if (this.checkForCopy(newBook)) return false;
    this._bookCollection.push(newBook);
    return true;
  }

  removeBook(bookToRemove) {
    const index = this._bookCollection.findIndex(
      (book) => book === bookToRemove
    );
    if (index !== -1) {
      this._bookCollection.splice(index, 1);
    }
  }
}

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }

  toggleRead() {
    if (this.hasRead) {
      this.hasRead = false;
    } else {
      this.hasRead = true;
    }
  }

  get card() {
    return this._card;
  }

  set card(value) {
    this._card = value;
  }
}

const uiController = (() => {
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

  function clearBooks() {
    myLibrary.bookCollection = [];
    bookCardController.resetCardDisplay();
  }

  function submitBook(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const hasRead = document.getElementById('has-read').checked;

    book = new Book(title, author, pages, hasRead);
    if (myLibrary.addBook(book)) {
      bookCardController.displayNewBook(book);
    }
  }
})();

const bookCardController = (() => {
  const bookGrid = document.querySelector('.book-grid');

  function resetCardDisplay() {
    bookGrid.innerHTML = '';
  }

  function displayNewBook(newBook) {
    newBook.card = buildBookCard(newBook);
    bookGrid.appendChild(newBook.card);
    setTimeout(function () {
      newBook.card.classList.add('animate-in');
    }, 10);
  }

  function buildBookCard(book) {
    let card = document.createElement('div');
    card.className = 'book card';

    const title = createParagraphWithText(book.title, 'title');
    const author = createParagraphWithText('By: ' + book.author, 'author');
    const pages = createParagraphWithText(book.pages, 'pages');

    const hasReadButton = document.createElement('button');
    hasReadButton.addEventListener('click', () => onReadBtn(book));
    hasReadButton.className = 'btn btn-read';
    hasReadButton.classList.add(book.hasRead ? 'read' : 'not-read');
    hasReadButton.classList.textContent = book.hasRead ? 'Read' : 'Not read';

    const removeButton = document.createElement('button');
    removeButton.addEventListener('click', () => onRemove(book));
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

  function onRemove(book) {
    myLibrary.removeBook(book);
    book.card.classList.add('animate-out');
    setTimeout(function () {
      book.card.remove();
    }, 250);
  }

  function onReadBtn(book) {
    let button = book.card.querySelector('.btn-read');
    if (book.hasRead) {
      button.classList.remove('read');
      button.classList.add('not-read');
      button.textContent = 'Not read';
    } else {
      button.classList.remove('not-read');
      button.classList.add('read');
      button.textContent = 'Read';
    }

    book.toggleRead();
  }

  return { resetCardDisplay, displayNewBook };
})();
