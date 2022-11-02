## Exercise 0.4
```mermaid
sequenceDiagram
browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
server-->>browser: HTML-code
browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->>browser: HTML-code
browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->>browser: main.css
browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->>browser: main.js

note over browser: browser starts executing js-code that <br/> requests JSON data from server

browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->>browser: [...,{"content":"Good night!","date":"2022-11-02T18:49:05.438Z"}]

note over browser: browser executes the event handler  <br/> that renders notes to display
```

## Exercise 0.5
```mermaid
sequenceDiagram
browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->>browser: HTML-code
browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->>browser: main.css
browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->>browser: spa.js

note over browser: browser starts executing js-code that requests <br/> JSON data from server end note

browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->>browser: [...,{"content":"Good night!","date":"2022-11-02T18:49:05.438Z"},...]

note over browser: browser executes the event handler that <br/> renders notes to display
```

## Exercise 0.6
```mermaid
sequenceDiagram
browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

note over browser: Content-type: application/json <br/> {"content":"Good night! Again...","date":"2022-11-02T19:06:45.554Z"}

server-->>browser: {"message":"note created"}

note over browser: browser post new_note_spa and this triggers the <br/> js application that renders the notes
```