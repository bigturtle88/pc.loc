<?php

namespace app\components;

use Yii;
use yii\base\Widget;
use yii\helpers\Html;
use yii\widgets\ActiveForm;
use yii\helpers\Url;
 

class CreateComment extends Widget {

  public $text;
  public $name;
  public $model = false;

  public function init() {

    parent::init();
  }

  public function run() {

    $form = ActiveForm::begin([
      'id' => 'AddCommentForm',
      'options' => ['class' => 'panel-body', 'onsubmit' => "return false"]]);

    echo $form->field($this->model, 'name')->input('name')
      ->label('Name');
    
    echo $form->field($this->model, 'text')->input('text')
      ->label('Text Comment');

   

    echo Html::submitButton('Add Comment', ['class' => 'btn btn-info', 'onClick' => 'AppTodo.CreateComment($("#AddCommentForm"));']);

    ActiveForm::end();
  }

}
