<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Deadline;
use yii\web\Response;

class DeadlineController extends ActiveController {

    public $modelClass = 'app\models\Deadline';

    public function behaviors() {
        return [
            [
                'class' => \yii\filters\ContentNegotiator::className(),
                'only' => ['index', 'view', 'create', 'update', 'delete'],
                'formats' => [
                    'application/json' => \yii\web\Response::FORMAT_JSON,
                ],
            ],
        ];
    }

    public function actions() {
        $actions = parent::actions();
        unset($actions['index']);
        return $actions;
    }

    public function actionIndex() {

        $query1 = new \yii\db\Query();
  $query2 = new \yii\db\Query();

        $task = $query1->select(['deadline.id', 'deadline.text', 'deadline.status', 'deadline.deadline_date', 'COUNT(`comments`.`deadline_id`) AS comments_count'])
                ->from('deadline')
                ->join('LEFT JOIN', 'comments', '`deadline`.`id` = `comments`.`deadline_id`')
                ->where('`deadline`.`status` = 1')
                ->groupBy('deadline.id')
                ->all();


   
         $taskUncheked = $query2->select(['deadline.id', 'deadline.text', 'deadline.status', 'deadline.deadline_date', 'COUNT(`comments`.`deadline_id`) AS comments_count'])
                ->from('deadline')
                ->join('LEFT JOIN', 'comments', '`deadline`.`id` = `comments`.`deadline_id`')
                ->where('`deadline`.`status` = 0')
                ->groupBy('`deadline`.`id`')
                ->all();

        return $task + $taskUncheked;
    }

}
