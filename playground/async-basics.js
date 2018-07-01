console.log('Staging app');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(() => {
    console.log('No TimeOut');
}, 0);

console.log('Finishing up');