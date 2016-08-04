/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var AppTodo = {
    defaultUrl: 'http://' + window.location.hostname,
    restUrl: 'http://' + window.location.hostname + '/web/deadlines',
    init: function () {
        var _this = this;
        _this.InitTodo(_this);
    },
    conversionREST: function (form) {
        var o = {};
        var a = $(form).serializeArray();
        var nameArray = {};
        $.each(a, function () {
            if (this.name !== '_csrf') {
                nameArray = this.name.split(/\[(.*?)\]/);
            }
            if (o[this.name !== undefined]) {
                if (!o[this.name.push]) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name.push](this.value || '');
            } else {
                o[nameArray[1]] = this.value || '';
            }
        });
        return o;
    },
    InitTodo: function (_this) {

        _this.TodoIndex(_this);
        $(document).on('click', '.glyphicon-unchecked', _this.InitCheckedDeadline.bind(event));
        $(document).on('click', '.glyphicon-check', _this.InitUncheckedDeadline.bind(event));
    },
    TodoIndex: function (_this) {
        $.ajax({
            method: 'GET',
            url: _this.restUrl,
            dataType: 'json',
            //  data: this.conversionREST(form),
            success: function (data, textStatus, jqXHR) {
                _this.TodoRender(data);
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
        $("#todoTable").html('');
        $.each(data, function (key, val) {

            stylCheckedState = (val.status == 1) ? styleChecked : styleUnchecked;
            //   console.log(val);
            var checked = 'glyphicon glyphicon-check';
            $("#todoTable").append('<li data-id="' + val.id + '">\n\
                            <div class="panel panel-success">\n\
                            <div class="panel-body">\n\
                            <div class="col-xs-2"><a href="#" >\n\
                            <span class="' + stylCheckedState + '"   data-id="' + val.id + '">\n\
                            </span></a></div><div class="col-xs-5">' + val.text + '</div>\n\
                            <div class="col-xs-3">' + val.deadline_date + '</div>\n\
                            <div class="col-xs-2"><span class="badge">' + val.comments_count + '</span></div></div>\n\
                            </div></li>');
        }
        )
    },
    CreateDeadline: function (data) {

        console.log(AppTodo.conversionREST(data));
        $.ajax({
            method: 'POST',
            url: AppTodo.restUrl,
            dataType: 'json',
            data: AppTodo.conversionREST(data),
            success: function (data, textStatus, jqXHR) {

                console.log("Ok: AddDeadline");
                  AppTodo.init();
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log("Error: AddDeadline");
            }
        });
        
    },
    UpdateDeadline: function (id, status) {
        var _status = {};
        _status['status'] = JSON.stringify(status);
        $.ajax({
            method: 'PUT',
            url: AppTodo.restUrl + '/' + id,
            dataType: 'json',
            data: _status,
            success: function (data, textStatus, jqXHR) {

                console.log("Ok: AddDeadline");
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log("Error: AddDeadline");
            }
        })
    },
    InitUncheckedDeadline: function (event) {

        var target = $(event.target);
        var id = target.attr('data-id');
        var status = 0;
        console.log(id);
        AppTodo.UpdateDeadline(id, status);
         AppTodo.init();
    },
    InitCheckedDeadline: function (event) {

        var target = $(event.target);
        var id = target.attr('data-id');
        var status = 1;
        console.log(id);
  

        AppTodo.UpdateDeadline(id, status);
        AppTodo.init();
    }
}
AppTodo.init();