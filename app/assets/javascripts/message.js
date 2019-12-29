$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = 
       `<div class="chat-main__message-list__message">
          <div class="chat-main__message-list__message__tag">
            <div class="chat-main__message-list__message__tag__name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__message__tag__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__message__content">
            <p class="chat-main__message-list__message__content__text">
              ${message.text}
            </p>     
            <img class="chat-main__message-list__message__content__imarge" src=${message.image} alt="画像">
          </div>
        </div>`
    } else {
      var html = 
       `<div class="chat-main__message-list__message">
          <div class="chat-main__message-list__message__tag">
            <div class="chat-main__message-list__message__tag__name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__message__tag__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__message__content">
            <p class="chat-main__message-list__message__content__text">
              ${message.text}
            </p>       
          </div>
        </div>`
    }
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.chat-main__message-form__box__send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.chat-main__message-form__box__send-btn').prop('disabled', false);
    })
  });
});