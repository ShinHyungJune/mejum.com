<?php

use Illuminate\Database\Seeder;

class InitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $group = \App\Group::create([
            "title" => "임팩시스"
        ]);

        $users = \App\User::get();

        $group->users()->sync($users);
    }
}
