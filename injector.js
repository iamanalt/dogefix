let script = document.createElement('script');
script.src = chrome.extension.getURL('injected.js');
script.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(script);
