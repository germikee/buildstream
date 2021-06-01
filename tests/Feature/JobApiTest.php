<?php

namespace Tests\Feature;

use App\Models\Job;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class JobApiTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_can_create_a_new_job_with_all_the_required_properties()
    {
        $response = $this->json('POST', route('jobs.store'))
            ->assertStatus(422)
            ->assertJsonStructure(['message', 'errors' => ['title', 'daily_rate']]);

        $this->json('POST', route('jobs.store'), [
            'title' => $this->faker->words(3, true),
            'daily_rate' => 20.5,
        ])->assertCreated()
        ->assertJsonStructure(['data' => ['title', 'created_at']]);
    }

    /** @test */
    public function it_can_see_a_list_of_all_jobs_containing_these_fields()
    {
        Job::factory(2)->create();

        $response = $this->json('GET', route('jobs.index'))
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    '*' => ['title', 'created_at']
                ],
            ]);
    }
}
