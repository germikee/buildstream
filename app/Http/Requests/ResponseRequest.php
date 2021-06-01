<?php

namespace App\Http\Requests;

use App\Rules\HigherDailyRate;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ResponseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => ['required', 'max:255'],
            'type' => ['required', 'in:accept,bid,reject'],
            'daily_rate' => ['required_if:type,bid', new HigherDailyRate($this->route('job'))],
        ];
    }
}
