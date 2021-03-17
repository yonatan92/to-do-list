console.log('init stage ..');
// alert('newnewnew');

localStorage.setItem('itm1', 'homework');
localStorage.setItem('itm2', 'going to gym');


let itm1 = localStorage.getItem('itm1');
console.log('my itm: ', itm1);

var btn = document.getElementById('submit');
btn.addEventListener('click', func);

function func() {
    console.log(document.getElementById("number").value)
}



document.querySelector('.test').textContent = itm1;