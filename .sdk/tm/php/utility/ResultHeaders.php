<?php
declare(strict_types=1);

// Gandi SDK utility: result_headers

class GandiResultHeaders
{
    public static function call(GandiContext $ctx): ?GandiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
