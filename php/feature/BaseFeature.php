<?php
declare(strict_types=1);

// Gandi SDK base feature

class GandiBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(GandiContext $ctx, array $options): void {}
    public function PostConstruct(GandiContext $ctx): void {}
    public function PostConstructEntity(GandiContext $ctx): void {}
    public function SetData(GandiContext $ctx): void {}
    public function GetData(GandiContext $ctx): void {}
    public function GetMatch(GandiContext $ctx): void {}
    public function SetMatch(GandiContext $ctx): void {}
    public function PrePoint(GandiContext $ctx): void {}
    public function PreSpec(GandiContext $ctx): void {}
    public function PreRequest(GandiContext $ctx): void {}
    public function PreResponse(GandiContext $ctx): void {}
    public function PreResult(GandiContext $ctx): void {}
    public function PreDone(GandiContext $ctx): void {}
    public function PreUnexpected(GandiContext $ctx): void {}
}
