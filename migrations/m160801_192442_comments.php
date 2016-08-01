<?php

use yii\db\Migration;

class m160801_192442_comments extends Migration {

    public function up() {
        $this->createTable('comments', [
            'id' => $this->primaryKey(),
            'deadline_id' => $this->integer(),
            'text' => $this->text(),
            'date_create' => $this->date(),
        ]);

        $this->createIndex('idx-comments-deadline_id', 'comments', 'deadline_id');
        $this->addForeignKey('fk-comments-deadline_id', 'comments', 'deadline_id', 'deadline', 'id', 'CASCADE');
    }

    public function down() {
        $this->dropTable('comments');
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
