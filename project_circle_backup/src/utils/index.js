//～～～～～～～～～～～自定义封装函数～～～～～～～～～～～～//

// 防抖
function debounce(fn, delay) {
     let timer = null ;
     return function(){
          clearTimeout(timer)
          timer = setTimeout(() => {
               fn()
          }, delay);
     }
}


//节流
function throttle(fn, delay) {
}


module.exports = {
     debounce,
}