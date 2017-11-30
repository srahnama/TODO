<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['title' , 'description','todo_list_id', 'status', 'due_date'];
    public function TodoList(){
        return $this->belongsTo('App\TodoList','todo_list_id','id');
    }
}
