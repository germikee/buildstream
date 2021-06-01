<?php

namespace App\Rules;

use App\Models\Job;
use Illuminate\Contracts\Validation\Rule;

class HigherDailyRate implements Rule
{
    /**
     * @var float|integer
     */
    protected $proposedDailyRate;

    /**
     * Create a new rule instance.
     *
     * @param \App\Models\Job $job
     * @return void
     */
    public function __construct(Job $job)
    {
        $this->proposedDailyRate = $job->daily_rate;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  float|integer  $bid
     * @return bool
     */
    public function passes($attribute, $bid)
    {
        if (request('type') === 'bid') {
            return $bid > $this->proposedDailyRate;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Bid should be higher than proposed daily rate.';
    }
}
