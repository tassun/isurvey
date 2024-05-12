let params = {};
let settings = {};
let body = JSON.stringify({ });
let counter = 1;
let url = "http://localhost:8080";
let args = process.argv.slice(2);
if(args.length > 0) url = args[0];
if(args.length > 1) counter = parseInt(args[1]);
function fetchUrl(url: string) {
    fetch(url, Object.assign(Object.assign({}, params), { method: "POST", headers: {}, body })).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.error(error);
    });
}
for(let i = 0; i < counter; i++) {
    fetchUrl(url);
}
