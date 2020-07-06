<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\User;

class UserController extends Controller 
{
    //creer un nouveau admin
    public function registerAdmin(Request $request)
    {
        return $this->register($request, 'admin');
    }
    //creer un nouveau utilisateur simple
    public function register(Request $request, $type = 'simple')
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'device_name' => 'required'
        ]);

        $user = User::create(
            [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'type' => $type,
            ]
        );
    
        $token = $user->createToken($request->device_name)->plainTextToken;
        
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }

    //l'authentification d'un user
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required'
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect!.'],
            ]);
        }
    
        $token = $user->createToken($request->device_name)->plainTextToken;
    
        $response = [
            'user' => $user,
            'token' => $token
        ];
        return response($response, 201);
    }

    //logout for a user
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response('Logged out', 200);
    }

    //afficher tous les utilisateurs
    public function index(Request $request)
    {
        $user = $this->currentUser($request);

        if($this->isAdmin($user))
        {
            return User::all();
        }
        else
        {
            return response('access denied' , 403);
        }
    }

    public function currentUser(Request $request)
    {
        return $request->user();
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);
        $user = User::findOrFail($id);
        $data = $request->all();
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = Hash::make($data['password']);
        $user->save();
        return response('user Updated', 200);
    }


    public function delete(Request $request, $id)
    {
        if($this->isAdmin($this->currentUser($request)))
        {
            $user = User::findOrFail($id);
            $user->delete();
            return response('User deleted', 200);
        }
        else
        {
            return response('access denied' , 403);
        }
    }




    private function isAdmin($user)
    {
        if($user->type == 'admin')
            return true;
        else
            return false;
    }
   
}
