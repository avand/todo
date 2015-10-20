window.db = JSON.parse(localStorage.getItem("db") || "[]");
window.currentTodoId = localStorage.getItem("currentTodoId");

function getCurrentTodo() {
  if (window.currentTodoId) {
    return findFirstTodoBy("id", window.currentTodoId);
  } else {
    return null;
  }
}

function setCurrentTodo(todo) {
  if (todo) {
    window.currentTodoId = todo.id;
    localStorage.setItem("currentTodoId", todo.id);
  } else {
    window.currentTodoId = null;
    localStorage.removeItem("currentTodoId");
  }
}

function findFirstTodoBy(prop, value) {
  for (var i = 0; i < db.length; i++) {
    if (db[i][prop] == value) {
      return db[i];
    }
  }

  return null;
}

function findAllTodosBy(prop, value) {
  var todos = [];

  db.forEach(function(todo) {
    if (todo[prop] == value) {
      todos.push(todo);
    }
  })

  return todos;
}

function findRootTodos() {
  return findAllTodosBy("parentId", null);
}

function newTodo(name, parent) {
  return {
    id: guid(),
    name: name,
    completedAt: null,
    parentId: parent ? parent.id : null
  };
}

function createTodo(name, parent) {
  var todo = newTodo(name, parent);
  db.push(todo);
  localStorage.setItem("db", JSON.stringify(db));
  return todo;
}
