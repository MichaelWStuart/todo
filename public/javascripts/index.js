$(function() {
  let title = 'TODO LIST';

  $('.item span').on('click', function() {
    const todoID = this.id;
    const newStatus = !(JSON.parse($(this).data('completed')));
    const $listSpan = $(this);
    $.ajax({
      url: `/todos/${todoID}`,
      method: 'PUT',
      data: {complete: newStatus}
    })
    .done(function(response) {
      $listSpan.toggleClass('complete');
    });
  });

  $('.title input').blur(function() {
    title = $('.title input').val();
  });

  $('.save').on('click', function() {
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
