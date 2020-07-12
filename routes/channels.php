<?php

use Illuminate\Support\Facades\Broadcast;
use App\Http\Resources\UserResource;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel("parties", function(){
    return true;
});

Broadcast::channel("parties.{id}", function($user, $id){
    $party = \App\Party::find($id);

    if(!$party)
        return false;

    if($party) {
        $user = $party->users()->find($user->id);

        if(!$user)
            return false;
    }

    return $user;
});

/*Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});*/
