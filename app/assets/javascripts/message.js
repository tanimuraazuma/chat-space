$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="message data-message-id= message.id ">
          <div class="message-info">
            <p class="message-name">
              ${message.user_name}
            </p>
            <p class="message-time">
              ${message.created_at}
            </p>
          </div>
          <p class="message-text">
            ${message.content}
          </p>
          <img class="message_image" src=${message.image} alt="%e5%86%99%e7%9c%9f">
        </div>`
      return html;
    } else {
      var html =
        `<div class="message data-message-id= message.id">
          <div class="message-info">
            <p class="message-name">
              ${message.user_name}
            </p>
            <p class="message-time">
              ${message.created_at}
            </p>
          </div>
          <p class="message-text">
            ${message.content}
          </p>
        </div>`
      
    };
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);  
      $('form')[0].reset();  
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
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
       $('.messages').append(insertHTML);
       $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 7000);
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});