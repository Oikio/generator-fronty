'use strict';

var protoNav;

(protoNav = function () {
  var $doc, $layout, $li, $navList, $navtpl, $tplHeadingArea, $tplHeadingBlock, $tplHeadingFish, $tplHeadingPage, $tplHeadingPartial, TapTimer, el, navList, navtpl, setDefaultFish, setDefaultProto, showProtoNav, tapTimer;
  $layout = $('body');
  $doc = $(document);
  $layout.append('<style>\n\n.protoNav__modal {\n  box-sizing: border-box;\n  position: fixed;\n  width: 100%;\n  height: auto;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  margin-left: 0;\n  background: white;\n  border: 1px solid #ccc;\n  box-shadow: 0 10px 20px rgba(0,0,0,.4);\n  border-radius: 4px;\n  font-size: 16px;\n  line-height: 20px;\n  font-family: Tahoma, Arial, sans-serif;\n  box-sizing: border-box;\n  z-index: 10000;\n}\n\n.protoNav__modal * {\n box-sizing: border-box;\n}\n\n.protoNav__modal-header h3 {\n  font-size: 25px;\n  line-height: 30px;\n  margin: 0 0 0.8em;\n}\n\n.protoNav__close {\n  float: right;\n  padding: 30px;\n  margin: -30px;\n  font-size: 35px;\n  color: red;\n  font-weight: bold;\n  opacity: .3;\n  cursor: pointer;\n}\n.protoNav__close:hover {\n opacity: 1;\n}\n\n.protoNav__modal-body {\n  overflow: auto;\n  max-height: 600px;\n  max-height: 95vh;\n}\n\n.protoNav__nav {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.protoNav__nav-header {\n  font-size: 20px;\n  margin: 0 0 .5em !important;\n}\n\n.protoNav__nav li {\n margin: 0;\n}\n\n.protoNav__nav li a {\n  display: block;\n  padding: 8px;\n  text-decoration: none;\n  color: #40a2ff;\n  border-radius: 4px;\n}\n\n.protoNav__nav li a:hover {\n  color: white !important;\n  background: #40a2ff !important;\n}\n\n.protoNav__nav li.active a {\n background: #dddddd;\n}\n\n.protoNav__nav-header {\n  margin: 0;\n}\n\nli.protoNav__divider {\n  background: #cccccc;\n  height: 1px;\n  margin: 15px 0;\n}\n\n</style>');
  navList = '<ul class="protoNav__nav">\n  <li data-tplHeading="page" class="protoNav__nav-header">Pages</li>\n  <li class="protoNav__divider"></li>\n  <li data-tplHeading="fish" class="protoNav__nav-header">Fish</li>\n  <li class="protoNav__divider"></li>\n  <li data-tplHeading="block" class="protoNav__nav-header">Blocks</li>\n  <li class="protoNav__divider"></li>\n  <li data-tplHeading="partial" class="protoNav__nav-header">Partials</li>\n  <li class="protoNav__divider"></li>\n  <li data-tplHeading="area" class="protoNav__nav-header">Areas</li>\n  <li class="protoNav__divider"></li>\n</ul>';
  $navList = $(navList);
  $tplHeadingPage = $navList.find('[data-tplHeading="page"]');
  $tplHeadingFish = $navList.find('[data-tplHeading="fish"]');
  $tplHeadingBlock = $navList.find('[data-tplHeading="block"]');
  $tplHeadingPartial = $navList.find('[data-tplHeading="partial"]');
  $tplHeadingArea = $navList.find('[data-tplHeading="area"]');
  for (el in templates) {
    $li = $("<li class=\"" + (localStorage.getItem('defaultProto') === el ? 'active' : '') + "\"><a href=\"#\" data-render=\"" + el + "\">" + el + "</a></li>");
    switch (el.slice(0, 2)) {
      case "b-":
        $tplHeadingBlock.after($li);
        break;
      case "p-":
        $tplHeadingPartial.after($li);
        break;
      case "a-":
        $tplHeadingArea.after($li);
        break;
      default:
        $tplHeadingPage.after($li);
    }
  }
  for (el in gFish) {
    $li = $("<li class=\"" + (localStorage.getItem('defaultFish') === el ? 'active' : '') + "\"><a href=\"#\" data-fish=\"" + el + "\">" + el + "</a></li>");
    $tplHeadingFish.after($li);
  }
  navtpl = '<div class=\'protoNav__modal\' id="protoNav">\n  <div class="protoNav__modal-header">\n    <div class="protoNav__close">&times;</div>\n    <h3>Set default view</h3>\n  </div>\n  <div class="protoNav__modal-body"></div>\n</div>';
  $navtpl = $(navtpl);
  $navtpl.find('.protoNav__modal-body').append($navList);
  $doc.on('keydown', function (e) {
    if (parseInt(e.which, 10) === 27) {
      return $('#protoNav').remove();
    }
  });
  setDefaultProto = function (tpl) {
    return localStorage.setItem('defaultProto', tpl);
  };
  setDefaultFish = function (fish) {
    return localStorage.setItem('defaultFish', fish);
  };
  showProtoNav = function () {
    $('#protoNav').remove();
    $layout.append($navtpl);
    $('#protoNav').on('click', '.protoNav__close', function () {
      return $('#protoNav').remove();
    });
    $layout.on('click', '[data-render]', function () {
      var tpl;
      tpl = $(this).data('render');
      setDefaultProto(tpl);
      return window.location.reload();
    });
    return $layout.on('click', '[data-fish]', function () {
      var fish;
      fish = $(this).data('fish');
      setDefaultFish(fish);
      return window.location.reload();
    });
  };
  TapTimer = (function () {

    function TapTimer() {}

    TapTimer.prototype.taps = 0;

    TapTimer.prototype.tap = function () {
      var timer,
        _this = this;
      if (this.taps === 4) {
        showProtoNav();
        return this.taps = 0;
      } else {
        clearTimeout(timer);
        timer = setTimeout((function () {
          return _this.taps = 0;
        }), 700);
        return this.taps++;
      }
    };

    return TapTimer;

  })();
  $doc.on('keydown', function (e) {
    if (e.which === 88 && e.ctrlKey && e.shiftKey) {
      return showProtoNav();
    }
  });
  tapTimer = new TapTimer;
  if (typeof addEventListener !== "undefined" && addEventListener !== null) {
    return document.addEventListener('touchstart', function (e) {
      return tapTimer.tap();
    });
  }
})();

window.protoRender = function (name, context) {
  var $layout, el, _results;
  if (context == null) {
    context = (typeof fish !== "undefined" && fish !== null ? fish.main : void 0) != null ? main : '';
  }
  context = gFish[context];
  $layout = $('.w-layout');
  if ((name != null)) {
    return $layout.html(templates[name].render(context, templates));
  } else {
    _results = [];
    for (el in templates) {
      _results.push($layout.html(templates[el].render(context, templates)));
    }
    return _results;
  }
};
