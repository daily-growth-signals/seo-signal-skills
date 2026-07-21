# Daily Growth Signals MCP contract





- Follow the supported configuration flow for your AI client.

## Tools

### `submit_keyword_research_signals`

Submit one asynchronous keyword research request.

Inputs:

- `keyword`: seed keyword.
- `domain`: target domain.
- `market`: ISO market code.
- `language`: language code.
- `idempotency_key`: optional stable retry key.

Store the returned `request_id`. Reusing a stable idempotency key is safer than creating duplicate duplicate requests.

### `get_keyword_research_signals`

Retrieve the state and terminal result for the authenticated account.

Input:

- `request_id`: UUID returned by the submit tool.

`pending` and `running` mean the task is still processing. Poll at the suggested interval. Do not resubmit unless the original task reached a retryable failure and the caller wants to retry.

## Result semantics

A terminal result can include demand metrics, search intent, search-result observations and links, trend and audience evidence, synthesized signals, limitations, and usage.

Optional evidence nodes can produce a partial result with a limitation instead of failing the whole task.

## Common connection failures



- Unexpected server error: contact the service administrator with the request time and client error, without including private configuration.
