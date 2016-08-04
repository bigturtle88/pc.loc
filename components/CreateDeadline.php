<?php

namespace app\components;

use Yii;
use yii\base\Widget;
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\helpers\Url;
use dosamigos\datepicker\DatePicker;

class CreateDeadline extends Widget {

  public $text;
  public $date;
  public $model = false;

  public function init() {

    parent::init();
  }

  public function run() {

    $form = ActiveForm::begin([
      'id' => 'AddDeadlineForm',
      'options' => ['class' => 'panel-body', 'onsubmit' => "return false"]]);

    echo $form->field($this->model, 'text')->input('text')
      ->label('Text Deadline');

    echo $form->field($this->model, 'deadline_date')->widget(
      DatePicker::className(), [
      // inline too, not bad
      'inline' => false,
      // modify template for custom rendering
      // 'template' => '<div class="well well-sm" style="background-color: #fff; width:250px">{input}</div>',
      'clientOptions' => [
        'autoclose' => false,
        'format' => 'yyyy-mm-dd'
      ]
    ]);

    echo Html::submitButton('Add Deadline', ['class' => 'btn btn-info', 'onClick' => 'AppTodo.CreateDeadline($("#AddDeadlineForm"));']);

    ActiveForm::end();
  }

}
