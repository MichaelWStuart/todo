$(function() {
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
});
