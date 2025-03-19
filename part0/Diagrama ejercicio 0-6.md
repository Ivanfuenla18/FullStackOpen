sequenceDiagram
    participant Servidor
    participant Navegador

        Nota:Petición que se hace despues de pulsar el boton.

        Navegador->>Servidor: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate Servidor
        Servidor-->>Post: json document
        deactivate Servidor

        Nota: Cuando el servidor recbibe la nota (json) este ejecuta el script el cual hace que aparezca la nota por eso hay mas peticiones.