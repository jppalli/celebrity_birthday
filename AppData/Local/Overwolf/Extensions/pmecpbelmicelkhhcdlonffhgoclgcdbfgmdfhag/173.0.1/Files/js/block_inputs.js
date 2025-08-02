document.ondragstart = function () {
  return false;
};

document.onselectstart = function () {
  return false;
};

window.onmousewheel = document.onmousewheel = function () {
  window.event.cancelBubble = true;
  window.event.returnValue = false;
  return false;
};
