<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model app\models\Deadline */

$this->title = 'Create Deadline';
$this->params['breadcrumbs'][] = ['label' => 'Deadlines', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="deadline-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
