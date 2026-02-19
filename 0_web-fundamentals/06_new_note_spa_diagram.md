sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user writes a note into the form field<br/>and clicks "Save"

    Note right of browser: onsubmit handler is triggered<br/>e.preventDefault() stops form submission

    Note right of browser: The browser creates a new note object<br/>and pushes it into the local notes array
    Note right of browser: The browser clears the input field<br/>and redraws the notes list immediately

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: Server receives JSON data and <br/>stores the new note for future requests
    server-->>browser: HTTP 201 Created
    deactivate server

    Note right of browser: No page reload occurs since <br/>the notes list was already updated in the browser
