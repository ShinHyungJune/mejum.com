<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string("idx")->index();
            $table->unsignedBigInteger("target_id");
            $table->foreign("target_id")->references("id")->on("targets")->onDelete("cascade");
            $table->string("comment_idx")->nullable()->index();
            $table->string("url")->nullable();
            $table->string("thumbnail")->nullable();
            $table->string("nickname")->index();
            $table->text("body");
            $table->string("next_page_token")->nullable();
            $table->dateTime("commented_at")->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
