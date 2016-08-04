<?php

use yii\helpers\Html;
use app\components\CreateDeadline;

/* @var $this yii\web\View */

$this->title = 'Todo task';
?>
 
<div class="site-index">
</div>

<div class="body-content">

  <div class="row">
    <div class="col-xs-5 text-center">
      <ul id="todoTable" class="list-unstyled">


      </ul>

      <?=
      CreateDeadline::widget([
        'model' => $model,
      ]);
      ?>
    </div>
  </div>

</div>
</div>
