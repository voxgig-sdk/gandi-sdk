# API Definition

Gandi publishes no OpenAPI definition for its v5 API. `gandi-openapi.json` was constructed
by Voxgig from Gandi's public API documentation. **It is not an official Gandi document.**

| | |
|---|---|
| Source | The twelve API sections of https://api.gandi.net/docs/ (Domain, LiveDNS, Linked Zone, Certificate, ACME, Mailbox, Email, Billing, Comment, Organization, Web Hosting, Template) |
| Retrieved | 2026-11-18T12:39:33Z |
| Size | 1180867 bytes |
| sha256 | `9161394ec842449e6ce04d2455cc34740ade0cc9bb6bc59b085ddbb5c93dd3fd` |
| Version | OpenAPI 3.0.3, `info.version` 5.0.0: 126 paths, 221 operations |
| Base URL | `https://api.gandi.net/v5` (`servers[0]`); the documented sandbox, `https://api.sandbox.gandi.net/v5`, is `servers[1]` |

## What it contains

The documentation pages are rendered from a typed API description, so every operation,
parameter, body, type and constraint appears in regular markup. Those were read
mechanically into OpenAPI.

**Interface facts only:** paths, methods, parameter and property names, types, enums,
defaults, length, range and pattern constraints, media types, status codes, and the bearer
scheme. Gandi's descriptions and examples are not reproduced. Each operation's
`externalDocs` links to the section of Gandi's documentation that describes it, and its
`operationId` is that section's anchor.

## How it was checked

- Valid OpenAPI 3.0.3.
- Every example in the documentation was validated against the schema the same
  documentation declares for it: 101 request bodies, 103 bodies from the request
  examples, 66 responses and 20 parameters. The only mismatches are 8 inside the
  documentation's own request examples, such as placeholder values and parameters that
  the operation's reference does not list. The definition follows the reference.
- **Not yet checked against the live API.** Every route answers `401` without a token,
  real or not, so routes cannot be confirmed anonymously.
