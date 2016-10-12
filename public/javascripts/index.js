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
    alert(`The title is now: ${title}`)
  });

});
