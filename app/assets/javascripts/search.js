$(function(){
  $(".chat-group-form__input").on("keyup", function(e){
    var input = $(".chat-group-form__input").val(); //val()でフォームの値を取得
    console.log(input);
  });
});
