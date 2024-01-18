<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ProductService;
use App\DTO\ProductDTO;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        $products = $this->productService->getAllProducts();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'productName' => 'required|string',
            'price' => 'required|numeric',
            'kitsType' => 'required|string',
            'imageList' => 'required|array',
            'team_id' => 'required|integer',
            'timestamps' => 'required|boolean',
            // Add other validation rules as needed
        ]);

        $productDTO = new ProductDTO(
            $request->input('productName'),
            $request->input('id'), // Assuming 'id' is present in the request
            $request->input('price'),
            $request->input('kitsType'),
            $request->input('imageList'),
            $request->input('team_id'),
            $request->input('timestamps')
        );

        $product = $this->productService->createProduct($productDTO);

        return response()->json($product, 201);
    }

    public function show(string $id)
    {
        $product = $this->productService->getProductById($id);
        return response()->json($product);
    }

    public function update(Request $request, string $id)
    {
        $this->validate($request, [
            'productName' => 'required|string',
            'price' => 'required|float',
            'kitsType' => 'required|string',
            'imageList' => 'required|text',
            'team_id' => 'required|integer',
            'timestamps' => 'required|boolean',
            // Add other validation rules as needed
        ]);

        $productDTO = new ProductDTO(
            $request->input('productName'),
            $request->input('id'), // Assuming 'id' is present in the request
            $request->input('price'),
            $request->input('kitsType'),
            $request->input('imageList'),
            $request->input('team_id'),
            $request->input('timestamps')
        );

        $product = $this->productService->updateProduct($id, $productDTO);

        return response()->json($product);
    }

    public function destroy(string $id)
    {
        $this->productService->deleteProduct($id);

        return response()->json(null, 204);
    }
}
