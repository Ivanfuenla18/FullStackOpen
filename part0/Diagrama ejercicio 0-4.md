Nota : no entendi bien el lenguaje de markdown hice mi mejor intento.

sequenceDiagram
    participant Servidor
    participant Navegador

    Nota: esto ocurre una vez presionado el boton save.

    Navegador->>Servidor: POST https://studies.cs.helsinki.fi/exampleapp/new_note
        activate Servidor
        Servidor-->>Post: json document
        deactivate Servidor

    Nota: El navegador solicita tres solicitudes HTTP mas.

    Navegador->>Servidor: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate Servidor
        Servidor-->>Navegador: the css file
        deactivate Servidor

    Navegador->>Servidor: GET https://studies.cs.helsinki.fi/exampleapp/main.js
        activate Servidor
        Servidor-->>Servidor: the JavaScript file
        deactivate Servidor
    
    Navegador->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    Server-->>Navegador:the json file
    deactivate server

    Nota : El servidor crea un nuevo objeto de nota y lo agrega a un arreglo llamado notes.