<?php

namespace App\Repositories;
    
    use App\Repositories\Interfaces\TeamRepositoryInterface;
    use App\Models\Team;
    
    class TeamRepository {
        public function getAll()
        {
            return Team::all();
        }
    
        public function getById($id)
        {
            return Team::findOrFail($id);
        }
    
        public function create(array $data)
        {
            return Team::create($data);
        }
    
        public function update($id, array $data)
        {
            $team = Team::findOrFail($id);
            $team->update($data);
    
            return $team;
        }
    
        public function delete($id)
        {
            $team = Team::findOrFail($id);
            $team->delete();
        }
    }
