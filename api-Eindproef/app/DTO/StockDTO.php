<?php


namespace App\DTO;

class StockDTO
{
    public $product_id;
    public $timestamps;
    public $quantity;
    public $id;
    

    public function __construct($product_id, $timestamps, $quantity, $id)
    {
        $this->product_id = $product_id;
        $this->timestamps = $timestamps;
        $this->id = $id;
        $this->quantity = $quantity;
    }
}
