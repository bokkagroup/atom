import $ from 'jQuery';
import * as helpers from './helpers/helpers';

$(document).ready(() => {

    //example module usage
    let result = helpers.exampleFunction(4);
    console.log(result); // logs 16
    let result2 = helpers.anotherExampleFunction(4);
    console.log(result2); // logs 8

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
