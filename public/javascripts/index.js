$(function() {

  const handleDeleteTodo = (event) => {
    event.preventDefault();
    $(event.target).parent('li.todo').remove();
  };

  $('form.new').on('submit', function(event) {
    event.preventDefault();
    const todoText = $(event.target).find('input').val();
    const todo = `<li class='todo item'><form><button class='fabutton delete'><i class='fa fa-trash'></i></button><span>${todoText}</span></form></li>`;
    const $ul = $('ul.items');
    $ul.append(todo);
    const deleteButton = $ul.find('.todo form');
    deleteButton.on('submit', handleDeleteTodo);
  });

  $('.save').on('click', function(event){
    event.preventDefault();
    const todos = []
    $('.todo').each(function(index){
      todos.push({content: $(this).find('span').text()});
    });
    $.ajax({
      url: '/lists',
      method: 'POST',
      data: {
        listTitle: $('.title input').val(),
        todos: todos
      }
    })
    .done(function(response){
      window.location.href = `/lists/${response}`;
    });
  });
});
