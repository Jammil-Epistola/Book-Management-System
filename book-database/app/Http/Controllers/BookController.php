<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // GET /api/books - List all books
    public function index()
    {
        $books = Book::all();
        return response()->json($books);
    }

    // GET /api/books/{id} - Show details of a specific book
    public function show($id)
    {
        $book = Book::find($id);
        
        if ($book) {
            return response()->json($book);
        } else {
            return response()->json(['message' => 'Book not found'], 404);
        }
    }

    // POST /api/books - Create a new book
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_year' => 'required|integer',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'published_year' => $request->published_year,
            'genre' => $request->genre,
            'description' => $request->description,
        ]);

        return response()->json($book, 201);
    }

    // PUT /api/books/{id} - Update an existing book
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'published_year' => 'required|integer',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $book = Book::find($id);

        if ($book) {
            $book->update([
                'title' => $request->title,
                'author' => $request->author,
                'published_year' => $request->published_year,
                'genre' => $request->genre,
                'description' => $request->description,
            ]);

            return response()->json($book);
        } else {
            return response()->json(['message' => 'Book not found'], 404);
        }
    }

    // DELETE /api/books/{id} - Delete a book
    public function destroy($id)
    {
        $book = Book::find($id);

        if ($book) {
            $book->delete();
            return response()->json(['message' => 'Book deleted successfully']);
        } else {
            return response()->json(['message' => 'Book not found'], 404);
        }
    }
}
