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
            if (!localStorage.getItem('last_load_page')) {
                pages.defaultPage('#home');
            } else {
                pages.defaultPage(localStorage.getItem('last_load_page'));
            }
            /* pages.defaultPage('#home'); */
        };

        pages.loadJSON();
        pages.manageContent();
        pages.shadowOnScroll();

        window.onbeforeunload = () => {
            if (localStorage.getItem('last_load_page')) {
                localStorage.removeItem('last_load_page');
            }
            localStorage.setItem('last_load_page', window.location.hash);
        };
    })();

    /* So that we can interact with the instance of Page, we export it to the global namespace. */
    window.pages = pages;
})(window);