const library = document.querySelector('.library')
const addButton = document.querySelector('.addButton')
const form = document.querySelector('.form')
const titleForm = document.querySelector('#title')
const authorForm = document.querySelector('#author')
const pagesForm = document.querySelector('#pages')
const readForm = document.querySelector('#read')
const submit = document.querySelector('.submit')
const modal = document.querySelector('.modal')
const closeModal = document.querySelector('.closeModal')

addButton.onclick = function () {
    modal.style.display = 'block';
}

closeModal.onclick = closeTheModal;

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const title = titleForm.value;
    const author = authorForm.value;
    const pages = pagesForm.value;
    const read = readForm.value;
    myLibrary.push(new Book(title, author, pages, read));
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    populateLibrary();
};

function changeReadStatus(index, read) {
    myLibrary[index].read = read;
    populateLibrary();
}

function clearLibrary() {
    while (library.firstChild) {
        library.removeChild(library.lastChild);
    }
}

function closeTheModal() {
    modal.style.display = "none"
}

function clearForm() {
    titleForm.value = '';
    authorForm.value = '';
    pagesForm.value = '';
    readForm.value = false;
}

function populateLibrary() {
    clearLibrary();
    myLibrary.forEach(makeBookElement);
}

function makeBookElement(book, index, arr) {
    const div = document.createElement('div');
    div.className = 'book'
    div.setAttribute('data-index', index)
    let element;
    for (const attrName in book) {
        const value = book[attrName]
        if (attrName === 'read') {
            element = document.createElement('input');
            element.setAttribute('type', 'checkbox');
            element.checked = value
            element.addEventListener('change', function () {
                changeReadStatus(index, this.checked)
            });
        } else {
            element = document.createElement('p');
            element.textContent = `${attrName.charAt(0).toUpperCase() + attrName.slice(1)}: ${value}`;
        }
        element.className = attrName;
        div.appendChild(element);
    }
    let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
    let path = document.createElementNS("http://www.w3.org/2000/svg", 'path')
    svg.setAttribute('viewbox', '0 0 24 24');
    svg.setAttribute('width', '40px');
    svg.setAttribute('height', '40px');
    path.setAttribute('d', "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z")
    path.setAttribute('fill', 'black');
    svg.setAttribute('id', index)
    svg.appendChild(path);
    svg.addEventListener('click', function (e) {
        removeBook(parseInt(this.id));
    });
    let p = document.createElement('p')
    p.textContent = 'I read this: '
    div.appendChild(p)
    div.appendChild(svg);
    library.appendChild(div);
}

submit.addEventListener('click', function (event) {
    if (form.checkValidity()) {
        addBookToLibrary()
        clearForm()
        closeTheModal()
    }
    // event.preventDefault()
    populateLibrary()
});

populateLibrary()

