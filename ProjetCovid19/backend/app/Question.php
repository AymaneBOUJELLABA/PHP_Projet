<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['user_id' , 'Q1' , 'Q2', 'Q3', 'Q4', 'Q5' , 'isTreated' , 'resultat'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}
