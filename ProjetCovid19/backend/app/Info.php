<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Info extends Model
{
    protected $fillable = ['user_id', 'nom' , 'prenom' , 'age' , 'sexe' , 'adresse' , 'telephone' , 'ville'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
