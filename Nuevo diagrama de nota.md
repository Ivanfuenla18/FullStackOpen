sequenceDiagram
participant Navegador
participant Servidor

browser->>Servidor: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate Servidor
    Servidor-->>Post: json document
    deactivate Servidor
    
 browser->>Servidor: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Servidor
    server-->>browser: the css file
    deactivate Servidor

browser->>Servidor: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate Servidor
    server-->>Servidor: the JavaScript file
    deactivate server
