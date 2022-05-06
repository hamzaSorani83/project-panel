<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Exception;

class ProjectController extends Controller
{
    function index(){
        try{
            return Project::simplePaginate(isset($_GET['per_page']) ? $_GET['per_page'] : 10);
        }catch (Exception $ex) {
            return ['is_done' => false,'error_message' => $ex->getMessage()];
        }
    }

    function add(Request $request){
        try{
            $project = Project::create([
                'project_details' => $request->project_details,
            ]);
            return ['is_done' => true,'project' => $project];

        }catch (Exception $ex) {
            return ['is_done' => false,'error_message' => $ex->getMessage()];
        }

    }

    function delete(Request $request){
        try{
            Project::where('id',$request->id)->delete();
            return ['is_done' => true];
        }catch (Exception $ex) {
            return ['is_done' => false,'error_message' => $ex->getMessage()];
        }

    }

    function get(Request $request){
        try{
            return ['is_done' => true,'project' => Project::where('id',$request->id)->first()];
        }catch (Exception $ex) {
            return ['is_done' => false,'error_message' => $ex->getMessage()];
        }
    }
}
