<?php

namespace Tests\Feature;

use App\Models\Job;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ResponseApiTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function it_validates_job_response()
    {
        $job = Job::factory()->create();

        // Required field validation
        $this->json('POST', route('responses.store', compact('job')))
            ->assertStatus(422)
            ->assertJsonStructure(['message', 'errors' => ['email', 'type']]);

        // Type should be within the list of options
        $this->json('POST', route('responses.store', compact('job')), [
            'email' => $this->faker->safeEmail,
            'type' => 'test',
        ])
            ->assertStatus(422)
            ->assertJsonStructure(['message', 'errors' => ['type']]);

        // Type "bid" should require the `daily_rate` field
        $this->json('POST', route('responses.store', compact('job')), [
            'email' => $this->faker->safeEmail,
            'type' => 'bid',
        ])
            ->assertStatus(422)
            ->assertJsonStructure(['message', 'errors' => ['daily_rate']]);
    }

    /** @test */
    public function it_validate_to_submit_for_higher_bid()
    {
        $job = Job::factory()->create([
            'daily_rate' => 20,
        ]);

        $response = $this->json('POST', route('responses.store', compact('job')), [
            'email' => $this->faker->safeEmail,
            'type' => 'bid',
            'daily_rate' => 10,
        ])
            ->assertStatus(422)
            ->assertJsonStructure(['message', 'errors' => ['daily_rate']]);
    }

    /** @test */
    public function it_can_submit_my_bid()
    {
        $job = Job::factory()->create([
            'daily_rate' => 25,
        ]);

        $response = $this->json('POST', route('responses.store', compact('job')), [
            'email' => $this->faker->safeEmail,
            'type' => 'bid',
            'daily_rate' => 50.25,
        ])->assertCreated()
        ->assertJsonStructure([
            'data' => ['email', 'type', 'daily_rate', 'created_at']
        ])
        ->assertJson([
            'data' => ['daily_rate' => 50.25],
        ]);
    }

    /** @test */
    public function it_can_accept_proposed_daily_rate()
    {
        $job = Job::factory()->create([
            'daily_rate' => 25,
        ]);

        $response = $this->json('POST', route('responses.store', compact('job')), [
            'email' => $this->faker->safeEmail,
            'type' => 'accept',
        ])->assertCreated()
        ->assertJsonStructure([
            'data' => ['email', 'type', 'daily_rate', 'created_at']
        ])
        ->assertJson([
            'data' => ['daily_rate' => 25],
        ]);
    }

    /** @test */
    public function it_can_reject_job()
    {
        $job = Job::factory()->create([
            'daily_rate' => 25,
        ]);

        $response = $this->json('POST', route('responses.store', compact('job')), [
            'email' => $this->faker->safeEmail,
            'type' => 'reject',
        ])->assertCreated()
        ->assertJsonStructure([
            'data' => ['email', 'type', 'daily_rate', 'created_at']
        ])
        ->assertJson([
            'data' => ['daily_rate' => 25],
        ]);
    }
}
