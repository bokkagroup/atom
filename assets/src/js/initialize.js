import $ from 'jQuery';

$(document).ready(() => {

    var someVar = false;

    var testPromise = new Promise((resolve, reject) => {
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
});
