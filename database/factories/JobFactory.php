<?php

namespace Database\Factories;

use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Job::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => ucfirst($this->faker->words(3, true)),
            'description' => $this->faker->sentence,
            'daily_rate' => $this->faker->numberBetween(10, 100),
            'created_at' => $this->faker->dateTimeBetween('-1 month'),
        ];
    }
}
