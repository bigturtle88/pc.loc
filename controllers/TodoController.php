<?php

namespace app\controllers;

use Yii;

use yii\web\Controller;
use app\models\DeadlineSearch;
use app\models\Deadline;
class TodoController extends Controller {

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex() {
                
        return $this->render('index');
        
    }

}
