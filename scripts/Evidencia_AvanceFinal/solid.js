// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//     document.querySelector(".navc1").style.backgroundColor="#272727" ;
//   } else {
//     document.querySelector(".navc1").style.backgroundColor="pink" ;
//   }
// }

window.addEventListener('scroll', () => {
    const verticalScrollPx = window.scrollY || window.pageYOffset;
  
    if (verticalScrollPx < 50) {
        document.querySelector(".navc1").style.backgroundColor="" ;
        document.querySelector(".navc1").style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 100px 35px -45px inset";
    } else if (verticalScrollPx > 50 ) {
        document.querySelector(".navc1").style.backgroundColor="#363535" ;
        document.querySelector(".navc1").style.boxShadow = "none";
    }
  });