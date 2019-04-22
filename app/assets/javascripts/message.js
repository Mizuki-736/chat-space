$(document).on('turbolinks:load', function(){
  $(function(){
    // console.log(location.pathname.split('/')[2]);
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

    function scrollBottom(){ //ページ下部へスクロールする関数
      $('.content__messages').animate({scrollTop: $('.content__messages')[0].scrollHeight}, 'fast');
    };

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
      .done(function(data){ //成功時処理
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.form__message').val(''); //フォームデータリセット
        $('.hidden').val(''); //imageデータリセット
        scrollBottom();
        $(".form__submit").prop('disabled', false); //送信ボタンを何度も押せるように
      })
      .fail(function(){ //失敗時処理
        alert('エラーが発生したためメッセージ送信ができませんでした');
      })
    });
    //自動更新
    var reloadMessages = function() {
      var last_message_id = $(".message").last().data('message-id')
      var groupId = location.pathname.split('/')[2]
      console.log(groupId)//id取得を確認
      console.log(last_message_id)
      $.ajax({
        url:      `/groups/${groupId}/api/messages`,
        type:     'GET',
        dataType: 'json',
        data:     {id: last_message_id }
      })
      .done(function(messages) {
        console.log('success');
      })
      .fail(function(){
        console.log('error');
      });
    };
    setInterval(reloadMessages, 5000);
  });
});
