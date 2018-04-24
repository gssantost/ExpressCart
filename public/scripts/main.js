const $ = (id) => document.getElementById(id);

var tabs = M.Tabs.init($('tabs'));
var elem = document.querySelector('.sidenav');
var instance = M.Sidenav.init(elem, options);
var options = {};
options.edge = "right";