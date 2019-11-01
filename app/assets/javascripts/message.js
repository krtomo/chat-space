$(function () {

  var reloadMessages = function () {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.message').last().data('id');
    let href = window.location.href.replace('/messages', '/api/messages');
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: href,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'GET',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: { id: last_message_id }
    })
      .done(function (messages) {
        console.log('success');
      })
      .fail(function () {
        console.log('error');
      });
  };

  function buildHTML(message) {
    let image = message.image.url ?
      `<img class="message__content__image" src=${message.image.url} alt="Fruits"></img>` : "";

    let body = message.body ?
      `<p class="message__content__text">
        ${message.body}
      </p>` : "";

    let html = `<div class="message">
                <div class="message__info">
                  <div class="message__info__speaker">
                    ${message.user_name}
                  </div>
                  <div class="message__info__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message__content">
                  ${body}
                  ${image}
                </div>
              </div>`;
    return html;
  }
  // formタグ全体を指定
  $('.post').on('submit', function (e) {
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    var href = window.location.href;  // => /groups/:id/messages
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    }
    ).done(function (data) {
      let html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      // リセットはformタグ全体に
      $('.post')[0].reset();
    }).fail(function () {
      alert('メッセージを入力してください');
    })
    return false;
  })
})

