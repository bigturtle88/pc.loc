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
         
        this.TodoRender(data);
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
        
        
      }
    })

  },
  TodoRender: function () {


  }


}
AppTodo.init();