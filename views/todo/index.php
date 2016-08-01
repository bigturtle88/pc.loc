<?php

use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\Pjax;

/* @var $this yii\web\View */

$this->title = 'Todo task';
?>
<div class="site-index">

    <div class="jumbotron">
        <?php Pjax::begin(); ?>    <?=
        GridView::widget([
            'dataProvider' => $dataProvider,
            'filterModel' => $searchModel,
            'columns' => [
                ['class' => 'yii\grid\SerialColumn'],
                ['class' => 'yii\grid\CheckboxColumn'],
                'text:ntext',
                'deadline_date',
               // ['class' => 'yii\grid\ActionColumn'],
            ],
        ]);
        ?>
<?php Pjax::end(); ?></div>


</div>

<div class="body-content">

    <div class="row">

    </div>

</div>
</div>
