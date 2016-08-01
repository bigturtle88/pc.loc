<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;
/* @var $this yii\web\View */
/* @var $searchModel app\models\DeadlineSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Deadlines';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="deadline-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    
<?php Pjax::begin(); ?>    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

             ['class' => 'yii\grid\CheckboxColumn'],
            'status',
            'text:ntext',
            'deadline_date',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>
<?php Pjax::end(); ?></div>
