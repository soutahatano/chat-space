$(function() {

  function  appendusers(user){
    let html = `
      <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
      `;
    $("#user-search-result").append(html);
  }

  function appendErrMsgToHTML(msg) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ msg }</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
      <div class="chat-group-user clearfix" id="${id}">
        <p class="chat-group-user__name">${name}</p>
        <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
      </div>
    `;
    $(".js-add-user").append(html);
  }

  function addMember(userId) {
    let html = `
      <input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />
    `;
    $(`#${userId}`).append(html);
  }

  $("#user-search-field").on("keyup", function() {
    let input = $(this).val();
    var user_ids = [];
    var ids = $('input[name="group[user_ids][]"]');
    var len = ids.length;
    for(var i = 0; i < len; i++){
      user_ids.push(ids[i].value);
    }
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input, ids: user_ids},
      dataType: "json"
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (input == ''){
        return false;
      } else {
        if (users.length !== 0) {
          users.forEach(function(user){
            appendusers(user);
          });
        } else {
          appendErrMsgToHTML("ユーザーが見つかりません");
        }
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });

  $(document).on("click", ".chat-group-user__btn--add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });

  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this).parent().remove();
  });
});