``` mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: User enters note and clicks 'Save'

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Success status (e.g., 201 Created, no redirect needed for SPA)
    deactivate server

    Note right of browser: Browser updates the UI with the new note without reloading the page
```
