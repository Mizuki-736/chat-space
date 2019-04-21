$(function(){
  $(".chat-group-form__input").on("keyup", function(e){
    var input = $(".chat-group-form__input").val(); //val()でフォームの値を取得
    $.ajax({
      type: 'GET',
      url: '/users/index',
      data: { keyword: input },
      dataType: 'json'
    })
  });
});
