<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Task;
use Validator;
use App\Http\Resources\task as TaskResource;

class TodosController extends BaseController
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required',
            'category_id' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
    
        $input = $request->all();
        
        $task = Task::create($input);
    
        return $this->sendResponse(new TaskResource($task), 'Task created successfully.');
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = Task::find($id);

        if (is_null($task)) {
            return $this->sendError('Task not found.');
        }

        return $this->sendResponse(new TaskResource($task), 'Task retrieved successfully.');
    }

    public function markAsDone($id){
        $task  = Task::find($id);
        if($task){
            $task->finished = 1;
            $task->save();
            return $this->sendResponse([], 'Task updated successfully.');
        }else{
            return $this->sendResponse([], 'Task not found.');
        }
    }
      
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Task::find($id)->delete();
        return $this->sendResponse([], 'Task deleted successfully.');
    }
}
