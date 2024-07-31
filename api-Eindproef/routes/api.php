<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();



// });

Route::get('/teams', function () {
    return DB::table('teams')->get();
});

Route::post('/teams', function (Request $request) {
    $data = $request->validate([
        'teamName' => 'required|string',
        'category' => 'required|string'

        // Add other fields as needed
    ]);

    // Insert the new product into the database
    $product = DB::table('teams')->insertGetId($data);

    return response()->json(['message' => 'Team created successfully', 'id' => $product], 201);
});



// PUT/PATCH Method (Update)
Route::put('/teams/{id}', function (Request $request, $id) {
    $data = $request->validate([
        'teamName' => 'required|string',
        'category' => 'required|string'
        // Add other fields as needed
    ]);

    // Update the product in the database
    DB::table('teams')->where('id', $id)->update($data);

    return response()->json(['message' => 'Team updated successfully']);
});

Route::delete('/teams/{id}', function ($id) {
    // Delete the product from the database
    DB::table('teams')->where('id', $id)->delete();

    return response()->json(['message' => 'Team deleted successfully']);
});


    Route::get('/products', function () {
        return DB::table('products')->get();
    });

    Route::post('/products', function (Request $request) {
        $data = $request->validate([
            'productName' => 'required|string',
            'price' => 'required|numeric',
            'kitsType' => 'required|string',
            'imageList' => 'required|array',
            'team_id' => 'required|integer',
            'timestamps' => 'required|boolean',
            // Add other fields as needed
        ]);

        // Insert the new product into the database
        $product = DB::table('products')->insertGetId($data);

        return response()->json(['message' => 'Product created successfully', 'id' => $product], 201);
    });



    // PUT/PATCH Method (Update)
    Route::put('/products/{id}', function (Request $request, $id) {
        $data = $request->validate([
            'productName' => 'string',
            'price' => 'numeric',
            'kitsType' => 'string',
            'imageList' => 'array',
            'team_id' => 'integer',
            'timestamps' => 'boolean',
            // Add other fields as needed
        ]);

        // Update the product in the database
        DB::table('products')->where('id', $id)->update($data);

        return response()->json(['message' => 'Product updated successfully']);
    });

    Route::delete('/products/{id}', function ($id) {
        // Delete the product from the database
        DB::table('products')->where('id', $id)->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    });

    Route::get('/products/{category}', function ($category) {

        return DB::select("SELECT * FROM products p inner join teams t on p.team_id = t.id  WHERE t.category = ?", [$category]);
    });

    Route::get('/products/search/{term}', function ($term) {
        return DB::select(" SELECT * FROM products p INNER JOIN teams t ON p.team_id = t.id  WHERE t.category LIKE ? OR t.teamName LIKE ? OR p.productName LIKE ?
        ", ["%$term%", "%$term%", "%$term%"]);
    });




    // for stock

    // GET Method
Route::get('/stocks', function () {
    return DB::table('stocks')->get();
});

// POST Method (Create)
Route::post('/stocks', function (Request $request) {
    $data = $request->validate([
        'category' => 'required|in:PREMIER_LEAGUE,BUNDESLIGA,SERIEA,EURO2024',
        'stockName' => 'required|string',
        'product_id' => 'required|numeric',
        'timestamps' => 'required', // You might need to adjust this based on your specific requirements
        'id' => 'required|numeric',
        'quantity' => 'required|numeric',
        // Add other fields as needed
    ]);

    // Insert the new stock into the database
    $stock = DB::table('stocks')->insertGetId($data);

    return response()->json(['message' => 'Stock created successfully', 'id' => $stock], 201);
});

// PUT/PATCH Method (Update)
Route::put('/stocks/{id}', function (Request $request, $id) {
    $data = $request->validate([
        'product_id' => 'required|numeric',
        'quantity' => 'required|numeric',
    ]);

    // Update the stock in the database
    DB::table('stocks')->where('id', $id)->update($data);

    return response()->json(['message' => 'Stock updated successfully']);
 });


// DELETE Method (Delete)
Route::delete('/stocks/{id}', function ($id) {
    // Delete the stock from the database
    DB::table('stocks')->where('id', $id)->delete();

    return response()->json(['message' => 'Stock deleted successfully']);
});

// User CRUD Operations
Route::post('/users', function (Request $request) {
    $data = $request->validate([
        'name' => 'required|string',
        'email' => 'required|string',
        'password' => 'required|string',
        // Add other fields as needed
    ]);

    // Insert the new users into the database
    $stock = DB::table('users')->insertGetId($data);

    return response()->json(['message' => 'Your account informations created successfully', 'id' => $stock], 201);
});

Route::put('/users', function (Request $request) {
    $data = $request->validate([
        'id' => 'required|numeric',
        'name' => 'required|string',
        'email' => 'required|string',
        'password' => 'required|string',
        // Add other fields as needed
    ]);

    // Insert the new users into the database
    DB::table('users')->where('id', $id)->update($data);

    return response()->json(['message' => 'User updated successfully']);
});

Route::delete('/users/{id}', function ($id) {
    // Delete the users from the database
    DB::table('users')->where('id', $id)->delete();

    return response()->json(['message' => 'User deleted successfully']);
});

Route::post('/login', function (Request $request) {

    $data = $request->validate([
        'email' => 'required|string',
        'password' => 'required|string',
        // Add other fields as needed
    ]);

    $result = DB::select("SELECT id, name, email FROM users  WHERE email = ? AND password = ?", [$data['email'], $data['password']]);

    if( $result) {
        return response()->json(['message' => 'Login successful', 'data' => $result[0]], 200);
    } else {
        return response()->json(['message' => 'Login failed'], 401);
    }


});

Route::post('/orders', function (Request $request) {

    $data = $request->validate([
        'user_id' => 'required|numeric',
        'product_id' => 'required|numeric',
        'size' => 'required|string',
        'quantity' => 'required|numeric'
        // Add other fields as needed
    ]);

   return  DB::table('orders')->insertGetId($data);


});

Route::get('/orders/{user_id}', function ($user_id) {

      $results = DB::select("SELECT p.*,o.size, o.quantity, o.id as order_id FROM products p inner join orders o on p.id = o.product_id WHERE o.user_id = ?", [$user_id]);

       return  $results;
});


Route::delete('/orders/{id}', function ($id) {
    // Delete the users from the database
    DB::table('orders')->where('id', $id)->delete();

    return response()->json(['message' => 'Product deleted from orders successfully']);
});

Route::put('/orders/{id}', function (Request $request, $id) {
    $data = $request->validate([
        'user_id' => 'required|numeric',
        'product_id' => 'required|numeric',
        'size' => 'required|string',
        'quantity' => 'required|numeric'
        // Add other fields as needed
    ]);

    // Update the product in the database
    DB::table('orders')->where('id', $id)->update($data);

    return response()->json(['message' => 'Order updated successfully']);
});



Route::post('/favorites', function (Request $request) {

    $data = $request->validate([
        'user_id' => 'required|numeric',
        'product_id' => 'required|numeric',
        'size' => 'required|string'
        // Add other fields as needed
    ]);

   return  DB::table('favorites')->insertGetId($data);

});

Route::get('/favorites/{user_id}', function ($user_id) {

    $results = DB::select("SELECT p.*,f.size, f.id as favorite_id FROM products p inner join favorites f on p.id = f.product_id WHERE f.user_id = ?", [$user_id]);

     return  $results;
});


Route::delete('/favorites/{id}', function ($id) {
    // Delete the users from the database
    DB::table('favorites')->where('id', $id)->delete();

    return response()->json(['message' => 'Product deleted from favorites successfully']);
});


Route::post('/confirmedorders', function (Request $request) {

    $data = $request->validate([
        '*.user_id' => 'required|numeric',
        '*.product_id' => 'required|numeric',
        '*.size' => 'required|string',
        '*.quantity' => 'required|numeric',
        '*.timestamps' => 'boolean',
        // Add other validation rules as needed
    ]);

    $data = array_map(function($item) {
        $item['created_at'] = now();
        $item['updated_at'] = now();
        return $item;
    }, $data);

    $insertedIds = DB::table('confirmedorders')->insert($data);

    return response()->json(['inserted_ids' => $insertedIds]);


});

Route::get('/confirmedorders/{user_id}', function ($user_id) {

      $results = DB::select("SELECT p.*,o.size, o.quantity, o.id as order_id, o.created_at FROM products p inner join confirmedorders o on p.id = o.product_id WHERE o.user_id = ?", [$user_id]);

       return  $results;
});

Route::post('/password/email', function (Request $request) {
    $request->validate([
        'email' => 'required|email'
    ]);

    $email = $request->email;
    $user = DB::table('users')->where('email', $email)->first();

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    $token = Str::random(60);
    DB::table('password_resets')->insert([
        'email' => $email,
        'token' => Hash::make($token),
        'created_at' => now(),
    ]);

    // Send email with reset link (you need to set up your mail configuration)
    Mail::send('emails.password_reset', ['token' => $token], function ($message) use ($email) {
        $message->to($email);
        $message->subject('Password Reset Request');
    });

    return response()->json(['message' => 'Password reset link sent']);
});

Route::post('/password/reset', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'token' => 'required|string',
        'password' => 'required|string|confirmed'
    ]);

    $email = $request->email;
    $token = $request->token;
    $password = $request->password;

    $passwordReset = DB::table('password_resets')->where('email', $email)->first();

    if (!$passwordReset || !Hash::check($token, $passwordReset->token)) {
        return response()->json(['message' => 'Invalid token'], 400);
    }

    DB::table('users')->where('email', $email)->update([
        'password' => Hash::make($password)
    ]);

    DB::table('password_resets')->where('email', $email)->delete();

    return response()->json(['message' => 'Password reset successfully']);
});














