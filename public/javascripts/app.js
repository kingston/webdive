$(function() {
});

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

