<?php

namespace App\Services;
    
    use App\Repositories\Interfaces\StockRepositoryInterface;
    
    class StockService {
        protected $stockRepository;

        public function __construct(StockRepositoryInterface $stockRepository) {
            $this->stockRepository = $stockRepository;
        }

        

        private function transformToDTO($stock)
    {
        return new StockDTO($stock->product_id, $stock->timestamps, $stock->quantity, $stock->id);
    }

    private function transformToDTOs($stocks)
    {
        return $stocks->map(function ($stock) {
            return $this->transformToDTO($stock);
        });
    }
    }