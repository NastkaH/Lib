(function(window) {
    'use strict';

    /* It retrieves the constructors you defined as part of the window.App namespace. */

    let App = window.App;
    let MarkUp = App.MarkUp;
    let Page = App.Page;
    let DataBase = App.DataBase;

    let db = new DataBase();
    let pages = new Page(db, new MarkUp());

    (function () {
        window.onload = () => {
            pages.openDataBase('users', 1);
        };

        pages.loadJSON();
        pages.manageContent();
        pages.shadowOnScroll();


        window.onbeforeunload = () => {
            if (localStorage.getItem('last_load_page')) {
                localStorage.removeItem('last_load_page');
            }
            if (localStorage.getItem('logged_user') && localStorage.getItem('last_load_page') == '#logform') {
                localStorage.setItem('last_load_page', '#user');
            }
            localStorage.setItem('last_load_page', window.location.hash);
        };
    })();

    /* So that we can interact with the instance of Page, we export it to the global namespace. */
    window.pages = pages;
})(window);