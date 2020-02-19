$(function(){ 
    function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="message">
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
        `<div class="message">
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
      return html;
    };
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
});