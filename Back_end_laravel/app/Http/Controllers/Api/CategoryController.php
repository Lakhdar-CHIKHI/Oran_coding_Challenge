<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\Category;
use Validator;
use App\Http\Resources\Category as CategoryResource;

class CategoryController extends BaseController
{

    public function index(Request $request)
    {
        $data = Category::all();
        return $this->sendResponse(CategoryResource::collection($data), 'Categories retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());       
        }
        $input = $request->all();
        $category = Category::create($input);
        // $category = Category::create($request);
    
        return $this->sendResponse(new CategoryResource($category), 'Category created successfully.');
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::find($id);

        if (is_null($category)) {
            return $this->sendError('Category not found.');
        }

        return $this->sendResponse(new CategoryResource($category), 'Category retrieved successfully.');
    }

    public function share($id){
        $category  = Category::find($id);
        if($category){
            $category->share = $category->share == 1 ? 0 : 1;
            $category->save();
            return $this->sendResponse([], 'Category updated successfully.');
        }else{
            return $this->sendResponse([], 'Category not found.');
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
        Category::find($id)->delete();
        return $this->sendResponse([], 'Category deleted successfully.');
    }
}
