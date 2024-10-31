<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Book:: insert([
            ['title' => 'Sample Book', 'author' => 'Epistola', 'published_year' => 2001, 'genre' => 'Fiction', 'description' => 'A Sample Book 1'],
            ['title' => 'Into The Pit', 'author' => 'Scott Cawthon', 'published_year' => 2017, 'genre' => 'Fiction', 'description' => 'A FNAF Book'],
            ['title' => 'To Kill a Mockingbird', 'author' => 'Harper Lee', 'published_year' => 1960, 'genre' => 'Fiction', 'description' => 'A novel about racial injustice in the Deep South.'],
            ['title' => '1984', 'author' => 'George Orwell', 'published_year' => 1949, 'genre' => 'Dystopian', 'description' => 'A story about totalitarian government surveillance and control.'],
            ['title' => 'Pride and Prejudice', 'author' => 'Jane Austen', 'published_year' => 1813, 'genre' => 'Romance', 'description' => 'A classic novel about love and social standing in 19th century England.'],
            ['title' => 'The Great Gatsby', 'author' => 'F. Scott Fitzgerald', 'published_year' => 1925, 'genre' => 'Fiction', 'description' => 'A critique of the American Dream set in the Jazz Age.'],
            ['title' => 'Moby-Dick', 'author' => 'Herman Melville', 'published_year' => 1851, 'genre' => 'Adventure', 'description' => 'The epic tale of Captain Ahab’s obsessive quest to kill the white whale.'],
            ['title' => 'The Catcher in the Rye', 'author' => 'J.D. Salinger', 'published_year' => 1951, 'genre' => 'Fiction', 'description' => 'A young man’s experiences in New York City as he grapples with teenage angst.'],
            ['title' => 'The Hobbit', 'author' => 'J.R.R. Tolkien', 'published_year' => 1937, 'genre' => 'Fantasy', 'description' => 'A journey through Middle-earth in search of treasure.'],
            ['title' => 'War and Peace', 'author' => 'Leo Tolstoy', 'published_year' => 1869, 'genre' => 'Historical Fiction', 'description' => 'A detailed look at Russian society during the Napoleonic Wars.'],

        ]);
    }
}
