<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('users')->insert([
            'name'           => 'John Doe',
            'username'       => 'john',
            'password'       => app('hash')->make('123'),
            'remember_token' => str_random(10),
        ]);
    }
}
