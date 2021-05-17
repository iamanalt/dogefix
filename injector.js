let script = document.createElement('script');
script.src = "https://dogehouse.eu/addon/inject.js";
script.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(script);