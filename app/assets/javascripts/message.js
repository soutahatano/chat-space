$(function(){

  function buildHTML(message){
    if (message.image && message.text) {
      var html = 
       `<div class="chat-main__message-list__message" data-message-id = ${message.id}>
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
    } else if (message.image) {
      var html = 
       `<div class="chat-main__message-list__message" data-message-id = ${message.id}>
          <div class="chat-main__message-list__message__tag">
            <div class="chat-main__message-list__message__tag__name">
              ${message.user_name}
            </div>
            <div class="chat-main__message-list__message__tag__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__message-list__message__content">
            <img class="chat-main__message-list__message__content__imarge" src=${message.image} alt="画像">
          </div>
        </div>`
    } else {
      var html = 
       `<div class="chat-main__message-list__message" data-message-id = ${message.id}>
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

  function reloadMessages(){
    last_message_id = $('.chat-main__message-list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        $('#new_message')[0].reset();
        $('.chat-main__message-form__box__send-btn').prop('disabled', false);
      }
    })
    .fail(function() {
      alert("自動更新に失敗しました");
    });
  };

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
      $('#new_message')[0].reset();
      $('.chat-main__message-form__box__send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.chat-main__message-form__box__send-btn').prop('disabled', false);
    })
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});