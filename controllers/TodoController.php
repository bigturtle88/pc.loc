<?php

namespace app\controllers;

use Yii;

use yii\web\Controller;
use app\models\Deadline;
class TodoController extends Controller {

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex() {
        
      $modelDeadline = new Deadline();
        return $this->render('index',['model'=>$modelDeadline]);
        
    }

}
