<?php

namespace App\Services;
    
    use App\Repositories\Interfaces\ProductRepositoryInterface;
    
    class ProductService {
        protected $productRepository;

        public function __construct(ProductRepositoryInterface $productRepository) {
            $this->productRepository = $productRepository;
        }

        private function transformToDTO($product)
    {
        return new ProductDTO($product->productName, $product->description, $product->id, $product->size, $product->price, $product->kitsType, $product->imageList, $product->team_id, $product->timestamps);
    }

    private function transformToDTOs($products)
    {
        return $products->map(function ($product) {
            return $this->transformToDTO($product);
        });
    }
    }