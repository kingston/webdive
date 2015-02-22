//window.exports = {};
//window.exports['prettyLoaded'] = function () {
  //addAnnotations();
//};

$(function() {
  prettyPrint();
  addAnnotations();
});

function addAnnotations() {
  $(".annotation").each(function(i) {
    var annotation = $(this);
    var lineNum = annotation.attr("data-line");
    if (!lineNum) return;
    var lineElem = annotation.siblings("pre").find("ol li:nth-child(" + lineNum + ")")

    var activate = function() {
      lineElem.css('border', "1px solid #999");
      lineElem.css('background-color', "#333");
      lineElem.css('padding', "0");
      annotation.addClass('active');
    };

    var deactivate = function() {
      lineElem.css('border', "");
      lineElem.css('background-color', "");
      lineElem.css('padding', "1px");
      annotation.removeClass('active');
    };

    lineElem.hover(activate, deactivate);
    annotation.hover(activate, deactivate);
  });
}

var languages = ['html', 'css', 'js'];

var tryItVersion = 0;

var TryItWidget = function($elem) {
  var widget = {};

  tryItVersion += 1;

  // load data and lock in the element
  var contents = {};
  var readonly = {};
  var editors = {};

  languages.forEach(function(lang) {
    if ($elem.find("." + lang).length > 0) {
      contents[lang] = $elem.find("." + lang).text();
      readonly[lang] = $elem.find("." + lang).hasClass('readonly');
    }
  });

  var tests = $elem.find(".tests").text();

  // clear element and replace with template
  $elem.html($("#tryit-template").html());

  // fill in tabs
  var activated = false;
  languages.forEach(function(lang) {
    var link = $elem.find("." + lang + "-link");
    if (!(lang in contents)) {
      link.parent().hide();
      return;
    }
    var tab = $elem.find("." + lang + "-tab");
    var pre = tab.find("pre");
    tab.attr('id', lang + "-tab-" + tryItVersion);

    link.attr('href', "#" + tab.attr('id'));
    pre.text(contents[lang]);
    pre.attr('id', lang + "-editor-" + tryItVersion);

    var editor = ace.edit(pre.attr('id'));
    editor.setTheme("ace/theme/twilight");
    var acelang = lang.replace("js", "javascript");
    editor.getSession().setMode("ace/mode/" + acelang);
    if (readonly[lang]) {
      editor.setReadOnly(true);
      link.text(link.text() + " (locked)");
    }
    editors[lang] = editor;

    if (!activated) {
      link.parent().addClass("active");
      tab.addClass("active");
      activated = true;
    }
  });

  var testElem = $elem.find(".tryit-tests");
  if (tests) {
    testElem.show();
    testElem.find('ul').attr('id', 'tryit-tests-' + tryItVersion);
  }

  var autoPreview = false;

  if ($elem.hasClass('auto-update')) {
    autoPreview = true;
  }

  var autoPreviewCheckbox = $elem.find(".auto-preview");
  autoPreviewCheckbox.get(0).checked = autoPreview;
  autoPreviewCheckbox.change(function() {
    if (autoPreviewCheckbox.get(0).checked) {
      autoPreview = true;
      widget.preview();
    } else {
      autoPreview = false;
    }
  });

  $elem.find(".tab-content pre").keyup(function() {
    if (autoPreview) widget.preview();
  });

  $elem.find(".tryit-preview .btn").click(function() {
    widget.preview();
  });

  widget.preview = function() {
    var output = "";
    if ('css' in editors) {
      output += "<style type='text/css'>" + editors['css'].getValue() + "</style>";
    }
    if ('js' in editors) {
      output += "<script type='text/javascript'>" + editors['js'].getValue() + "</script>";
    }
    if (tests) {
      output += "<script src='/javascripts/jquery.min.js'></script>";
      output += "<script src='/javascripts/xtests.js'></script>";
      output += "<script type='text/javascript'>xtests.setup('" + testElem.find('ul').attr('id') + "');</script>";
      output += "<script type='text/javascript'>" + tests + "</script>";
    }
    if ('html' in editors) {
      output += editors['html'].getValue();
    }
    $elem.find(".tryit-iframe iframe").get(0).srcdoc = output;
  }

  widget.preview();

  return widget;
}

$(function() {
  $(".tryit-widget").each(function(idx, el) {
    TryItWidget($(el));
  });
});
