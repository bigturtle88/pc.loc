<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Deadline;
use yii\web\Response;

class CommentController extends ActiveController {

    public $modelClass = 'app\models\Comment';

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
        $deadlineId = (int) \Yii::$app->request->get('id', 0);
       $query  = new \yii\db\Query();

        $comments = $query->select(['comments.id', 'comments.name', 'comments.text', 'comments.date_create'])
                ->from('comments')
                ->where(['`deadline_id`' => $deadlineId])
                ->all();


        return $comments;
    }

}
