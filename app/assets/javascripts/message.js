$(document).on('turbolinks:load', function(){
  $(function(){
    //HTML生成
    function buildHTML(message){ //messageをハッシュで取得してる
      var image = ""
      message.image ? image = `<img class="lower-message__image" src="${message.image}">` : image = ""
      var html = `<div class="message" data-message-id="${message.id}">
                    <div class="message__info" data-id="${message.id}">
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
                    </div>
                  </div>`;
      return html;
    }
    //ページ下部へスクロールする関数
    function scrollBottom(){
      $('.content__messages').animate({scrollTop: $('.content__messages')[0].scrollHeight}, 'fast');
    };
    //message送信時の非同期通信
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
      .done(function(data){ //成功時処理、引数にformDataが入ってる
        var html = buildHTML(data); //変数htmlに関数buildHTML(data)を代入
        $('.messages').append(html); //クラスに変数htmlを挿入してる
        $('#new_message')[0].reset(); //フォームデータリセット
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
      //ブラウザ上の最後のidを取得、classに注意、生成するhtmlに最新のidが無いと機能しない
      var groupId = location.pathname.split('/')[2]//group_idの取得
      $.ajax({
        url:      `/groups/${groupId}/api/messages`,// 変数使用時''でなく``を使う
        type:     'GET',
        dataType: 'json',
        data:     {id: last_message_id }
      })
      .done(function(messages) {
        var insertHTML = ''; //追加するHTMLの入れ物
        messages.forEach(function(message){ //配列の中身を一つずつ取り出す,map()でも良い？
          if(message.id > last_message_id){ //ブラウザ上のidとDBのidを比較
            insertHTML = buildHTML(message);//関数buildHTMLに配列の中身を一つずつ代入
            $('.messages').append(insertHTML);//message送信時と同じ
            scrollBottom();
          };
        });
      })
      .fail(function(){
        alert('error');
      });
    };
    //定期的に実行するメソッド
    setInterval(reloadMessages, 5000);
  });
});
