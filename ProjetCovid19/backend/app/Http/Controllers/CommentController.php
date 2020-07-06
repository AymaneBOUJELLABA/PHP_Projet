<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Comment;

class CommentController extends Controller
{
    /**
     * Send all comments as JSON
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return Comment::all();
    }

    public function show($id)
    {
        return Comment::find($id);
    }

    public function store(Request $request)
    {
        return Comment::create($request->all());
    }

    public function update(Request $request , Comment $Comment)
    {
        $Comment->update($request->all());
        return $Comment;
    }

    public function delete(Request $request,Comment $Comment)
    {
        $Comment->delete();

        return [
            'code' => 204,
            'message' => 'element deleted'
        ];
        
    }
}
