import $ from 'jQuery';

$(document).ready(() => {

    //example promise
    let someVar = false;

    let testPromise = new Promise((resolve, reject) => {
        if (someVar) {
            return resolve('it worked!');
        } else {
            return reject('it failed :(');
        }
    });

    testPromise.then((message) => {
        console.log(message);
    }, (error) => {
        console.log(error);
    });

    //example handlebars template
    let template = require('./templates/example.handlebars');
    let exampleTemplate = document.createElement('div');

    exampleTemplate.innerHTML = template({
        headline: "This is the headline",
        author: "Charlie"
    });

    document.body.appendChild(exampleTemplate);
});
