<?php

use yii\helpers\Html;
use app\components\CreateComment;

/* @var $this yii\web\View */

$this->title = 'Todo task';
?>
<div class="site-index">
</div>

<div class="body-content">

  <div class="row">
    <div class="col-xs-5 text-center">
      <div id="deadlineView" class="list-unstyled">


      <div>

      <?=
      CreateComment::widget([
        'model' => $model,
      ]);
      ?>
    </div>
  </div>

</div>
</div>
