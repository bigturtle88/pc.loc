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
        
        $searchModel = new DeadlineSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
                    'searchModel' => $searchModel,
                    'dataProvider' => $dataProvider,
        ]);
        return $this->render('index');
    }

}
