function verticallyPartialInView(el) {
    var top = el.offsetTop;
    var bottom = top + el.offsetHeight;
  
    return (
      top < window.pageYOffset ||
      bottom < window.pageYOffset ||
      top > (window.pageYOffset + window.innerHeight) ||
      bottom > (window.pageYOffset + window.innerHeight)
    );
}

export {
  verticallyPartialInView
}