sequenceDiagram
    participant Servidor
    participant Navegador


    Navegador->>Servidor: GET https://studies.cs.helsinki.fi/exampleapp/spa
        activate Servidor
        Servidor-->   Navegador: HTML document
        deactivate Servidor

    Navegador->>Servidor: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate Servidor
        Servidor-->   Navegador: css document
        deactivate Servidor

    Navegador->>Servidor: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
        activate Servidor
        Servidor-->   Navegador: js document
        deactivate Servidor


 Navegador->>Servidor: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate Servidor
        Servidor-->   Navegador: json document
        deactivate Servidor

        
        