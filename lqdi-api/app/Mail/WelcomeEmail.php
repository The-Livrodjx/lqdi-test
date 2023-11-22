<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(private $name)
    {
        //
    }

    public function build()
    {
        return $this->view('emails.welcome')
            ->with([
                'name' => $this->name,
            ]);
    }
}
