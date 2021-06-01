<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ResponseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'email'      => $this->email,
            'type'       => $this->type,
            'daily_rate' => $this->daily_rate,
            'created_at' => $this->created_at,
        ];
    }
}
