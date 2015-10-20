function displayTodo(todo) {
  var item = $("<li>").addClass("todo");
  var title = $("<span>").attr("contenteditable", true).text(todo.name);
  var addButton = $("<button>").text("Add");

  addButton.click(function(event) {
    displayTodos(findAllTodosBy("parentId", todo.id));
    updateBreadcrumbs(todo);
  });

  title.appendTo(item);
  addButton.appendTo(item);
  item.appendTo(list);
}

function displayTodos(todos) {
  list.empty();
  todos.forEach(displayTodo);
}

function updateBreadcrumbs(currentTodo) {
  breadcrumbs.empty();

  if (currentTodo) {
    addBreadcrumb(currentTodo);
    setCurrentTodo(currentTodo);
  }
}

function addBreadcrumb(todo) {
  var link = $("<a>").text(todo.name).attr("href", "#");
  var parent = findFirstTodoBy('id', todo.parentId);
  var children = findAllTodosBy('parentId', todo.parentId);

  link.click(function(event) {
    event.preventDefault();

    displayTodos(children);
    updateBreadcrumbs(parent);
    setCurrentTodo(parent);
  })

  link.prependTo(breadcrumbs);

  if (parent) {
    addBreadcrumb(parent);
  }
}

$(document).ready(function() {
  window.list = $("#todos");
  window.breadcrumbs = $("#breadcrumbs");

  var currentTodo = getCurrentTodo();

  if (currentTodo) {
    displayTodos(findAllTodosBy('parentId', currentTodo.id));
    updateBreadcrumbs(currentTodo);
  } else {
    displayTodos(findRootTodos());
  }

  $("#root").click(function(event) {
    event.preventDefault();

    setCurrentTodo(null);

    displayTodos(findRootTodos());
    updateBreadcrumbs();
  })


  $("#new-todo").submit(function(event) {
    event.preventDefault();

    var form = event.target;
    var value = form["new-todo"].value;

    if (value && value.length > 0) {
      var todo = createTodo(value, getCurrentTodo());
      displayTodo(todo);
      form.reset();
    }
  })
})
