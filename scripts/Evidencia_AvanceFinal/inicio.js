


// boton=document.querySelector(".foto").addEventListener('click',function(){myFunction})

// function myFunction() {
//     document.querySelector(".foto").classList.add("animate__flash");
// }

var divElement = document.querySelector('.foto');

// Change the background color to red on page load
lista=divElement.classList.add("animate__flash");

var div = document.querySelector('.anim');


window.setTimeout(function () {
    divElement.classList.remove('animate__flash')
  }, 3500)

  window.setTimeout(function () {
    divElement.classList.add('animate__bounce')
    window.setTimeout(function () {
        div.parentNode.removeChild(div);
      }, 1300)
  }, 3500)



