$(function() {
  let title = 'TODO LIST';

  $('.todo.item span').on('click', function(event) {
    event.preventDefault();
    const todoID = this.id;
    const newStatus = !($(this).hasClass('complete'));
    const $listSpan = $(this);
    $.ajax({
      url: `/todos/${todoID}`,
      method: 'PUT',
      data: {complete: newStatus}
    })
    .done(function(response) {
      $listSpan.toggleClass('complete', !response.complete);
    });
  });

  $('.title input').blur(function() {
    title = $('.title input').val();
  });

  $('.save').on('click', function(event) {
     event.preventDefault();
    $.ajax({
      url: '/list',
      method: 'POST',
      data: {title: $('.title input').val()}
    })
       .done(function() {
         window.location.reload();
         console.log('saved');
      });
  });

});
