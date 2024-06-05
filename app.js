const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const bookshelf = document.getElementById('bookshelf');
const bookshelfContainer = document.getElementById('bookshelf-container');

const books = [
  { title: 'The Lord of the Rings', editionCount: 212 },
  { title: 'The Lord of the Rings', editionCount: 159 },
  { title: 'The Fellowship of the Ring', editionCount: 159 },
  { title: 'The Two Towers', editionCount: 249 },
  { title: 'Official the lôrd of the Rings 2022 Calendar', editionCount: 1 },
];

let bookshelfData = JSON.parse(localStorage.getItem('bookshelf')) || [];

function renderBookshelf() {
  bookshelf.innerHTML = '';
  bookshelfData.forEach((book, index) => {
    const li = document.createElement('li');
    li.classList.add('book-item');

    const h3 = document.createElement('h3');
    h3.textContent = book.title;

    const p = document.createElement('p');
    p.textContent = `Edition Count: ${book.editionCount}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {removeBookFromBookshelf(index); });

    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(removeBtn);

    bookshelf.appendChild(li);
  });
}

function addBookToBookshelf(book) {
  bookshelfData.push(book);
  localStorage.setItem('bookshelf', JSON.stringify(bookshelfData));
  renderBookshelf();
}

function removeBookFromBookshelf(index) {
  bookshelfData.splice(index, 1);
  localStorage.setItem('bookshelf', JSON.stringify(bookshelfData));
  renderBookshelf();
}

searchInput.addEventListener('input', async (e) => {
  const searchTerm = e.target.value.trim();
  if (searchTerm === '') return;

  const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}&limit=10&page=1`);
  const data = await response.json();

  searchResults.innerHTML = '';
  data.docs.forEach((book) => {
    const li = document.createElement('li');
    li.classList.add('book-item');

    const h3 = document.createElement('h3');
    h3.textContent = book.title;

    const p = document.createElement('p');
    p.textContent = `Author: ${book.author_name.join(', ')}`;

    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add to Bookshelf';
    addBtn.addEventListener('click', () => { addBookToBookshelf(book); });

    li.appendChild(h3);
    li.appendChild(p);
    li.appendChild(addBtn);

    searchResults.appendChild(li);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  renderBookshelf();
  bookshelfContainer.style.display = 'block';
});