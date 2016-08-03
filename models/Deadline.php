<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

class Deadline extends ActiveRecord
{
   
    
    public static function tableName() {
    
        return 'deadline';
      
    }
      /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // text and deadline_date are both required
            [['text','deadline_date'], 'required'],
             ['status', 'default', 'value' => 0],
          ];
    }
    
  
}
