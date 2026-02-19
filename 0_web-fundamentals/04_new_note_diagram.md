sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user writes a note into the form field and clicks "Save"

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note left of server: The server reads the body of the POST request <br>and pushes a new note into the notes array
    server-->>browser: HTTP 302 Redirect (Location: /notes)
    deactivate server

    Note right of browser: Browser follows the redirect and reloads the Notes page

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: list of notes (including the new note)
    deactivate server

    Note right of browser: The browser executes the callback function that renders the updated notes list
