(() => {
    const section = document.querySelector('[data-insert-target="generate"]');
    addVideos(section);
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

function addVideos(section) {
    getData(videoURL, (dataJSON) => {
        console.log(dataJSON);
        createVideos(section, dataJSON);
    });
}

function createVideos(section, data) {
    'use strict';

    data.forEach(obj => {
        let arrs = Object.values(obj.files);
            arrs[0].forEach(vObj => {
                let el = addElement('div', {id: `${vObj.id}`, class: 'file-wrap'},
                    addElement('div', {class: 'video-wrap'},
                        addElement('img', {src: `${vObj.video}`, alt: `${vObj.name}`, class: 'video-play'}, 'Your browser does not support the video tag.')
                    ),
                    addElement('div', {class: 'info-wrap'},
                        addElement('a', {href: '#'},
                            /* addElement('span', {}, */ `${vObj.name}`)/* ) */
                    )
                );
                section.appendChild(el);
            });

            if (arrs[1]) {
                arrs[1].forEach(list => {
                    Object.values(list.video).forEach(vObj => {
                        let el = addElement('div', {id: `${vObj.id}`, class: 'file-wrap'},
                        addElement('div', {class: 'video-wrap'},
                            addElement('img', {src: `${vObj.video}`, alt: `${vObj.name}`, class: 'video-play'}, 'Your browser does not support the video tag.')
                        ),
                        addElement('div', {class: 'info-wrap'},
                            addElement('a', {href: '#'},
                                /* addElement('span', {},  */`${vObj.name}`)/* ) */
                        )
                    );
                    section.appendChild(el);
                    });
                });
            }
    });
}