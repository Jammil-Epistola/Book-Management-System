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
            ['title' => 'Sample Book', 'author' => 'Epistola', 'published_year' => 2001, 'genre' => 'Fiction', 'description' => 'A Sample Book 1'],
            ['title' => 'Into The Pit', 'author' => 'Scott Ca', 'published_year' => 2017, 'genre' => 'Fiction', 'description' => 'A FNAF Book'],
            
        ]);
    }
}
