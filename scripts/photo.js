(() => {
    const section = document.querySelector('[data-insert-target="generate"]');
    addPhoto(section);
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

function addPhoto(section) {
    getData(photoURL, (dataJSON) => {
        console.log(dataJSON);
        createPhoto(section, dataJSON);
    });
}

function createPhoto(section, data) {
    'use strict';

    data.forEach(obj => {
        let arrs = Object.values(obj.works);
            arrs[0].forEach(vObj => {
                let el = element(vObj);
                section.appendChild(el);
            });

            if (arrs[1]) {
                arrs[1].forEach(list => {
                    Object.values(list.audio).forEach(vObj => {
                        let el = addElement('div', {id: `${vObj.id}`, class: 'file-wrap'},
                            addElement('div', {class: 'album-cover'},
                                addElement('img', {src: `${list.cover}`, class: 'cover'})
                            ),
                            addElement('div', {class: 'wrap'},
                                addElement('div', {class: 'audio-wrap'},
                                    addElement('audio', {controls: '', src: `${vObj.audio}`, alt: `${vObj.name}`, class: 'audio-play'}, 'Your browser does not support the audio tag.')
                                ),
                                addElement('div', {class: 'info-wrap'},
                                    addElement('a', {href: '#'},
                                        /* addElement('span', {}, */ `${vObj.name}`)/* ) */
                                )
                            )
                        );
                    section.appendChild(el);
                    });
                });
            }
    });
}

function element(vObj) {
    let el = addElement('div', {id: `${vObj.id}`, class: 'file-wrap'},
        addElement('div', {class: 'album-cover'},
            addElement('img', {src: `${vObj.cover}`, class: 'cover'})
        ),
        addElement('div', {class: 'wrap'},
            addElement('div', {class: 'audio-wrap'},
                addElement('audio', {controls: '', src: `${vObj.audio}`, alt: `${vObj.name}`, class: 'audio-play'}, 'Your browser does not support the audio tag.')
            ),
            addElement('div', {class: 'info-wrap'},
                addElement('a', {href: '#'},
                    /* addElement('span', {}, */ `${vObj.name}`)/* ) */
            )
        )
    );

    return el;
}