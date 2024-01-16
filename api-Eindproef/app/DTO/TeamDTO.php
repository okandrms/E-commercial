<?php


namespace App\DTO;

class TeamDTO
{
    public $category;
    public $teamName;

    public function __construct($category, $teamName)
    {
        $this->category = $category;
        $this->teamName = $teamName;
    }
}
