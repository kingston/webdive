var classes = {
  "web": {
    title: "Basics of HTML/CSS",
    folder: "web",
    lessons: [{
      name: "basics",
      title: "HTML Basics"
    },{
      name: "document",
      title: "HTML Document"
    },{
      name: "cssbasics",
      title: "CSS Basics"
    },{
      name: "usingcss",
      title: "Using CSS",
    },{
      name: "advancedcss",
      title: "Advanced CSS"
    },{
      name: "htmlplus",
      title: "More HTML"
    }]
  },
  "js": {
    title: "Javascript Deep Dive",
    folder: "js",
    lessons: [{
      name: "basics",
      title: "The Basics"
    },{
      name: "patterns",
      title: "Common Patterns"
    },{
      name: "node",
      title: "Node.js"
    },{
      name: "express",
      title: "Express"
    },{
      name: "mongo",
      title: "Mongo DB"
    },{
      name: "mongoose",
      title: "Mongoose"
    }]
  }
}

function findLessonInClass(classData, lessonName) {
  for (var i = 0; i < classData.lessons.length; i++) {
    if (classData.lessons[i].name === lessonName) {
      return classData.lessons[i];
    }
  }
  return null;
}

function buildBreadcrumbs(classData, lessonName) {
  var breadcrumbs = []
  for (var i = 0; i < classData.lessons.length; i++) {
    var entry = {
      url: "/c/" + classData.folder + "/" + classData.lessons[i].name,
      name: classData.lessons[i].title,
      isActive: ""
    };
    breadcrumbs.push(entry);
    if (classData.lessons[i].name === lessonName) {
      entry.isActive = "active";
      break;
    }
  }
  return breadcrumbs;
}

function getNextLink(classData, lessonName) {
  for (var i = 0; i < classData.lessons.length; i++) {
    if (classData.lessons[i].name === lessonName && i + 1 < classData.lessons.length) {
      return "/c/" + classData.folder + "/" + classData.lessons[i + 1].name;
    }
  }
  return null;
}

exports.showClass = function(req, res) {
  var className = req.params['className'];
  var lessonName = req.params['lessonName'];
  // get class
  if (!(className in classes)) {
    //TODO: Render 404
    res.end();
    return;
  }
  var classData = classes[className];
  var lessonData = findLessonInClass(classData, lessonName);
  if (lessonData === null) {
    //TODO: Render 404
    res.end();
    return;
  }
  var breadcrumbs = buildBreadcrumbs(classData, lessonName);

  var viewData = {
    title: classData.title,
    className: classData.title,
    lessonName: lessonData.title,
    breadcrumbs: breadcrumbs,
    nextLink: getNextLink(classData, lessonName)
  }
  res.render(classData.folder + "/" + lessonData.name, viewData);
}
