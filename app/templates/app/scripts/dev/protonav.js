'use strict';
//TODO rewrite protonav

function protoNav() {
  var $body = $('body');
  var $doc = $(document);

  $body.append('<style>\n\n.protoNav__modal {\n  box-sizing: border-box;\n  position: fixed;\n  width: 100%;\n  height: auto;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  margin-left: 0;\n  background: white;\n  border: 1px solid #ccc;\n  box-shadow: 0 10px 20px rgba(0,0,0,.4);\n  border-radius: 4px;\n  font-size: 16px;\n  line-height: 20px;\n  font-family: Tahoma, Arial, sans-serif;\n  box-sizing: border-box;\n  z-index: 10000;\n}\n\n.protoNav__modal * {\n box-sizing: border-box;\n}\n\n.protoNav__modal-header h3 {\n  font-size: 25px;\n  line-height: 30px;\n  margin: 0 0 0.8em;\n}\n\n.protoNav__close {\n  float: right;\n  padding: 30px;\n  margin: -30px;\n  font-size: 35px;\n  color: red;\n  font-weight: bold;\n  opacity: .3;\n  cursor: pointer;\n}\n.protoNav__close:hover {\n opacity: 1;\n}\n\n.protoNav__modal-body {\n  overflow: auto;\n  max-height: 600px;\n  max-height: 95vh;\n}\n\n.protoNav__nav {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.protoNav__nav-header {\n  font-size: 20px;\n  margin: 0 0 .5em !important;\n}\n\n.protoNav__nav li {\n margin: 0;\n}\n\n.protoNav__nav li a {\n  display: block;\n  padding: 8px;\n  text-decoration: none;\n  color: #40a2ff;\n  border-radius: 4px;\n}\n\n.protoNav__nav li a:hover {\n  color: white !important;\n  background: #40a2ff !important;\n}\n\n.protoNav__nav li.active a {\n background: #dddddd;\n}\n\n.protoNav__nav-header {\n  margin: 0;\n}\n\nli.protoNav__divider {\n  background: #cccccc;\n  height: 1px;\n  margin: 15px 0;\n}\n\n</style>');

  var navList = '<ul class="protoNav__nav">\n  <li data-tplHeading="page" class="protoNav__nav-header">Pages</li>\n  <li class="protoNav__divider"></li>\n  <li data-tplHeading="fish" class="protoNav__nav-header">Fish</li>\n  <li class="protoNav__divider"></li>\n  <li data-tplHeading="block" class="protoNav__nav-header">Blocks</li>\n  <li class="protoNav__divider"></li>\n</ul>';
  var $navList = $(navList);
  var $tplHeadingPage = $navList.find('[data-tplHeading="page"]');
  var $tplHeadingState = $navList.find('[data-tplHeading="fish"]');
  var $tplHeadingBlock = $navList.find('[data-tplHeading="block"]');

  var populateNavEls = function (templates, $group) {
    for (var el in templates) {
      if (templates.hasOwnProperty(el)) {
        var $li = $(
          '<li class="' + (localStorage.getItem('defaultProto') === el ? 'active' : '') + '">' +
            '<a href="#" data-render="' + el + '">' + el + '</a></li>'
        );
        $group.after($li);
      }
    }
  };

  populateNavEls(devBlocks, $tplHeadingBlock);
  populateNavEls(devTemplates, $tplHeadingPage);

  for (var el in gState) {
    if (gState.hasOwnProperty(el)) {
      var $li = $('<li class="' + (localStorage.getItem('defaultFish') === el ? 'active' : '') + '"><a href="#" data-fish="' + el + '">' + el + '</a></li>');
      $tplHeadingState.after($li);
    }
  }

  var navtpl = '<div class=\'protoNav__modal\' id="protoNav">\n  <div class="protoNav__modal-header">\n    <div class="protoNav__close">&times;</div>\n    <h3>Set default view</h3>\n  </div>\n  <div class="protoNav__modal-body"></div>\n</div>';
  var $navtpl = $(navtpl);
  $navtpl.find('.protoNav__modal-body').append($navList);
  $doc.on('keydown', function (e) {
    if (parseInt(e.which, 10) === 27) {
      $('#protoNav').remove();
    }
  });


  var setDefaultProto = function (tpl) {
    localStorage.setItem('defaultProto', tpl);
  };

  var setDefaultFish = function (fish) {
    localStorage.setItem('defaultFish', fish);
  };

  var showProtoNav = function () {
    $('#protoNav').remove();

    $body.append($navtpl);

    $('#protoNav').on('click', '.protoNav__close', function () {
      $('#protoNav').remove();
    });

    $body

      .on('click', '[data-render]', function () {
        var tpl;
        tpl = $(this).data('render');
        setDefaultProto(tpl);
        window.location.reload();
      })

      .on('click', '[data-fish]', function () {
        var fish;
        fish = $(this).data('fish');
        setDefaultFish(fish);
        window.location.reload();
      });
  };

  var TapTimer = (function () {

    function TapTimer() {
      this.taps = 0;
    }

    TapTimer.prototype.tap = function () {
      var _this = this;
      var timer;
      if (this.taps === 4) {
        showProtoNav();
        this.taps = 0;
      } else {
        clearTimeout(timer);
        timer = setTimeout(function () {
          _this.taps = 0;
        }, 700);
        this.taps++;
      }
    };

    return TapTimer;

  })();

  var tapTimer = new TapTimer();

  if (typeof addEventListener !== 'undefined' && addEventListener !== null) {
    document.addEventListener('touchstart', function () {
      tapTimer.tap();
    });
  }

  $doc.on('keydown', function (e) {
    if (e.which === 88 && e.ctrlKey && e.shiftKey) {
      showProtoNav();
    }
  });
}
protoNav();


window.protoRender = function (templateName, context) {
  var $layout = $('.layout');
  context = gState[context];
  var templates = templateName in devTemplates ? devTemplates : devBlocks;
  var output = templates[templateName].render(context, devBlocks);
  $layout.html(output);
};
