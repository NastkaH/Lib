(function (window) {
    'use strict';

    var App = window.App || {};

    class MarkUp {
        constructor() {
        }

        createPgMarkUp(value, data) {
            let el;
            const section = document.querySelector('[data-role="generate"]');

            let index = value.indexOf('3000/');
            let id = value.slice(index + 5);
            let row = this.addElement('section', {id: `${id}`, class: 'row v'},
                this.addElement('header', {class: 'sctn-hd'},
                    this.addElement('h1', {}, `${id}`)
                )
            );

            data.forEach(obj => {
                let arrs = Object.values(obj.data);
                arrs[0].forEach(item => {
                    el = this.createElMarkUp(item, obj.name);
                    row.appendChild(el);
                });

                if (arrs[1]) {
                    arrs[1].forEach(set => {
                        Object.values(set.items).forEach(item => {
                            el = this.createElMarkUp(item, obj.name);
                            row.appendChild(el);
                        });
                    });
                }
            });

            if (id == 'books') {
                let th = row.getElementsByClassName('thumb-wrap');
                Array.prototype.forEach.call(th, i => {
                    i.classList.add('b');
                });
            }

            if (id == 'audios') {
                let th = row.getElementsByClassName('thumb-wrap');
                Array.prototype.forEach.call(th, i => {
                    i.classList.add('au');
                });
            }

            section.appendChild(row);
        }

        createElMarkUp(item, objName) {
            let el = this.thumbMarkUp(item, objName);
            /* el.addEventListener('click', () => {
                let currentSec = document.querySelectorAll('.show');
                currentSec[0].classList.toggle('show');

                this.createDetailedPage(item, objName);
                let detPage = document.getElementById('detPage');
                let id = `s${item.id}`;
                let e = document.getElementById(id);
                e.classList.toggle('show');
            }); */
            return el;
        }

        thumbMarkUp(item, objName) {
            let el = this.addElement('div', {id: `${item.id}`, class: 'el-wrap'},
                this.addElement('div', {class: 'thumb-wrap'},
                    this.addElement('a', {href: `#s${item.id}`},
                        this.addElement('img', {src: `${item.img}`, alt: `${item.name}`, class: 'thumb-img'})
                    )
                ),
                this.addElement('div', {class: 'info-wrap'},
                    this.addElement('h2', {},
                        this.addElement('a', {href: `#s${item.id}`}, `${item.name}`),
                        this.addElement('span', {class: 'tooltip'}, `${item.name}`)
                    ),
                    this.addElement('p', {},
                        this.addElement('a', {href: '#'}, `${objName}`)
                    )
                )
            );
            return el;
        }

        /* createDetailedPage(item, objName) {
            let section = document.querySelector('[data-role="generate-det-pg"]');

            let el = this.addElement('div', {id: `s${item.id}`,class: 'page-wrap'},
            this.addElement('section', {class: 'hd-wrap'},
            this.addElement('div', {class: 'img-wrap'},
            this.addElement('img', {src: `${item.img}`, alt: `${item.name}`, class: 'det-img'})
                    ),
                    this.addElement('div', {class: 'info-cont'},
                    this.addElement('h1', {class: 'page-hd'}, `${item.name}`),
                    this.addElement('p', {},
                    this.addElement('a', {href: '#'}, `${objName}`)
                            ),
                            this.addElement('p', {}, `${item.year}`),
                            this.addElement('p', {}, `${item.genre}`),
                            this.addElement('p', {}, `${item.about}`)
                    )
                ),
                this.addElement('div', {class: 'file-wrap'},
        /*             addElement('div', {},
                        addElement('a', {href: '#'}, 'Download file')
                    ), */
          /*           this.addElement('div', {},
                    this.addElement('a', {href: `${item.file}`, target: '_blank'}, 'Open file')
                    )
                )
            );

            section.appendChild(el);
        } */

        createAudioMarkUp(item, objName, wrapClass) {
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

            let el = this.addElement('div', {id: `${item.id}`, class: 'el-wrap'},
            this.addElement('div', {class: wrapClass},
            this.addElement('img', {src: `${item.img}`, alt: `${item.name}`, class: 'thumb-img'})
                ),
                this.addElement('div', {class: 'info-wrap'},
                this.addElement('h2', {},
                this.addElement('a', {href: '#'}, `${item.name}`)
                    ),
                    this.addElement('p', {},
                    this.addElement('a', {href: '#'}, `${objName}`)
                    )
                )
            );

            return el;
        }

        addElement(title, attributes) {

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
    }

    class Page {
        constructor(db, markUp) {
            this.db = db;
            this.muTools = markUp;
        }

        loadJSON() {
            Object.values(this.db.jsonUrl).forEach(value => {
                this.db.getDataFromJSON(value, (dataJSON) => {
                    this.muTools.createPgMarkUp(value, dataJSON);
                });
            });
        }

        defaultPage(hash) {
            window.location.hash = hash;
            let triggers = document.querySelectorAll('[data-role="triger"]');
            let t = [...triggers].find(triger => {
                return triger.dataset.hash === hash;
            });

            if (!t.getAttribute('class')) {
                t.className = 'active';
            } else {
                t.classList.add('active');
            }

            document.querySelector(hash).classList.add('show');
        }

        manageContent() {
            this.showElsOnHash();
            this.showElsOnTrigger();
            this.hideAside();
        }

        showElsOnHash() {
            let oldUrl;
            oldUrl = window.location.hash;
            window.addEventListener('hashchange', () => {
                let hideEl = document.getElementById(oldUrl.substr(1));
                let showEl = document.getElementById(window.location.hash.substr(1));
                document.querySelector('main').scrollTop = 0;


                if (performance.navigation.type == 1) {
                    showEl.classList.add('show');
                    oldUrl = window.location.hash;
                } else {
                    hideEl.classList.remove('show');
                    showEl.classList.add('show');
                    oldUrl = window.location.hash;
                }

                let triggers = document.querySelectorAll('[data-role="triger"]');
                let t = [...triggers].find(triger => {
                    return triger.dataset.hash === window.location.hash;
                });

                if (t) {
                    this.setToActive(t);
                } else {
                    let tOld = [...triggers].find(triger => {
                        return triger.dataset.hash === oldUrl;
                    });
                    this.setToActive(tOld);
                }
            });
        }

        showElsOnTrigger() {
            let arr = document.getElementsByClassName('tab-button');

            Array.prototype.forEach.call(arr, button => {
                button.addEventListener('click', () => {
                    let href = button.dataset.href;
                    let el = document.getElementById(href);

                    let hideEl = document.querySelector('.show-l');
                    hideEl.classList.remove('show-l');
                    el.classList.add('show-l');

                    this.setToActive(button);
                });
            });
        }

        shadowOnScroll() {
            let hd = document.querySelector('.mn-hd');
            let scrollTrigs = document.querySelectorAll('[data-scroll="trigger"]');

            scrollTrigs.forEach(trigger => {
                trigger.addEventListener('scroll', () => {
                    if (trigger.scrollTop > 1) {
                        hd.classList.add('scroll');
                    } else {
                        hd.classList.remove('scroll');
                    }
                });
            });
        }

        setToActive(trigger) {
            let current = document.getElementsByClassName('active');

            let x = (trigger.dataset.role === 'log-triger') ? 1 : 0;
            current[x].classList.toggle('active');
            trigger.classList.add('active');
        }

        hideAside() {
            let element = document.querySelector('[data-visible="target"]');
            if (window.innerWidth > 1530) {
                element.style.left = ((window.innerWidth - 1530) / 2).toString() + 'px';
            }
            /* if (window.innerWidth <= 1530) { */
                this.shiftSideBar(element);
            /* } else {
                    window.addEventListener('resize', () => {
                        if (window.innerWidth <= 1530) {
                            element.style.left = '0px';
                            this.shiftSideBar(element);
                        } else {
                            if (element.classList.contains('hide-aside')) {
                                element.classList.remove('hide-aside');
                                main.classList.remove('centered');
                            }
                            element.style.left = ((window.innerWidth - 1530) / 2).toString() + 'px';
                        }
                    });*/
            /* } */
        }

        shiftSideBar(element) {
            let trigger = document.getElementById('burger');
            let main = document.querySelector('.container');

            if (window.innerWidth <= 1024) {
                element.classList.add('hide-aside');
                main.classList.add('centered');
            }
            trigger.addEventListener('click', () => {
                element.classList.toggle('hide-aside');
                if (window.innerWidth > 1024) {
                    main.classList.toggle('centered');
                }
            });
        }
    }

    App.MarkUp = MarkUp;
    App.Page = Page;
    window.App = App;
})(window);