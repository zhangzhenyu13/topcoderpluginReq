//window.alert("c_1");
var msg = {
    url: document.URL
};
//window.alert("c_2");
//window.alert(msg.url);
chrome.runtime.sendMessage(msg);
//window.alert("c_3");
