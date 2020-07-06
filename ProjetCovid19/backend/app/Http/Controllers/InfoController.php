<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\user;
use App\Info;

class InfoController extends Controller
{
    public function index()
    {
        return Info::all();
    }

    public function show($id)
    {
        return User::find($id)->info;
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if ($user->info) {
            return response('already exists');
        }
        $data = $request->all();
        $data["user_id"] = $user->id;

        $information = Info::create($data);

        $user->info()->save($information);

        return $user->info;
    }
    public function storeid(Request $request,$id)
    {
        $user = User::findOrFail($id);
        if($user->info)
        {
            return response('already exists');
        }
        $data = $request->all();
        $data["user_id"] = $user->id;

        $information = Info::create($data);

        $user->info()->save($information);

        return response("Vous avez creer info avec succes", 200);
    }

    public function update(Request $request, $id)
    {
        $information = User::findOrFail($id)->info;

        $information->update($request->all());

        return $information;
    }

    public function delete(Request $request, $id)
    {
        $information = User::findOrFail($id)->info;
        if (!$information) {
            return  [
                'message' => $message = 'no infos for this user',
                'code' => 204,
            ];
        }
        $isdeleted = $information->delete();

        if ($isdeleted)
            $message = 'deleted successfully';
        else
            $message = 'deletion failed';

        return [
            'message' => $message,
            'code' => 204,
        ];
    }
}
