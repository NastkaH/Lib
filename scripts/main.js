let text= document.getElementById('text');

let get = () => {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (this.readystate == 4 && this.status == 200) {
            text.innerHTML = this.responseText;
        }
    };
    req.open("GET", "https://my-json-server.typicode.com/NastkaH/Library/db", true);
    req.send();
};

get();