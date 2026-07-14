Feature: F02 Vista de Harness Universal (ViewHarness)
  Como desarrollador del arnés universal
  Quiero disponer de una vista de dashboard premium, interactiva y autónoma
  Para visualizar el progreso actual del pipeline y los diagramas de arquitectura sin depender de servidores pesados

  Scenario: Renderizado de la interfaz premium con tema oscuro y navegación por pestañas
    Given que el usuario abre la vista "viewharness/index.html" en un navegador
    And la hoja de estilos "style.css" está cargada
    When la página se inicializa
    Then la interfaz debe mostrar una paleta de colores de tema oscuro (fondo oscuro y contrastes optimizados)
    And debe usar tipografías profesionales (como Outfit, Inter o Roboto)
    And la navegación por pestañas debe estar visible para alternar entre "Progreso" y "Diagramas"
    And al hacer clic en una pestaña se debe ocultar el contenido de la otra pestaña y mostrar el de la seleccionada
    And el diseño debe adaptarse correctamente a diferentes resoluciones de pantalla (responsivo)

  Scenario: Carga y parseo dinámico del progreso de ejecución
    Given que el archivo de progreso "/workspaces/CONECT4-/harness_universal/state/progress.md" existe en la ruta relativa "../state/progress.md"
    And contiene información sobre la tarea activa, fase activa, último turno y siguiente turno
    When el script "app.js" realiza la petición local para leer el archivo de progreso
    Then se debe parsear y renderizar dinámicamente el contenido de "progress.md" en el panel de Progreso
    And se debe mostrar de forma visual y gráfica la fase activa, el turno actual y el estado de WIP

  Scenario: Carga e interacción del diagrama SVG de arquitectura
    Given que el diagrama SVG "/workspaces/CONECT4-/harness_universal/diagrams/harnes_poo.svg" existe en la ruta relativa "../diagrams/harnes_poo.svg"
    When el usuario selecciona la pestaña de "Diagramas"
    Then el dashboard debe cargar e incrustar de forma interactiva el archivo SVG
    And el usuario debe poder interactuar con el diagrama (zoom, desplazamiento o tooltips de los componentes si están definidos)

  Scenario: Modo de ejecución autónomo local
    Given que la carpeta "viewharness/" contiene "index.html", "style.css" y "app.js"
    When se abre el archivo "index.html" directamente con el protocolo "file://" en el navegador
    Then la vista debe usar rutas relativas para cargar "progress.md" y "harnes_poo.svg"
    And debe funcionar sin requerir un servidor web HTTP pesado (como Apache, Nginx o node-modules de desarrollo complejos)

  Scenario: Cumplimiento de Precondiciones del DbC
    Given la inicialización de ViewHarness
    When se verifica el estado inicial del sistema
    Then el archivo "/workspaces/CONECT4-/harness_universal/state/progress.md" debe existir y ser legible
    And el archivo de diseño "/workspaces/CONECT4-/harness_universal/diagrams/harnes_poo.plantuml" debe existir

  Scenario: Cumplimiento de Poscondiciones del DbC
    Given la ejecución de ViewHarness
    When la vista se renderiza por completo
    Then deben estar creados los archivos "index.html", "style.css" y "app.js" en "/workspaces/CONECT4-/harness_universal/viewharness/"
    And el archivo SVG "/workspaces/CONECT4-/harness_universal/diagrams/harnes_poo.svg" debe estar generado a partir del PlantUML
    And el progreso y el diagrama deben ser interactivos en el navegador

  Scenario: Cumplimiento de Invariantes del DbC
    Given la ejecución o interacción con la vista ViewHarness
    When se realizan cambios o navegación en el dashboard
    Then ningún archivo del código fuente de producción del proyecto objetivo "conect4" debe ser modificado, eliminado o alterado
