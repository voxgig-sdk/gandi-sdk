<?php
declare(strict_types=1);

// Gandi SDK exists test

require_once __DIR__ . '/../gandi_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = GandiSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
