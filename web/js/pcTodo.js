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
    console.log(defaultUrl);
  }

}
AppTodo.init();