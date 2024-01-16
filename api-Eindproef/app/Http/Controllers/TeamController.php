<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TeamService;
use App\DTO\TeamDTO;


class TeamController extends Controller
{
    
    protected $teamService;

        public function __construct(TeamService $teamService)
        {
            $this->teamService = $teamService;
        }

        public function index()
        {
            $teams = $this->teamService->getAllTeams();
            return response()->json($teams);
        }
    
        public function show($id)
        {
            $team = $this->teamService->getTeamById($id);
            return response()->json($team);
        }
    
        public function store(Request $request)
        {
            $this->validate($request, [
                'category' => 'required|in:PREMIER_LEAGUE,BUNDESLIGA,SERIEA,EURO2024',
                'teamName' => 'required|string',
            ]);
    
            $teamDTO = new TeamDTO($request->input('category'), $request->input('teamName'));
            $team = $this->teamService->createTeam($teamDTO);
    
            return response()->json($team, 201);
        }
    
        public function update(Request $request, $id)
        {
            $this->validate($request, [
                'category' => 'required|in:PREMIER_LEAGUE,BUNDESLIGA,SERIEA,EURO2024',
                'teamName' => 'required|string',
            ]);
    
            $teamDTO = new TeamDTO($request->input('category'), $request->input('teamName'));
            $team = $this->teamService->updateTeam($id, $teamDTO);
    
            return response()->json($team);
        }
    
        public function destroy($id)
        {
            $this->teamService->deleteTeam($id);
    
            return response()->json(null, 204);
        }
}
