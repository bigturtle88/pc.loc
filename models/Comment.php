<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

class Comment extends ActiveRecord
{
   
    
    public static function tableName() {
    
        return 'comments';
      
    }
      /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // text and name are both required
            [['text','name'], 'required'],
         
          ];
    }
    
  
}
