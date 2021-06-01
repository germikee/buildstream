<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResponseRequest;
use App\Http\Resources\ResponseResource;
use App\Models\Job;
use App\Models\Response;
use Illuminate\Http\Request;

class JobResponseController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Job $job
     * @return \Illuminate\Http\Response
     */
    public function __invoke(ResponseRequest $request, Job $job)
    {
        $data = array_filter($request->all());

        $response = $job->responses()->create(array_merge([
            'daily_rate' => $job->daily_rate,
        ], $data));

        return new ResponseResource($response);
    }
}
