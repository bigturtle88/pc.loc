<?php

use yii\db\Migration;

class m160801_183003_deadline extends Migration
{
    public function up()
    {
        $this->createTable('deadline', [
            'id' => $this->primaryKey(),
            'status' => $this->boolean(),
            'text' => $this->text(),
            'deadline_date' => $this->date(),
        ]);
        
    }

    public function down()
    {
        $this->dropTable('deadline');
    }

    /*
    // Use safeUp/safeDown to run migration code within a transaction
    public function safeUp()
    {
    }

    public function safeDown()
    {
    }
    */
}
