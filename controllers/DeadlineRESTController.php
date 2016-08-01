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
  
}
