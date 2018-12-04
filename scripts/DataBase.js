(function (window) {
    'use strict';

    /*
    if there's already App property of the window - we assign local App to it, otherwise
    App will refer to a new object, represented by {}
    */
    const App = window.App || {};

    class DataBase {
        constructor() {
            this.jsonUrl = {
                books: 'http://localhost:3000/books',
                audios: 'http://localhost:3000/audios',
                videos: 'http://localhost:3000/videos',
                photos: 'http://localhost:3000/photos'
            };
            this.userData = {};
            /* this.dbx = new Dropbox({ accessToken: _-llQRWBqqAAAAAAAAAAPVg9fgi9M5s8Jhr4qxC6AKTGXoOIhrZvwUucDjt2jWJ7 }); */
        }
/*         //key - customers email adress, val - order information
        add(key, val) {
            this.data[key] = val;
        }
        get(key) {
            return this.data[key];
        }
        getAll() {
            return this.data;
        }
        remove(key) {
            delete this.data[key]; //removes a key/value pair from an object
        } */

        getDataFromJSON(requestURL, callback) {
            let request = new XMLHttpRequest();
            request.open('GET', requestURL);
            request.send(null);

            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200 && callback instanceof Function) {
                    callback(JSON.parse(request.responseText));
                }
            };
        }

        upgradeDataBase(request, dbVersion, store) {
            let inDB = request.result;

            switch(dbVersion) {
                case 0:
                case 1:
                    store = inDB.createObjectStore('users', {keyPath: 'id'});
                    store.createIndex('by_fname', 'fname');
                    store.createIndex('by_lname', 'lname');
                    store.createIndex('by_email', 'email', {unique: true});
                    store.createIndex('by_password', 'password', {unique: true});
            }

            /* if (dbVersion < 3) {
                // Version 2 introduces a new index of books by year.
                store = request.transaction.objectStore('users');
                store.createIndex('by_file', 'file');
            } */
        }

        putInDataBase(elsArr, inDB) {
            let transaction = inDB.transaction('users', 'readwrite');
            let store = transaction.objectStore('users');
            let user = {
            };

            user.id = new Date().getTime().toString();
            elsArr.forEach((el) => {
                user[el.name] = el.value;
            });

            if (this.findInDataBase(inDB, email)) {

            }

            let request = store.add(user);

            request.onsuccess = () => {
                console.log(user + 'in db');
            };
        }

        findInDataBase(email, inDB) {
            let trans = inDB.transaction('users', 'readonly');
            let store = trans.objectStore('users');
            let index = store.index('by_email');

            let request = index.get(email);

            request.onsuccess = () => {
                let matching = request.result;
                if (matching !== undefined) {
                    console.log(matching.id, matching.fname, matching.lname);
                    return true;
                } else {
                    console.log(null);
                    return false;
                }
            };
        }
    }


    /*
    attached DataStore to the App object and reassigned the global App property
    to the newly modified App. (If it did not already exist and you had to create it
    as an empty object, you must attach it.)
    */
    App.DataBase = DataBase;
    window.App = App;
})(window);