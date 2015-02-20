window.exports = {};
window.exports['prettyLoaded'] = function () {
  addAnnotations();
};

function addAnnotations() {
  $(".annotation").each(function(i) {
    var annotation = $(this);
    var lineNum = annotation.attr("data-line");
    if (!lineNum) return;
    var lineElem = annotation.siblings("pre").find("ol li:nth-child(" + lineNum + ")")

    var activate = function() {
      lineElem.css('border', "1px solid #999");
      lineElem.css('background-color', "#333");
      annotation.addClass('active');
    };

    var deactivate = function() {
      lineElem.css('border', "");
      lineElem.css('background-color', "");
      annotation.removeClass('active');
    };

    lineElem.hover(activate, deactivate);
    annotation.hover(activate, deactivate);
  });
}

var TryItWidget = function($elem) {
  var widget = {};
  var autoPreview = false;

  var autoPreviewCheckbox = $elem.find(".auto-preview");
  autoPreviewCheckbox.change(function() {
    if (autoPreviewCheckbox.get(0).checked) {
      autoPreview = true;
      widget.preview();
    } else {
      autoPreview = false;
    }
  });

  $elem.find(".tab-content textarea").keyup(function() {
    if (autoPreview) widget.preview();
  });

  $elem.find(".tryit-preview .btn").click(function() {
    widget.preview();
  });

  widget.preview = function() {
    var html = $elem.find(".tryit-html textarea").val();
    var css = $elem.find(".tryit-css textarea").val();
    var js = $elem.find(".tryit-js textarea").val();

    var output = "<style type='text/css'>" + css + "</style>";
    output += "<script type='text/javascript'>" + js + "</script>";
    output += html;
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
