function setToActive(contClass, elClass) {
    'use strict';

    let container = document.querySelector(contClass);

    let els = container.getElementsByClassName(elClass);

    Array.prototype.forEach.call(els, (el) => {
        el.addEventListener("click", () => {
            let current = container.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            el.className += " active";
            /* display(el, container); */
        });
    });
}

function displayNone() {
    'use strict';

    let content = document.getElementsByClassName('tab-content');

    Array.prototype.forEach.call(content, (el) => {
        el.className += ' hide';
    });
}

function display(el, container) {
    'use strict';
    let a = el.querySelector('a');
    let id = a.dataset.id;
    let tabContent = document.getElementById(id);

    if (!tabContent.classList.contains('hide')){

    }

    /* let current = container.getElementsByClassName("hide");
    current[0].className = current[0].className.replace(" hide", "");
    el.className += " active"; */

    
    tabContent.classList.remove('hide');
}

(() => {
    /* displayNone(); */
    setToActive('.main-header', 'ni');
    setToActive('.enter', 'tab');
})();
