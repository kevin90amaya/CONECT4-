# Plan y Casos de Prueba Extremo a Extremo (E2E) - Conecta 4

Este documento detalla los escenarios de prueba del sistema diseñados para validar el correcto funcionamiento de la aplicación **Conecta 4** utilizando **Playwright**.

Las pruebas están organizadas mediante **etiquetas (tags)** para facilitar su ejecución selectiva o exclusión dependiendo del entorno o del estado de la aplicación.

---

## Estrategia de Organización con Etiquetas (Tags)

Playwright permite ejecutar o excluir pruebas específicas buscando términos o etiquetas con el comando `--grep` y `--grep-invert`. Hemos organizado los casos en las siguientes categorías:

*   **`@e2e`**: Etiqueta general aplicada a todas las pruebas de esta carpeta. Permite ignorarlas o incluirlas en bloque fácilmente.
*   **`@menu`**: Pruebas de navegación y configuración inicial del juego.
*   **`@gameplay`**: Pruebas sobre la mecánica básica de juego (turnos, inserción de fichas).
*   **`@victory`**: Pruebas que validan la detección de condiciones de victoria.
*   **`@gameover`**: Pruebas que validan las situaciones de fin de juego (empates y finalización).
*   **`@navigation`**: Pruebas sobre reinicio y retorno al menú principal.

---

## Comandos de Ejecución Útiles

Para ejecutar las pruebas en este entorno de desarrollo (dentro del contenedor de desarrollo sin entorno de escritorio real), utiliza los siguientes comandos:

*   **Ejecutar pruebas del backend (por defecto omitiendo las `@e2e`):**
    ```bash
    npx playwright test
    ```
*   **Ejecutar todas las pruebas (incluidas las E2E con el backend de Spring Boot corriendo en el 8080):**
    ```bash
    RUN_E2E=true xvfb-run npx playwright test --project=chromium
    ```
*   **Abrir el Modo Interactivo (UI Test Runner) para depurar visualmente:**
    ```bash
   RUN_E2E=true xvfb-run npx playwright test --project=chromium --ui --ui-host 0.0.0.0 --ui-port 9322
    ```
    *Una vez ejecutado, abre `http://localhost:9322` en el navegador de tu máquina local.*

---

## Casos de Prueba Diseñados

### 1. Flujo del Menú y Configuración (`@menu` y `@e2e`)

Este grupo valida la interacción con los menús que requieren que la aplicación y su servidor backend estén en ejecución, ya que realizan peticiones HTTP para actualizar el estado del juego o configurarlo de manera persistente.

*   **Caso 1.1: Configuración de Jugadores (Modal y Persistencia en el Servidor)**
    *   **Descripción:** Comprobar que se puede acceder a la configuración de jugadores y modificar sus nombres y cantidad, persistiendo estos datos en el servidor.
    *   **Acciones:**
        1.  Desde `MainMenu`, ir a "Configuración" -> "Jugadores".
        2.  Entrar a "Editar Jugadores" para levantar el modal (`EditPlayersModal`).
        3.  Cambiar la cantidad de jugadores y editar los nombres de los jugadores.
        4.  Hacer clic en Guardar.
    *   **Resultado esperado:** Se envían peticiones POST (`SET_NUMBER_OF_PLAYERS` y `SET_LIST_PLAYERS`) al servidor, el modal se cierra y el menú se refresca. Los nuevos nombres quedan guardados y persisten al volver a consultarse.

*   **Caso 1.2: Reinicio de Jugadores**
    *   **Descripción:** Validar que la acción de resetear jugadores restablezca sus valores por defecto en el backend.
    *   **Acciones:**
        1.  Ir a "Configuración" -> "Resetear Jugadores".
    *   **Resultado esperado:** Se realiza la petición POST (`RESET_PLAYERS`) al servidor, los valores de los jugadores vuelven a su estado original de fábrica y el navegador muestra una alerta de confirmación con éxito.

*   **Caso 1.3: Modificación de Dimensiones del Tablero (`BoardMenu` y Modales)**
    *   **Descripción:** Comprobar que se pueden configurar las dimensiones de juego (Filas, Columnas y Fichas necesarias para ganar) y que se actualizan en el backend.
    *   **Acciones:**
        1.  Ir a "Configuración" -> "Tablero".
        2.  Hacer clic en "Editar Filas", ingresar un nuevo valor (ej. 8) y guardar.
        3.  Hacer clic en "Editar Columnas", ingresar un nuevo valor (ej. 9) y guardar.
        4.  Hacer clic en "Editar Conectar para ganar", ingresar un nuevo valor (ej. 5) y guardar.
    *   **Resultado esperado:** Los datos se actualizan en el backend (mediante peticiones POST a `ROWS`, `COLUMNS` y `CONECT_TO_WIN`), persistiendo los cambios para las siguientes partidas.

*   **Caso 1.4: Iniciar Juego (Transición del Menú Principal al Tablero)**
    *   **Descripción:** Validar que al seleccionar la opción de jugar ("Play" o "Jugar") desde el menú principal (`MainMenu`), la aplicación se comunica con el backend para iniciar la partida, limpia el menú y monta el tablero de juego.
    *   **Acciones:**
        1.  Estando en el menú principal (`MainMenu`), hacer clic en el botón de jugar.
    *   **Resultado esperado:** La interfaz del menú se limpia, se comunica con el backend para iniciar la sesión de juego y se renderiza visualmente el tablero.

---

### 2. Mecánica de Turnos e Inserción (`@gameplay` y `@e2e`)

*   **Caso 2.1: Colocar ficha en columna vacía**
    *   **Descripción:** Validar que al interactuar con una columna, la ficha se sitúa en la posición inferior correspondiente.
    *   **Acciones:** Hacer clic en la columna 1.
    *   **Resultado esperado:** La ficha del jugador actual aparece en la fila inferior de la columna 1.
*   **Caso 2.2: Alternancia de Turnos y Colores**
    *   **Descripción:** Comprobar que el sistema alterna de manera correcta entre los dos jugadores.
    *   **Acciones:**
        1.  Jugador 1 coloca una ficha en la columna 2.
        2.  Jugador 2 coloca una ficha en la columna 3.
    *   **Resultado esperado:**
        *   La ficha en la columna 2 es del color asignado al Jugador 1 (ej. Rojo).
        *   La ficha en la columna 3 es del color asignado al Jugador 2 (ej. Amarillo).
        *   El indicador de estado actualiza visualmente de quién es el turno.
*   **Caso 2.3: Apilamiento Físico (Gravedad)**
    *   **Descripción:** Comprobar que las fichas caen y se apilan adecuadamente sin flotar ni solaparse.
    *   **Acciones:** Colocar dos fichas consecutivas en la misma columna.
    *   **Resultado esperado:** La segunda ficha se apila en la celda inmediatamente superior a la primera ficha.

---

### 3. Condiciones de Fin de Partida y Reglas (`@victory` / `@gameover` y `@e2e`)

*   **Caso 3.1: Detección de Victoria Horizontal**
    *   **Descripción:** Validar que 4 fichas consecutivas del mismo color en línea horizontal detienen la partida y declaran ganador.
    *   **Acciones:** Realizar jugadas alternas hasta conseguir alinear 4 fichas consecutivas de forma horizontal para el Jugador 1.
    *   **Resultado esperado:** El juego finaliza, no se permiten nuevos clics en el tablero y el sistema muestra un mensaje claro indicando "¡Ganador: Jugador 1!".
*   **Caso 3.2: Detección de Victoria Vertical**
    *   **Descripción:** Validar que 4 fichas en línea vertical otorgan la victoria.
    *   **Acciones:** Realizar jugadas para alinear 4 fichas consecutivas de forma vertical para un jugador.
    *   **Resultado esperado:** El juego finaliza y se notifica al ganador.
*   **Caso 3.3: Detección de Victoria Diagonal**
    *   **Descripción:** Validar que 4 fichas alineadas diagonalmente finalizan el juego.
    *   **Acciones:** Colocar fichas estratégicamente para formar una diagonal de 4 fichas consecutivas del mismo color.
    *   **Resultado esperado:** Se detiene el tablero y se muestra al ganador.
*   **Caso 3.4: Detección de Empate**
    *   **Descripción:** Validar el comportamiento del juego al llenar por completo el tablero sin ganadores.
    *   **Acciones:** Completar la inserción en las 42 celdas del tablero bloqueando las líneas de 4.
    *   **Resultado esperado:** El tablero queda bloqueado y se muestra un mensaje de empate.

---

### 4. Reinicio y Navegación (`@navigation` y `@e2e`)

*   **Caso 4.1: Volver a Jugar (Reinicio de Tablero)**
    *   **Descripción:** Comprobar que al finalizar una partida, se puede restablecer el juego al estado inicial.
    *   **Acciones:** Tras finalizar una partida (por victoria o empate), hacer clic en el botón de reiniciar/volver a jugar.
    *   **Resultado esperado:** El tablero se limpia por completo, el turno se restablece al primer jugador y se puede jugar una nueva partida.
