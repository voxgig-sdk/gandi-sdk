<?php
declare(strict_types=1);

// Gandi SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class GandiMakeContext
{
    public static function call(array $ctxmap, ?GandiContext $basectx): GandiContext
    {
        return new GandiContext($ctxmap, $basectx);
    }
}
