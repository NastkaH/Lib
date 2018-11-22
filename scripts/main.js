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
        pages.loadJSON();
        pages.manageContent([['[data-role="triger"]', 'show'], ['[data-role="log-triger"]', 'show-l']]);
    })();

    /* So that we can interact with the instance of Page, we export it to the global namespace. */
    window.pages = pages;
})(window);