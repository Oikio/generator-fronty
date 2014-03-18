'use strict';

// utils
var parseHTML = function (str) {
//  var tmp = document.implementation.createHTMLDocument();
//  tmp.body.innerHTML = str;
//  return tmp.body.children;
  var wrapper= document.createElement('div');
  wrapper.innerHTML= str;
  return wrapper.firstChild;

};


function protoNav() {
  var body = document.body || document.getElementsByTagName('body')[0];
  var head = document.head || document.getElementsByTagName('head')[0];

  // Adding styles
  var style = document.createElement('style');
  var css = '\n\n.protoNav__modal {\n  box-sizing: border-box;\n  position: fixed;\n  width: 100%;\n  height: auto;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  margin-left: 0;\n  background: white;\n  border: 1px solid #ccc;\n  box-shadow: 0 10px 20px rgba(0,0,0,.4);\n  border-radius: 4px;\n  font-size: 16px;\n  line-height: 20px;\n  font-family: Tahoma, Arial, sans-serif;\n  box-sizing: border-box;\n  z-index: 10000;\n}\n\n.protoNav__modal * {\n box-sizing: border-box;\n}\n\n.protoNav__modal-header h3 {\n  font-size: 25px;\n  line-height: 30px;\n  margin: 0 0 0.8em;\n}\n\n.protoNav__close {\n  float: right;\n  padding: 30px;\n  margin: -30px;\n  font-size: 35px;\n  color: red;\n  font-weight: bold;\n  opacity: .3;\n  cursor: pointer;\n}\n.protoNav__close:hover {\n opacity: 1;\n}\n\n.protoNav__modal-body {\n  overflow: auto;\n  max-height: 600px;\n  max-height: 95vh;\n}\n\n.protoNav__nav {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.protoNav__nav-header {\n  font-size: 20px;\n  margin: 0 0 .5em !important;\n}\n\n.protoNav__nav li {\n margin: 0;\n}\n\n.protoNav__nav li a {\n  display: block;\n  padding: 8px;\n  text-decoration: none;\n  color: #40a2ff;\n  border-radius: 4px;\n}\n\n.protoNav__nav li a:hover {\n  color: white !important;\n  background: #40a2ff !important;\n}\n\n.protoNav__nav li.active a {\n background: #dddddd;\n}\n\n.protoNav__nav-header {\n  margin: 0;\n}\n\nli.protoNav__divider {\n  background: #cccccc;\n  height: 1px;\n  margin: 15px 0;\n}\n\n';
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  body.appendChild(style);

  var navList = '<ul class="protoNav__nav">\n  <li data-tplHeading="page" class="protoNav__nav-header">Pages</li>\n  <li class="protoNav__divider"></li>\n  <li data-tplHeading="state" class="protoNav__nav-header">State</li>\n  <li class="protoNav__divider"></li>\n  <li data-tplHeading="block" class="protoNav__nav-header">Blocks</li>\n  <li class="protoNav__divider"></li>\n</ul>';
  navList = parseHTML(navList);

  var tplHeadingPage = navList.querySelectorAll('[data-tplHeading="page"]')[0];
  var tplHeadingState = navList.querySelectorAll('[data-tplHeading="state"]')[0];
  var tplHeadingBlock = navList.querySelectorAll('[data-tplHeading="block"]')[0];


  var populateNavEls = function (templates, group) {
    for (var el in templates) {
      if (templates.hasOwnProperty(el)) {
        var li = '<li class="' + (localStorage.getItem('defaultProto') === el ? 'active' : '') + '">' +
          '<a href="#" data-render="' + el + '">' + el + '</a></li>';
        group.insertAdjacentHTML('afterend', li);
      }
    }
  };

  populateNavEls(devBlocks, tplHeadingBlock);
  populateNavEls(devTemplates, tplHeadingPage);

  for (var el in gState) {
    if (gState.hasOwnProperty(el)) {
      var li = '<li class="' + (localStorage.getItem('defaultState') === el ? 'active' : '') + '"><a href="#" data-state="' + el + '">' + el + '</a></li>';
      tplHeadingState.insertAdjacentHTML('afterend', li);
    }
  }

  var navtpl = '<div class=\'protoNav__modal\' id="protoNav">\n  <div class="protoNav__modal-header">\n    <div class="protoNav__close">&times;</div>\n    <h3>Set default view</h3>\n  </div>\n  <div class="protoNav__modal-body"></div>\n</div>';
  navtpl = parseHTML(navtpl);
  navtpl.querySelectorAll('.protoNav__modal-body')[0].appendChild(navList);

  document.addEventListener('keydown', function (e) {
    if (parseInt(e.which, 10) === 27) {
      var nav = document.getElementById('protoNav')
      nav.parentNode.removeChild(nav);
    }
  });


  var setDefaultProto = function (tpl) {
    localStorage.setItem('defaultProto', tpl);
  };

  var setDefaultState = function (state) {
    localStorage.setItem('defaultState', state);
  };

  var showProtoNav = function () {
    var nav = document.getElementById('protoNav')
    if (nav) {
      nav.parentNode.removeChild(nav);
    }

    body.appendChild(navtpl);

    document.getElementById('protoNav').querySelectorAll('.protoNav__close')[0].addEventListener('click', function () {
      var nav = document.getElementById('protoNav');
      nav.parentNode.removeChild(nav);
    });

    document.addEventListener('click', function (e) {
      e.preventDefault();
      var renderAttr = e.target.getAttribute('data-render');
      var stateAttr = e.target.getAttribute('data-state');

      if (renderAttr) {;
        setDefaultProto(renderAttr);
        window.location.reload();
      } else if (stateAttr) {
        setDefaultState(stateAttr);
        window.location.reload();
      }
    });
  };

  var TapTimer = (function () {

    function TapTimer() {
      this.taps = 0;
    }

    TapTimer.prototype.tap = function () {
      var self = this;
      var timer;
      if (this.taps === 4) {
        showProtoNav();
        this.taps = 0;
      } else {
        clearTimeout(timer);
        timer = setTimeout(function () {
          self.taps = 0;
        }, 700);
        this.taps++;
      }
    };

    return TapTimer;

  })();

  var tapTimer = new TapTimer();

  document.addEventListener('touchstart', function () {
    tapTimer.tap();
  });

  document.addEventListener('keydown', function (e) {
    if (e.which === 88 && e.ctrlKey && e.shiftKey) {
      showProtoNav();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  protoNav();
});


var protoRender = function (templateName, context) {
  var layout = document.querySelectorAll('.layout')[0];

  var context = gState[context];
  var templates = templateName in devTemplates ? devTemplates : devBlocks;
  var output = templates[templateName].render(context, devBlocks);
  layout.innerHTML = output;
};
