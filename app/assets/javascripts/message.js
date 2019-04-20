$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(message){
      var image = ""
      message.image ? image = `<img class="lower-message__image" src="${message.image}">` : image = ""
      var html = `<div class="message__info" data-id="${message.id}">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="text">
                      ${message.content}
                    </p>
                    ${image}
                  </div>`;
      return html;
    }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        console.log(data.body)
        $(".form__submit").prop('disable', false);
        var html = buildHTML(data);
        $('.message').append(html);
      });
    });
  });
});
