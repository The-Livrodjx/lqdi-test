<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeEmail;

class UsersController extends Controller
{

    public function index()
    {
        $users = User::all();

        if (count($users) > 0)
            return response()->json([
                "status" => "success",
                "users" => $users
            ], 200);

        return response()->json([
            "status" => "error",
            "message" => "None user was found"
        ], 404);
    }

    public function createUser(Request $request)
    {
        $user = new User;

        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:users|email',
            'name' => 'required'
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        $user_exists = User::where("email", $request->email)->first();

        if (!$user_exists) {

            $user->email = $request->email;
            $user->name = $request->name;
            $user->save();

            $new_user = User::where("email", $request->email)->first();

            Mail::to($request->email)->send(new WelcomeEmail($request->name));

            return response()->json([
                "id_request" => $new_user->id_request
            ], 201);
        }

        return response()->json([
            "message" => "User already exists"
        ], 403);
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        if ($email === 'admin@admin.com') {
            return response()->json(['message' => 'Login successful'], 200);
        }
        return response()->json(['message' => 'Invalid email'], 401);
    }
}
