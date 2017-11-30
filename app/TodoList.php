<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TodoList extends Model
{
    protected $fillable =['title', 'description', 'user_id', 'status'];
    public function user(){
        return $this->belongsTo('App/User');
    }
    public function Tasks(){
        return $this->hasMany('App/Task');
    }

}
