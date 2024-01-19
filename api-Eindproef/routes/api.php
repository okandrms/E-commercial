<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StockController;
use Illuminate\Support\Facades\DB;


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

    Route::apiResource('teams', TeamController::class);
    
    // Route::apiResource('stocks', StockController::class);

    // Route::apiResource('products', ProductController::class);

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

