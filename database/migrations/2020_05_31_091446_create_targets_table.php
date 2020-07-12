<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTargetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('targets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->enum("platform", [\App\Enums\PlatformType::getValues()]);
            $table->string("url");
            $table->string("idx")->nullable();
            $table->string("title")->nullable();
            $table->text("body")->nullable();
            $table->string("thumbnail")->nullable();
            $table->enum("state", [\App\Enums\StateType::getValues()])->default(\App\Enums\StateType::ONGOING);
            $table->timestamps();
            $table->softDeletes();
            $table->index(["user_id", "idx", "platform"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('targets');
    }
}
