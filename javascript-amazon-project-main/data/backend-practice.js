const xhr =new XMLHttpRequest();

xhr.addEventListener('load',()=>{
   console.log(xhr.response);
});
xhr.open('GET','https://supersimplebackend.dev');                  //(what type of http message, where to send http message(URL))
xhr.send();
