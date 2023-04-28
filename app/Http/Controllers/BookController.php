<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use App\Models\Hotel;
use App\Models\User;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $emFilter= new \stdClass();
        $emFilter->title="";

        $filter=$request->session()->get("book_filter", $emFilter);


        return inertia('Book/Index',[
            "book"=>Book::filter($filter)->with(['category', 'users'])->get(),
            "category"=>Category::all(),
            "filter"=>$filter,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Book/Create", [
            "category"=>Category::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required',
            'summary'=>'required',
            'ISBN'=>'required',
            'pages'=>'required|numeric',
            'category_id'=>'required'
        ],
            [
                'title'=>'Knygos pavadinimas yra privalomas',
                'summary'=>'Santrauka yra privaloma',
                'ISBN'=>'ISBN kodas yra privalomas',
                'pages'=>'Puslapių skaičius yra privalomas',
                'category_id'=>'Kategorijos pasirinkimas yra privalomas'
            ]);




        $book=new Book();
        $book->title=$request->title;
        $book->summary=$request->summary;
        $book->ISBN=$request->ISBN;
        $book->pages=$request->pages;
        $book->category_id=$request->category_id;
        if ($request->file('picture')!=null){
            $request->file('picture')->store('/public/book');
            $book->picture=$request->file('picture')->hashName();
        }
        $book->save();
        return to_route('book.index');
    }


    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return inertia("Book/Edit", [
            "book"=>$book,
            "category"=>Category::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $book->title=$request->title;
        $book->summary=$request->summary;
        $book->ISBN=$request->ISBN;
        $book->pages=$request->pages;
        $book->category_id=$request->category_id;
        if ($request->file("picture")!=null){
            if ($book->picture!=null){
                unlink(storage_path()."/app/public/book/".$book->picture);
            }
            $request->file("picture")->store("/public/book");
            $book->picture=$request->file("picture")->hashName();
        }
        $book->save();
        return to_route('book.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return to_route("book.index");
    }

    public function attend($book, $id){

        $books=Book::find($book);
        $user=User::find($id);

        if($user->books->contains($books->id)){
            $user->books()->detach($books->id);
            return to_route('book.index');
        }

        $user->books()->attach($books->id);
        $user->save();

        return to_route('book.index');
    }

    public function filter (Request $request){
        $filter = new \stdClass();
        $filter->title=$request->title;

        $request->session()->put("book_filter", $filter);
        return to_route("book.index");
    }


}
