<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\History;

class IndexController extends Controller
{
    public function index(){
        return view('index');
    }

    public function saveSearch(Request $request)
    {
        $request->validate([
            'term' => 'required|string|max:255',
        ]);

        $term = $request->input('term');

        try {
            History::create(['term' => $term,'created_at' => now(), 'update_at' => now()]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Término guardado correctamente: ' . $term], 200);

    }


    public function getSearchHistory(){
        $history = History::orderBy('created_at', 'desc')->get(); 

        return response()->json($history); 
    }
}
