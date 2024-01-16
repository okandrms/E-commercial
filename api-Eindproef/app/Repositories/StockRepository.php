<?php

namespace App\Repositories;
    
    use App\Repositories\Interfaces\StockRepositoryInterface;
    use App\Models\Stock;
    
    class StockRepository  {
        
        public function getAll()
        {
            return Stock::all();
        }
    
        public function getById($id)
        {
            return Stock::findOrFail($id);
        }
    
        public function create(array $data)
        {
            return Stock::create($data);
        }
    
        public function update($id, array $data)
        {
            $stock = Stock::findOrFail($id);
            $stock->update($data);
    
            return $stock;
        }
    
        public function delete($id)
        {
            $stock = Stock::findOrFail($id);
            $stock->delete();
        }
    }
