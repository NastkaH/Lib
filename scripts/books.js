(() => {
    const section = document.querySelector('[data-insert-target="generate"]');
    addBooks(section);
})();

function addElement(title, attributes) {
    'use strict';

    let args = arguments;
    let length = args.length;
    let element = document.createElement(title);

    for (let item in attributes) {
        element.setAttribute(item, attributes[item]);
    }

    if (length > 2) {
        for (let item = 2; item < length; item++) {
            let value = args[item];

            if (typeof value == 'string') {
                value = document.createTextNode(value);
            }
            element.appendChild(value);
        }
    }

    return element;
}

function getData(requestURL, callback) {
    'use strict';

    let request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200 && callback instanceof Function) {
            callback(JSON.parse(request.responseText));
        }
    };
    request.open('GET', requestURL);
    request.send(null);
}

function addBooks(section) {
    getData(booksURL, (dataJSON) => {
        console.log(dataJSON);
        createBooks(section, dataJSON);
    });
}

function createBooks(section, data) {
    'use strict';


    data.forEach(obj => {
        let arrs = Object.values(obj.works);
            arrs[0].forEach(book => {
                let el = addElement('div', {id: `${book.id}`, class: 'book-wrap'},
                    addElement('div', {class: 'img-wrap'},
                        addElement('a', {href: '#'},
                            addElement('img', {src: `${book.cover}`, alt: `${book.name}`, class: 'book-cover'})
                        )
                    ),
                    addElement('div', {class: 'info-wrap'},
                        addElement('a', {href: '#'},
                            /* addElement('span', {}, */ `${book.name}`)/* ) */
                    )
                );
                section.appendChild(el);
            });

            if (arrs[1]) {
                arrs[1].forEach(series => {
                    Object.values(series.books).forEach(book => {
                        let el = addElement('div', {id: `${book.id}`, class: 'book-wrap'},
                        addElement('div', {class: 'img-wrap'},
                            addElement('a', {href: '#'},
                                addElement('img', {src: `${book.cover}`, alt: `${book.name}`, class: 'book-cover'})
                            )
                        ),
                        addElement('div', {class: 'info-wrap'},
                            addElement('a', {href: '#'},
                                /* addElement('span', {},  */`${book.name}`)/* ) */
                        )
                    );
                    section.appendChild(el);
                    });
                });
            }
    });
}