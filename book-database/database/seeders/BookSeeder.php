<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('books')->insert([
            ['title' => 'Sample Book 1', 'author' => 'Author 1', 'published_year' => 2001, 'genre' => 'Fiction', 'description' => 'A description.'],
            
        ]);
    }
}
