<?php

namespace App\Http\Controllers;

use App\Question;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\FuncCall;

class QuestionController extends Controller
{
    //get all the results for the questions
    public function index()
    {
        return Question::all();
    }
    //afficher les résultat des questions pour un seul user
    public function show($id)
    {
        $question = User::find($id)->question;
        
        if($question)
            return response(['question' => $question]);
        else
            return response('no questions found');
    }

    public function hasQuestion($id)
    {
        $question = User::find($id)->question;
        
        if($question)
            return response(['hasQuestion' => "true"]);
        else
            return response(['hasQuestion' => "false"]);
    }
    //creer une nouvelle instance des résultats
    public function store(Request $request, $id)
    {   
        $user = User::findOrFail($id);
        if($user->question)
        {
            return response('already exists');
        }
        $data = $request->all();
        $data["user_id"] = $user->id;

        $question = Question::create($data);

        $user->question()->save($question);
        
        return response(['user' => $user, 'question' => $question]);
    }
    //afficher tous les demandes traités (isTreated == true)
    public function treated(Request $request)
    {
        $questions = DB::table('questions')
                        ->select('nom','prenom','Q1','Q2','Q3','Q4','Q5','resultat','users.id')
                        ->join('users', 'questions.user_id', '=', 'users.id')
                        ->join('infos', 'users.id', '=', 'infos.user_id')
                        ->where('isTreated','=',1)
                        ->get();
        
        return response($questions,200);
    }
    public function notTreated(Request $request)
    {
        $questions = DB::table('questions')
                        ->select('nom','prenom','Q1','Q2','Q3','Q4','Q5','resultat','users.id as user_id' , 'isTreated')
                        ->join('users', 'questions.user_id', '=', 'users.id')
                        ->join('infos', 'users.id', '=', 'infos.user_id')
                        ->where('isTreated','=',0)
                        ->get();
        
        return response($questions,200);
    }
    //modfier les valeurs
    public function update(Request $request,$id)
    {
        $user = User::findOrFail($id);

        $user->question->update($request->all());

        return $user->question;
    }
    //les graphes
    public function graphs()
    {
        $nonTraite = DB::table('questions')
                        ->select(DB::raw('count(*) as nbr'))
                        ->where('resultat', '=', 'null')
                        ->get();

        $positif = DB::table('questions')
                        ->select(DB::raw('count(*)  as nbr'))
                        ->where('resultat', '=', 'positif')
                        ->get();

        $negatif = DB::table('questions')
                        ->select(DB::raw('count(*)  as nbr'))
                        ->where('resultat', '=', 'negatif')
                        ->get();

        return response([
            'notTreated' => $nonTraite['0']->nbr,
            'positif' => $positif['0']->nbr,
            'negatif' => $negatif['0']->nbr
        ]);
    }
    //supprimer
    public function delete(Request $request, $id)
    {
        $question = User::findOrFail($id)->question;

        if(!$question)
        {
            return  [
                'message' => $message = 'no answers for this user',
                'code' => 204,
            ];
        }
        $isdeleted = $question->delete();
        
        if($isdeleted)
            $message = 'deleted successfully';
        else
            $message = 'deletion failed';

        return [
            'message' => $message,
            'code' => 204,
        ];
    }



}
