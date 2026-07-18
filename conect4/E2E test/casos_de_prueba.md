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

#### Suite 1.1: Configuraciones de Jugadores

**Descripción:** Suite de pruebas para validar la configuración de jugadores, incluyendo modificación de nombres, colores, tipos, cantidad y validación de restricciones de duplicados.

*   **Caso 1.1.1: Abrir y cerrar modal de configuración de jugadores**
    *   **Acciones:**
        1.  Desde `MainMenu`, ir a "Configuración" -> "Jugadores".
        2.  Entrar a "Editar Jugadores" para levantar el modal (`EditPlayersModal`).
        3.  Hacer clic en "Cancelar".
    *   **Resultado esperado:** El modal se abre correctamente y se cierra al hacer clic en cancelar.

*   **Caso 1.1.2: Modificar nombres de jugadores y persistir en servidor**
    *   **Acciones:**
        1.  Abrir el modal de "Editar Jugadores".
        2.  Modificar el nombre del primer jugador.
        3.  Hacer clic en Guardar.
        4.  Reabrir el modal para verificar.
    *   **Resultado esperado:** El nombre se guarda en el servidor y persiste al volver a consultarse.

*   **Caso 1.1.3: Cambiar color de jugador y persistir**
    *   **Acciones:**
        1.  Abrir el modal de "Editar Jugadores".
        2.  Cambiar el color del primer jugador.
        3.  Hacer clic en Guardar.
        4.  Reabrir el modal para verificar.
    *   **Resultado esperado:** El color se guarda en el servidor y persiste al volver a consultarse.

*   **Caso 1.1.4: Cambiar tipo de jugador (HUMAN/COMPUTER) y persistir**
    *   **Acciones:**
        1.  Abrir el modal de "Editar Jugadores".
        2.  Cambiar el tipo del primer jugador a COMPUTER.
        3.  Hacer clic en Guardar.
        4.  Reabrir el modal para verificar.
    *   **Resultado esperado:** El tipo se guarda en el servidor y persiste al volver a consultarse.

*   **Caso 1.1.5: Agregar un nuevo jugador y persistir**
    *   **Acciones:**
        1.  Abrir el modal de "Editar Jugadores".
        2.  Hacer clic en "Agregar Jugador".
        3.  Ingresar nombre y color para el nuevo jugador.
        4.  Hacer clic en Guardar.
        5.  Reabrir el modal para verificar.
    *   **Resultado esperado:** El nuevo jugador se agrega y persiste al volver a consultarse.

*   **Caso 1.1.6: Eliminar un jugador y persistir**
    *   **Acciones:**
        1.  Abrir el modal de "Editar Jugadores".
        2.  Agregar un jugador temporal.
        3.  Guardar cambios.
        4.  Reabrir el modal.
        5.  Eliminar el jugador agregado.
        6.  Guardar cambios.
        7.  Reabrir el modal para verificar.
    *   **Resultado esperado:** El jugador se elimina y el cambio persiste al volver a consultarse.

*   **Caso 1.1.7: Validar error al guardar nombre duplicado**
    *   **Acciones:**
        1.  Abrir el modal de "Editar Jugadores".
        2.  Establecer el nombre del segundo jugador igual al primero.
        3.  Hacer clic en Guardar.
    *   **Resultado esperado:** Se muestra un error indicando que el nombre ya está en uso y los cambios no se aplican.

*   **Caso 1.1.8: Validar error al guardar color duplicado**
    *   **Acciones:**
        1.  Abrir el modal de "Editar Jugadores".
        2.  Establecer el color del segundo jugador igual al primero.
        3.  Hacer clic en Guardar.
    *   **Resultado esperado:** Se muestra un error indicando que el color ya está en uso y los cambios no se aplican.

**Nota:** Después de cada test en esta suite, se ejecuta automáticamente una acción de limpieza que resetea los jugadores a sus valores por defecto mediante la petición POST (`RESET_PLAYERS`) al servidor.

#### Suite 1.2: configuraciones del Tablero

**Descripción:** Suite de pruebas E2E para validar la configuración del tablero (filas, columnas y fichas necesarias para ganar). Las validaciones detalladas de rangos y restricciones se encuentran en las pruebas unitarias del board.

**Restricciones:**
- **Filas:** default 6, mínimo 3, máximo 30
- **Columnas:** default 7, mínimo 3, máximo 30
- **Conecta para ganar:** default 4, mínimo 3, máximo dinámico (valor más grande entre filas o columnas)

*   **Caso 1.2.1: Modificar las tres variables del tablero y verificar persistencia**
    *   **Acciones:**
        1.  Ir a "Configuración" -> "Tablero".
        2.  Establecer filas en 8, columnas en 9 y conectar para ganar en 5.
        3.  Guardar cambios.
        4.  Reabrir el modal de configuración del tablero.
    *   **Resultado esperado:** Los tres valores se actualizan en el backend (mediante peticiones POST a `ROWS`, `COLUMNS` y `CONECT_TO_WIN`) y persisten al reabrir el modal.

*   **Caso 1.2.2: Validar máximo dinámico de conectar para ganar**
    *   **Acciones:**
        1.  Ir a "Configuración" -> "Tablero".
        2.  Establecer filas en 10 y columnas en 7, guardar.
        3.  Establecer conectar para ganar en 10 (igual al máximo dinámico max(10, 7) = 10) y guardar.
        4.  Reabrir el modal para verificar.
    *   **Resultado esperado:** El valor de conectar para ganar se acepta y persiste correctamente, respetando el máximo dinámico basado en las dimensiones del tablero.

**Nota:** Después de cada test en esta suite, se ejecuta automáticamente una acción de limpieza que resetea el tablero a sus valores por defecto (6 filas, 7 columnas, 4 para ganar) mediante peticiones POST al servidor.

#### Suite 1.3: Iniciar Juego

*   **Caso 1.3.1: Transición del Menú Principal al Tablero**
    *   **Descripción:** Validar que al seleccionar la opción de jugar ("Play" o "Jugar") desde el menú principal (`MainMenu`), la aplicación se comunica con el backend para iniciar la partida, limpia el menú y monta el tablero de juego.
    *   **Acciones:**
        1.  Estando en el menú principal (`MainMenu`), hacer clic en el botón de jugar.
    *   **Resultado esperado:** La interfaz del menú se limpia, se comunica con el backend para iniciar la sesión de juego y se renderiza visualmente el tablero.

---

### 2. Mecánica de Turnos e Inserción (`@gameplay` y `@e2e`)

#### Suite 2.1: Inserción de Fichas

*   **Caso 2.1.1: Colocar ficha en columna vacía**
    *   **Descripción:** Validar que al interactuar con una columna, la ficha se sitúa en la posición inferior correspondiente.
    *   **Acciones:** Hacer clic en la columna 1.
    *   **Resultado esperado:** La ficha del jugador actual aparece en la fila inferior de la columna 1.

#### Suite 2.2: Alternancia de Turnos

*   **Caso 2.2.1: Alternancia de Turnos y Colores**
    *   **Descripción:** Comprobar que el sistema alterna de manera correcta entre los dos jugadores.
    *   **Acciones:**
        1.  Jugador 1 coloca una ficha en la columna 2.
        2.  Jugador 2 coloca una ficha en la columna 3.
    *   **Resultado esperado:**
        *   La ficha en la columna 2 es del color asignado al Jugador 1 (ej. Rojo).
        *   La ficha en la columna 3 es del color asignado al Jugador 2 (ej. Amarillo).
        *   El indicador de estado actualiza visualmente de quién es el turno.

#### Suite 2.3: Gravedad y Apilamiento

*   **Caso 2.3.1: Apilamiento Físico (Gravedad)**
    *   **Descripción:** Comprobar que las fichas caen y se apilan adecuadamente sin flotar ni solaparse.
    *   **Acciones:** Colocar dos fichas consecutivas en la misma columna.
    *   **Resultado esperado:** La segunda ficha se apila en la celda inmediatamente superior a la primera ficha.

---

### 3. Condiciones de Fin de Partida y Reglas (`@victory` / `@gameover` y `@e2e`)

#### Suite 3.1: Detección de Victoria

*   **Caso 3.1.1: Detección de Victoria Horizontal**
    *   **Descripción:** Validar que 4 fichas consecutivas del mismo color en línea horizontal detienen la partida y declaran ganador.
    *   **Acciones:** Realizar jugadas alternas hasta conseguir alinear 4 fichas consecutivas de forma horizontal para el Jugador 1.
    *   **Resultado esperado:** El juego finaliza, no se permiten nuevos clics en el tablero y el sistema muestra un mensaje claro indicando "¡Ganador: Jugador 1!".

*   **Caso 3.1.2: Detección de Victoria Vertical**
    *   **Descripción:** Validar que 4 fichas en línea vertical otorgan la victoria.
    *   **Acciones:** Realizar jugadas para alinear 4 fichas consecutivas de forma vertical para un jugador.
    *   **Resultado esperado:** El juego finaliza y se notifica al ganador.

*   **Caso 3.1.3: Detección de Victoria Diagonal**
    *   **Descripción:** Validar que 4 fichas alineadas diagonalmente finalizan el juego.
    *   **Acciones:** Colocar fichas estratégicamente para formar una diagonal de 4 fichas consecutivas del mismo color.
    *   **Resultado esperado:** Se detiene el tablero y se muestra al ganador.

#### Suite 3.2: Detección de Empate

*   **Caso 3.2.1: Detección de Empate**
    *   **Descripción:** Validar el comportamiento del juego al llenar por completo el tablero sin ganadores.
    *   **Acciones:** Completar la inserción en las 42 celdas del tablero bloqueando las líneas de 4.
    *   **Resultado esperado:** El tablero queda bloqueado y se muestra un mensaje de empate.

---

### 4. Reinicio y Navegación (`@navigation` y `@e2e`)

#### Suite 4.1: Reinicio de Partida

*   **Caso 4.1.1: Volver a Jugar (Reinicio de Tablero)**
    *   **Descripción:** Comprobar que al finalizar una partida, se puede restablecer el juego al estado inicial.
    *   **Acciones:** Tras finalizar una partida (por victoria o empate), hacer clic en el botón de reiniciar/volver a jugar.
    *   **Resultado esperado:** El tablero se limpia por completo, el turno se restablece al primer jugador y se puede jugar una nueva partida.
