<?php

namespace app\controllers;

use Yii;
use yii\rest\ActiveController;
use app\models\Deadline;
use yii\web\Response;

class DeadlineController extends ActiveController
{
 
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
    
    $query =  new \yii\db\Query();
    $subQuery = new \yii\db\Query();
    
    $comments_count = $subQuery->select('COUNT(comments.deadline_id )')
      ->where(['comments.deadline_id' =>  'deadline.id'])
      ->from('comments');
    
    $task = $query->select(['deadline.id','deadline.text','deadline.status','deadline.deadline_date','comments_count' => $comments_count])
      ->where(['deadline.status' =>  1])
      ->from('deadline')
      ->all(); 
    
  //  $task = $query->createCommand()->sql;var_dump($task);die();
    
    $taskUncheked = $query->select(['deadline.id','deadline.text','deadline.status','deadline.deadline_date','comments_count' => $comments_count])
      ->where(['deadline.status' =>  '0'])
      ->from('deadline')
      ->orderBy(['deadline.deadline_date' => SORT_ASC])
      ->all();
        
    return    $task + $taskUncheked;
  }
}
