class Library {
    constructor() {
        this.books = [];
        this.library = document.querySelector('.library');
        this.addButton = document.querySelector('.addButton');
        this.form = document.querySelector('.form');
        this.titleForm = document.querySelector('#title');
        this.authorForm = document.querySelector('#author');
        this.pagesForm = document.querySelector('#pages');
        this.readForm = document.querySelector('#read');
        this.submit = document.querySelector('.submit');
        this.modal = document.querySelector('.modal');
        this.closeModal = document.querySelector('.closeModal');
        this.sortButton = document.querySelector('.sortButton');
        this.domAddEvents();
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }

    sortBy(by) {
        this.books.sort((a, b) => (a.info[by] > b.info[by]) ? 1 : -1);
    }

    domClear() {
        while (this.library.firstChild) {
            this.library.removeChild(this.library.lastChild);
        }
    };

    domRender() {
        this.books.forEach(this.domMakeBook.bind(this))
    };

    domAddEvents() {
        this.addButton.onclick = this.domOpenModal.bind(this.modal);
        this.closeModal.onclick = this.domCloseModal.bind(this.modal);
        this.sortButton.addEventListener('click',  () => {
            this.sortBy('title');
            this.domClear();
            this.domRender();
        });

        submit.addEventListener('click', (event) => {
            if (this.form.checkValidity()) {
                this.addBook(new Book(this.titleForm.value, this.authorForm.value, this.pagesForm.value, this.readForm.checked));
                event.preventDefault();
                this.domClearForm();
                this.modal.style.display = 'none';
                this.domClear();
                this.domRender();
            }
        });
    }

    domClearForm() {
        this.titleForm.value = '';
        this.authorForm.value = '';
        this.pagesForm.value = '';
        this.readForm.value = false;
    }

    domCloseModal() {
        this.style.display = "none";
    }

    domOpenModal() {
        this.style.display = 'block';
    }

    domMakeBook(book, index) {
        const div = document.createElement('div');
        div.className = 'book'
        div.setAttribute('data-index', index)
        let element;
        for (const attrName in book.info) {
            const value = book.info[attrName];
            if (attrName === 'read') {
                element = document.createElement('input');
                element.setAttribute('type', 'checkbox');
                element.checked = value
                element.addEventListener('change', (event) => {
                    this.books[index].read = event.target.checked;
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
        svg.addEventListener('click', (event) => {
            this.removeBook(parseInt(event.target.id));
            this.domClear();
            this.domRender();
        });
        let p = document.createElement('p')
        p.textContent = 'I read this: '
        div.appendChild(p)
        div.appendChild(svg);
        this.library.appendChild(div);
    }

}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    set title(value) { this._title = value };
    set author(value) { this._author = value };
    set pages(value) { this._pages = value };
    set read(value) { this._read = value };
    get info() {
        return { 'title': this._title, 'author': this._author, 'pages': this._pages, 'read': this._read }
    }
}


const library = new Library()