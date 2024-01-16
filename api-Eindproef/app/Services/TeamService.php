<?php

namespace App\Services;
    
use App\Repositories\TeamRepository;
use App\DTO\TeamDTO;
    
    class TeamService {
        protected $teamRepository;

        public function __construct(TeamRepository $teamRepository) {
            $this->teamRepository = $teamRepository;
        }

        public function getAllTeams()
    {

       return $this->teamRepository->getAll();
        
    }

    public function getTeamById($id)
    {
       return  $this->teamRepository->getById($id);
               
    }

    

    public function createTeam(TeamDTO $team)
    {
        $data = [
            'category' => $team->category,
            'teamName' => $team->teamName,
        ];

        return $this->teamRepository->create($data);
    }

    public function updateTeam($id, TeamDTO $team)
    {
        $data = [
            'category' => $team->category,
            'teamName' => $team->teamName,
        ];

        return $this->teamRepository->update($id, $data);
    }

    public function deleteTeam($id)
    {
        $this->teamRepository->delete($id);
    }

       
    }