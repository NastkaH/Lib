(function (window) {
    'use strict';

    var App = window.App || {};

    class MarkUp {
        constructor() {
        }

        createPgMarkUp(value, data) {
            const section = document.querySelector('[data-role="generate"]');

            let index = value.indexOf('3000/');
            let id = value.slice(index + 5);
            let row = this.addElement('section', {id: `${id}`, class: 'row v'},
                this.addElement('header', {class: 'sctn-hd'},
                    this.addElement('h1', {}, `${id}`)
                )
            );

            this.createElements(data, row, id);

            for (let i = 0; i < 5; i++) {
                row.appendChild(this.addElement('div', {class: 'fill-in'}));
            }

            /* let pagnt = createPaginationMU();
            row.appendChild(pagnt); */

            section.appendChild(row);
            let th = row.getElementsByClassName('thumb-wrap');
            if (id == 'books') {
                Array.prototype.forEach.call(th, i => {
                    i.classList.add('b');
                });
                this.openBook();
            } else if (id == 'audios') {
                Array.prototype.forEach.call(th, i => {
                    i.classList.add('au');
                });
            }
        }

        createPaginationMU() {
            let pagnt = this.addElement('div', {class: 'pagination'},
                this.addElement('a', {}, '<<'),
                this.addElement('a', {class: 'active'}, '1'),
                this.addElement('a', {}, '2'),
                this.addElement('a', {}, '3'),
                this.addElement('a', {}, '>>')
            );
            return pagnt;
        }

        createElements(data, row, id) {
            let el;

            data.forEach(obj => {
                let arrs = Object.values(obj.data);

                arrs[0].forEach(item => {
                    if (id === 'audios') {
                        el = this.createElMarkUp(item, obj.name);
                        el.appendChild(this.createAudioMarkUp(item));
                    } else if (id === 'videos') {
                        el = this.createVideo(item);
                    } else {
                        el = this.createElMarkUp(item, obj.name);
                    }
                    row.appendChild(el);
                });

                if (arrs[1]) {
                    arrs[1].forEach(set => {
                        Object.values(set.items).forEach(item => {
                            if (id === 'audios') {
                                el = this.createElMarkUp(item, obj.name);
                                el.appendChild(this.createAudioMarkUp(item));
                            } else if (id === 'videos') {
                                el = this.createVideo(item);
                            } else {
                                el = this.createElMarkUp(item, obj.name);
                            }
                            row.appendChild(el);
                        });
                    });
                }
            });
        }

        createElMarkUp(item, objName) {
            let el = this.thumbMarkUp(item, objName);
            return el;
        }

        thumbMarkUp(item, objName) {
            let el = this.addElement('div', {id: `${item.id}`, class: 'el-wrap'},
                this.addElement('div', {class: 'thumb-wrap'},
                    this.addElement('a', {href: `${item.file}`, target: 'pdf_frame'},
                        this.addElement('img', {src: `${item.img}`, alt: `${item.name}`, class: 'thumb-img'})
                    )
                ),
                this.addElement('div', {class: 'info-wrap'},
                    this.addElement('h2', {},
                        this.addElement('a', {href: `${item.file}`, target: '_blank'}, `${item.name}`),
                        this.addElement('span', {class: 'tooltip'}, `${item.name}`)
                    ),
                    this.addElement('p', {},
                        this.addElement('a', {href: '#'}, `${objName}`)
                    )
                )
            );
            return el;
        }

        createAudioMarkUp(item/* , objName, wrapClass */) {
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
                )
            ); */

/*             let el = this.addElement('div', {id: `${item.id}`, class: 'el-wrap'},
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
                ), */
                let el = this.addElement('div', {class: 'wrap'},
                    this.addElement('div', {class: 'audio-wrap'},
                        this.addElement('audio', {controls: '', src: `${item.file}`, alt: `${item.name}`, class: 'audio-play'},
                            'Your browser does not support the audio tag.')
                    )
                );

            return el;
        }

        createVideo(item, objName) {
            let el = this.addElement('div', {id: `${item.id}`, class: 'el-wrap'},
                this.addElement('div', {class: 'thumb-wrap'},
                    this.addElement('div', {class: 'wrap'},
                        this.addElement('div', {class: 'video-wrap'},
                            this.addElement('video', {controls: '', src: `${item.file}`, alt: `${item.name}`, poster: `${item.img}`, class: 'video-play'},
                            'Your browser does not support the video tag.')
                        )
                    )
                ),
                this.addElement('div', {class: 'info-wrap'},
                    this.addElement('h2', {},
                        this.addElement('a', {href: `${item.file}`, target: '_blank'}, `${item.name}`),
                        this.addElement('span', {class: 'tooltip'}, `${item.name}`)
                    ),
                    this.addElement('p', {},
                        this.addElement('a', {href: '#'}, `${objName}`)
                    )
                )
            );
            return el;
        }

        openBook() {
            let els = document.getElementById('books').getElementsByTagName('img');
            let fr = document.getElementById('frame');
            if (!fr) {
                fr = this.addElement('section', {id: 'frame', class: 'frame'});
            }

            Array.prototype.forEach.call(els, (el) => {
                let b = el.parentNode;
                let book = b.getAttribute('href');
                b.addEventListener('click', () => {
                    this.bookFrame(book, fr);
                });
                window.onkeyup = function (event) {
                    if (event.keyCode == 27) {
                        fr.removeChild(fr.firstChild);
                        fr.style.height = '0';
                    }
                };
            });

            document.querySelector('.mrg-auto').appendChild(fr);
        }

        bookFrame(book, fr) {
            let el = this.addElement('iframe', {id:'iframe', class: 'iframe', name: 'pdf_frame', src: `${book}`});
            if (!fr.firstChild) {
                fr.appendChild(el);
                fr.style.height = '100%';
            } else {
                fr.removeChild(fr.firstChild);
            }
        }

        sideLi(genres, id) {
            let ul = this.addElement('ul', {id: `aside-${id}`, class: 'sb-ls hide g'});
            genres.forEach(genre => {
                let el = this.addElement('li', {class: 'sb-ls-it', role: 'menuitem'},
                    this.addElement('a', {class: 'sb-ls-ln', href: '#'},
                        this.addElement('img', {class: 'nav-ico', src: 'media/img/next.svg', alt: 'next'}),
                        this.addElement('span', {}, `${genre}`)
                    )
                );
                ul.appendChild(el);
            });
            return ul;
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

        openDataBase(dbName, dbVersion) {
            if (!('indexedDB' in window)) {
                console.log('This browser doesn\'t support IndexedDB');
                return;
            } else {
                let request = window.indexedDB.open(dbName, dbVersion, upgradeDB => {
                    this.db.upgradeData(upgradeDB);
                });
                /* Cast request obj into promise */
                let promiseReq = Promise.resolve(request);

                promiseReq.then(() => {
                    if (localStorage.getItem('logged_user')) {
                        let aDiv = document.querySelector('[data-hash="#logform');
                        let aHref = aDiv.querySelector('a');
                        aDiv.dataset.hash = '#user';
                        aHref.setAttribute('href', '#user');

                        let upload = document.getElementById('upload');
                        upload.querySelector('.hide').classList.toggle('hide');
                    } else {
                        let state = document.readyState;
                        if(state === 'interactive' || state === 'complete') {
                            this.formSubmit(promiseReq);
                            let upload = document.getElementById('upload');
                            upload.querySelector('.not-logged').classList.toggle('hide');
                        }
                    }

                    if (!localStorage.getItem('last_load_page')) {
                        this.defaultPage('#home');
                    } else {
                        this.defaultPage(localStorage.getItem('last_load_page'));
                    }
                }).catch(er => console.log(er));
            }
        }

        loadJSON() {
            Object.values(this.db.jsonUrl).forEach(value => {
                this.db.getDataFromJSON(value, (dataJSON) => {
                    this.muTools.createPgMarkUp(value, dataJSON);
                    this.createSideList(value, dataJSON);
                });
            });
        }

        defaultPage(hash) {
            window.location.hash = hash;
            let triggers = [...document.querySelectorAll('[data-role="triger"]')];
            let t = triggers.find(triger => {
                return triger.dataset.hash === hash;
            });
            let ta = triggers.find(triger => {
                return triger.classList.contains('active');
            });

            if (!t.getAttribute('class')) {
                t.className = 'active';
            } else {
                if (ta) {
                    ta.classList.remove('active');
                }
                t.classList.add('active');
            }

            document.querySelector(hash).classList.add('show');
        }

        manageContent() {
            this.showElsOnHash();
            this.showElsOnTrigger();
            this.hideAside();
        }

        createSideList(value, data) {
            let arrG = [];
            let genres = new Set();
            let id = value.slice(value.indexOf('3000/') + 5);
            let lis = document.querySelector('nav').querySelectorAll('[role="menuitem"]');
            let li = [...lis].find(li => li.dataset.hash === `#${id}`);

            li.addEventListener('click', () => document.getElementById(`aside-${id}`).classList.toggle('hide'));

            data.forEach(obj => {
                let arrs = Object.values(obj.data);
                arrs.forEach(arr => arr.forEach(item => arrG.push(item.genre)));
            });
            arrG.forEach(arr => arr.forEach(el => genres.add(el)));

            genres = [...genres];
            li.appendChild(this.muTools.sideLi(genres, id));
            /* genres = genres.filter((el, i, genres) => genres.indexOf(el) === i); */
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
                let t = [...triggers].find(triger => triger.dataset.hash === window.location.hash);

                if (t) {
                    this.setToActive(t);
                } else {
                    let tOld = [...triggers].find(triger => triger.dataset.hash === oldUrl);
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

            let btn = document.getElementById('user').querySelector('button');

            btn.onclick = () => {
                localStorage.removeItem('logged_user');
                location.reload();
                this.defaultPage('#home');
            };
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

            if (screen.width <= 1024) {
                element.classList.add('hide-aside');
                main.classList.add('centered');
            }
            trigger.addEventListener('click', () => {
                element.classList.toggle('hide-aside');
                if (screen.width > 1024) {
                    main.classList.toggle('centered');
                }
            });
        }

        validateForm(form) {
            let els = [...form.elements];
            els.pop();
            let arr = [];
            els.forEach(el => arr.push(el.value));
            if (arr.some(x => x == '')) {
                alert('Fill in all fields!');
                return false;
            } else {
                return true;
            }
        }

        formSubmit(request) {
            let section = document.getElementById('logform');
            let arr = [...section.querySelectorAll('form')];

            arr.forEach(form => {
                let btn = form.querySelector('button');
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (this.validateForm(form)) {
                        this.handleForm(request, form);
                    }
                });
            });
        }

        handleForm(request, form) {
            let els = form.elements;
            let email = els.namedItem('email');

            let dbReq = this.db.getByKey(request, email.value, 'email');
            dbReq.then(userReq => {
                userReq.onsuccess = (event) => {
                    let user = event.target.result;

                    switch (form.getAttribute('id')) {
                        case 'signupFm': {
                            if (user === undefined) {
                                this.db.addUser(request, els, form);
                                let loginBtn = document.querySelector('[data-href="login"]');
                                loginBtn.click();
                            } else {
                                alert('this user is already in db');
                                email.focus();
                            }
                            break;
                        }
                        case 'loginFm': {
                            if (user === undefined || user.email !== email.value || user.password !== els.password.value) {
                                alert('Wrong email or password!');
                                els.password.value = '';
                            } else {
                                location.reload();
                                localStorage.setItem('logged_user', user.id);
                                this.defaultPage('#home');
                            }
                        }
                    }
                };
            }).catch(er => console.log(er));
        }

        user(request) {
            let userName = document.querySelector('.user-name');
            let logged = localStorage.getItem('logged_user').toString();

            let dbReq = this.db.getByKey(request, logged, 'id');
            dbReq.then(userReq => {
                userReq.onsuccess = (event) => {
                    let user = event.target.result;
                    console.log(user);
                    let text = document.createTextNode(`${user.fname} ${user.lname}`);
                    userName.appendChild(text);
                };
            }).catch(er => console.log(er));
        }
    }

    App.MarkUp = MarkUp;
    App.Page = Page;
    window.App = App;
})(window);