let getJsonFrom = {
    books: 'http://localhost:3000/books',
    audios: 'http://localhost:3000/audios',
    videos: 'http://localhost:3000/videos',
    photos: 'http://localhost:3000/photos'
};

function getData(requestURL, callback) {
    'use strict';

    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send(null);

    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200 && callback instanceof Function) {
            callback(JSON.parse(request.responseText));
        }
    };
}

function loadJSON(obj) {
    'use strict';

    Object.values(obj).forEach(value => {
        getData(value, (dataJSON) => {
            createPgMarkUp(value, dataJSON);
        });
    });
}


function createPgMarkUp(value, data) {
    'use strict';
    let el;
    const section = document.querySelector('[data-role="generate"]');

    let index = value.indexOf('3000/');
    let id = value.slice(index + 5);
    let row = addElement('section', {id: `${id}`, class: 'row'});

    data.forEach(obj => {
        let arrs = Object.values(obj.data);
        arrs[0].forEach(item => {
            el = createElMarkUp(item, obj.name);
            row.appendChild(el);
        });

        if (arrs[1]) {
            arrs[1].forEach(set => {
                Object.values(set.items).forEach(item => {
                    el = createElMarkUp(item, obj.name);
                    row.appendChild(el);
                });
            });
        }
    });

    if (id == 'books') {
        let th = row.getElementsByClassName('thumb-wrap');
        Array.prototype.forEach.call(th, i => {
            i.classList.add('b')
        });
    }

    section.appendChild(row);
}

function createElMarkUp(item, objName) {
    'use strict';
    let el = thumbMarkUp(item, objName);
    return el;
}

function thumbMarkUp(item, objName) {
    let el = addElement('div', {id: `${item.id}`, class: 'el-wrap'},
        addElement('div', {class: 'thumb-wrap'},
            addElement('a', {href: '#'},
                addElement('img', {src: `${item.img}`, alt: `${item.name}`, class: 'thumb-img'})
            )
        ),
        addElement('div', {class: 'info-wrap'},
            addElement('h2', {},
                addElement('a', {href: '#'}, `${item.name}`)
            ),
            addElement('p', {},
                addElement('a', {href: '#'}, `${objName}`)
            )
        )
    );
    return el;
}

function createAudioMarkUp(item, objName, wrapClass) {
/*     let el = addElement('div', {id: `${item.id}`, class: 'el-wrap-a'},
        addElement('div', {class: wrapClass},
            addElement('a', {href: '#'},
                addElement('img', {src: `${item.img}`, alt: `${item.name}`, class: 'thumb-img'})
            )
        ),
        addElement('div', {class: 'wrap'},
            addElement('div', {class: 'audio-wrap'},
                addElement('audio', {controls: '', src: `${item.file}`, alt: `${item.name}`, class: 'audio-play'},
                    'Your browser does not support the audio tag.')
            )
        ),
        addElement('div', {class: 'info-wrap'},
            addElement('h2', {},
                addElement('a', {href: '#'}, `${item.name}`)
            ),
            addElement('p', {},
                addElement('a', {href: '#'}, `${objName}`)
            )
        )
    ); */

    let el = addElement('div', {id: `${item.id}`, class: 'el-wrap'},
        addElement('div', {class: wrapClass},
            addElement('img', {src: `${item.img}`, alt: `${item.name}`, class: 'thumb-img'})
        ),
        addElement('div', {class: 'info-wrap'},
            addElement('h2', {},
                addElement('a', {href: '#'}, `${item.name}`)
            ),
            addElement('p', {},
                addElement('a', {href: '#'}, `${objName}`)
            )
        )
    );

    return el;
}


/* function showUserLog() {
    'use strict';
    const form = document.getElementById('logform');
    let trigger = form.getElementsByClassName('trg-l');

    Array.prototype.forEach.call(trigger, item => {
        item.addEventListener('click', () => {
            let href = item.querySelector('a').href;
            let index = href.indexOf('#');
            let id = href.slice(index + 1);
            let tabC= document.getElementById(id);

            let current = form.getElementsByClassName('show-l');
            current[0].style.display = 
            tabC.classList.add('show-l');
        });
    });
}
 */



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

function showContent() {

    let trg = document.getElementsByClassName('trg');

    Array.prototype.forEach.call(trg, item => {
        item.addEventListener('click', () => {
            let href = item.querySelector('a').href;
            let index = href.indexOf('#');
            let id = href.slice(index + 1);
            let row = document.getElementById(id);

            let container = document.querySelector('[data-role="generate"]');
            let current = container.getElementsByClassName('show');
            current[0].classList.toggle('show');
            row.classList.add('show');
        });
    });

   /*  showUserLog(); */
}

function setToActive(contClass) {
    'use strict';

    let container = document.querySelector(contClass);
    let elements = document.querySelectorAll('[data-role="active"]');

    Array.prototype.forEach.call(elements, (el) => {
        el.addEventListener('click', () => {
            let current = container.getElementsByClassName('active');
            current[0].className = current[0].className.replace(' active', '');
            el.className += ' active';
        });
    });
}

function hideAside() {
    'use strict';
    let trigger = document.getElementById('burger');
    let element = document.querySelector('[data-visible="target"]');
    let main = document.querySelector('.container');

    if (screen.width <= 768) {
        element.classList.add('hide-aside');
        element.style.boxShadow = "0 0 16px rgba(0,0,0,.28)";
        main.classList.add('centered');
    }

    trigger.addEventListener('click', () => {
        element.classList.toggle('hide-aside');
        if (screen.width > 768) {
            main.classList.toggle('centered');
        }
    });
}

(function () {
    loadJSON(getJsonFrom);
    showContent();
    setToActive('.sb');
    hideAside();
})();