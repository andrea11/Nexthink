function GetItem1(callback) {
    setTimeout(function () {
        callback({value: Math.random() * 100});
    }, Math.floor(Math.random() * 3000));
}

function GetItem2(callback) {
    setTimeout(function () {
        callback({value: Math.random() * 100});
    }, Math.floor(Math.random() * 5000));
}

function GetAllItems() {
    const promise1 = new Promise(resolve => GetItem1(resolve));
    const promise2 = new Promise(resolve => GetItem2(resolve));
    return Promise.all([promise1, promise2]);
}

async function GetAllItemsSynchronous() {
    return await GetAllItems();
}

function test1() {
    console.log("Solution based on promises");
    console.time("Solution based on promises");
    GetAllItems().then(result => {
        console.timeEnd('Solution based on promises');
        console.log(result.map(result => result.value).reduce((a, b) => a + b, 0));
    });
}

async function test2() {
    console.log("Solution based on promises + use of async/await");
    console.time("Solution based on promises + use of async/await");
    const result = await GetAllItemsSynchronous();
    console.timeEnd('Solution based on promises + use of async/await');
    console.log(result.map(result => result.value).reduce((a, b) => a + b, 0));
}

// Tests
test1();
// or alternatively (using timeout to avoid mixing log on console)
setTimeout(() => test2(), 5000);



