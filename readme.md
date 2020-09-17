# Nexthink Application Test
- [Introduction](#introduction)
- [Question 1](#question-1)
  - [Answer 1](#answer-1)
- [Question 2](#question-2)
  - [Answer 2](#answer-2)
- [Question 3](#question-3)
  - [Answer 3](#answer-3)

## Introduction
The purpose of this repository is to answer to Nexthink questionnaire

### Question 1
Given the following code:
```javascript
for (var i = 0; i < 5; i++) {
    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Button ' + i));
    btn.addEventListener('click', function(){ console.log(i); });
    document.body.appendChild(btn);
}
```
What is the result when you click on [Button 3] ? Explain why and and the mechanisms that are
behind.
#### Answer 1
> Answer

### Question 2
Given the following 2 functions:
```javascript
function GetItem1(callback) {
    setTimeout( function() {
        callback( { value: Math.random() * 100 } );
    }, Math.floor( Math.random() * 3000 ) );
}

function GetItem2(callback) {
    setTimeout( function(){
        callback( { value: Math.random() * 100 } );
    }, Math.floor( Math.random()* 5000 ) );
}
```
Please write a program that:  
- calls the GetItem1 and GetItem2 functions in parallel  
- collects the results returned by these functions (they return objects e.g. { value: 43.23 })
- print the sum of the value after the callbacks have executed

For example, let’s say that:
- GetItem1 will call the callback with { value: 32.13 } after 2.3 seconds
- GetItem2 will call the callback with { value: 12.5 } after 1.5 seconds

After approximately 2.3 seconds, your program should print 44.63.

#### Answer 2
> Answer

### Question 3
Create a Chrome browser extension which allows to capture web requests from web applications and
send those to a server.
Requirements:
- You only need to support the latest Chrome
- Your extension can leverage the webRequest API to capture requests
- Send every request information captured to a backend of your choice
  - You can reuse an existing backend or create a simple one
- You are free to choose the way the extension communicates with the backend
- Provide a simple UI through the Chrome browserAction popup
  - That UI should allow the user to enter / edit a list of URLs where the requests will NOT be
collected
  - Make that UI simple yet easy to use
  - You are free to use any technology you want for that UI development
For your code, please focus on simplicity, clarity and good engineering practices.
Please provide instructions on how to build the extension.

#### Answer 3
>Answer