/* simple testing framework for TryIt widget */

window.xtests = {
  tests: [],
  setup: function(parentId) {
    this.parentId = parentId;
  },
  add: function(text, selectorOrFunc, contents) {
    var func;
    if (typeof(selectorOrFunc) !== 'function') {
      func = function() {
        if ($(selectorOrFunc).length == 0) return false;
        if (contents && $(selectorOrFunc).text() !== contents) return false;
        return true;
      };
    } else {
      func = selectorOrFunc;
    }
    this.tests.push({
      text: text,
      test: func
    });
  },
  run: function() {
    parentUl = parent.document.getElementById(this.parentId);
    var newUl = $("<ul />");
    this.tests.forEach(function(test) {
      var newLi = $("<li />");
      if (test.test()) {
        newLi.addClass("success");
      } else {
        newLi.addClass("error");
      }
      newLi.text(test.text);
      newUl.append(newLi);
    });
    parentUl.innerHTML = newUl.html();
  }
}

$(function() { window.xtests.run(); });
