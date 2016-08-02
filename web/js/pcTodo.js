/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var AppTodo = {
  init: function () {

    this.InitTodo();

  },
  InitTodo: function () {

    var defaultUrl = 'http://' + window.location.hostname;
    var restUrl = defaultUrl + '/web/deadlines';

    this.TodoAjaxView(restUrl);

  },
  TodoAjaxView: function (restUrl) {
    $.ajax({
      method: 'GET',
      url: restUrl,
      dataType: 'json',
      //  data: this.conversionREST(form),
      success: function (data, textStatus, jqXHR) {

        AppTodo.TodoRender(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {

        console.log("Error: TodoAjaxView");
      }
    })
  },
  TodoRender: function (data) {

    var styleChecked = 'glyphicon glyphicon-check';
    var styleUnchecked = 'glyphicon glyphicon-unchecked';
    var stylCheckedState = null;

    $.each(data, function (key, val) {

      stylCheckedState = (val.status == 1) ? styleChecked : styleUnchecked;

      console.log(val);
      var checked = 'glyphicon glyphicon-check';
      var checked = 'glyphicon glyphicon-check';
      $("#todoTable").append('<li data-id="' + val.id + '">\n\
                            <div class="panel panel-success">\n\
                            <div class="panel-body">\n\
                            <div class="col-xs-2"><span class="' + stylCheckedState + '" class="checked" data-id="' + val.id + '">\n\
                            </span></div><div class="col-xs-5">' + val.text + '</div>\n\
                            <div class="col-xs-3">' + val.deadline_date + '</div>\n\
                            <div class="col-xs-2"><span class="badge">' + val.comments_count + '</span></div></div>\n\
                            </div></li>');


    }

    )


  }


}
AppTodo.init();