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
    }


    /*
    attached DataStore to the App object and reassigned the global App property
    to the newly modified App. (If it did not already exist and you had to create it
    as an empty object, you must attach it.)
    */
    App.DataBase = DataBase;
    window.App = App;
})(window);