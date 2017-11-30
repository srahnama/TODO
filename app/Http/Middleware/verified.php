<?php

namespace App\Http\Middleware;
/*
 * This middleware check verified emails
 *
 * */

use App\User;
use Closure;

class verified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
//        $user = User::where('verified',true )->exists();
        $user = User::where('email',$request->email )->first();
        //dd($user->verified);
        /*  if user verified email user can be logged-in
         *  else redirect to login page.
         * */
        if(!$user->verified){
            return redirect('/login')->with('status', 'Your email must be verified!');
        }
//        dd($user);
        return $next($request);
    }
}
