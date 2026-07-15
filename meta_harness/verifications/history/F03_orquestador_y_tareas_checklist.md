# Checklist de Verificación - F03 Agente Orchestrator y Capa de Tareas

Este documento contiene la verificación de cumplimiento de la característica F03 de la meta-harness, adaptada a las directivas de omisión del archivo .mjs.

## Escenarios de Verificación

### 1. Inicialización de la capa de tareas sin sobreescribir el archivo si ya existe
- [x] El archivo "target_feature_list.json" debe ser creado conteniendo un arreglo vacío
- [x] El archivo "target_feature_list.json" no debe ser sobreescrito para conservar el progreso histórico (si ya existía con tareas)

### 2. Creación física del dúo del agente Orchestrator
- [x] Deben existir los archivos "orchestator.md" y "orchestator.json" en el directorio `/workspaces/CONECT4-/harness_universal/agents/orchestator/`
- [x] El archivo "orchestator.md" debe definir el rol e instrucciones detallando que el agente respeta las reglas y contrato definidos en el JSON
- [x] El archivo "orchestator.json" debe cumplir exactamente con la estructura de contrato DbC definida, incluyendo "automaticMode" como falso y las opciones del menú

### 3. Interacción del Orquestador en su turno y modo interactivo
- [x] El Orquestador debe presentar un menú interactivo con las opciones de "menuOptions" al usuario
- [x] Las opciones presentadas deben incluir "Crear una nueva tarea", "Delegar un agente dependiendo de /state/progress" y "Otras consultas"
- [x] Al seleccionar la delegación y confirmar la acción, se debe realizar la transición al siguiente agente en "progress.md"

### 4. Ejecución del Orquestador cuando no es su turno
- [x] Debe informar en el chat o consola que no es el turno del orquestador (cuando es invocado fuera de su turno)
- [x] Debe finalizar sin alterar el estado de "progress.md" ni del backlog

### 5. Integración MVC de tareas en ViewHarness
- [x] Debe existir una clase de modelo de tareas que cargue y gestione los datos de "target_feature_list.json"
- [x] Se deben renderizar dinámicamente en tiempo real las tareas del backlog y sus estados mediante las extensiones del controlador y la vista en "ViewHarness"

### 6. Caso límite - Intento de delegación sin tareas activas en el backlog
- [x] Debe informar del error al usuario (cuando se intenta delegar sin tareas activas)
- [x] Debe restringir y abortar la transición del turno en "progress.md" hasta que se defina al menos una tarea activa

### 7. Caso límite - Lectura de progress.md con formato inválido
- [x] Debe informar de la anomalía de formato y abortar la ejecución o delegación inmediatamente

### 8. Cumplimiento de Precondiciones del DbC
- [x] El directorio "/workspaces/CONECT4-/harness_universal/state/" debe existir
- [x] El archivo "/workspaces/CONECT4-/harness_universal/state/progress.md" debe existir en disco

### 9. Cumplimiento de Poscondiciones del DbC
- [x] El archivo "/workspaces/CONECT4-/harness_universal/tareas/target_feature_list.json" debe estar creado y ser un JSON válido
- [x] Los archivos dúo de ejecución y contrato para el orquestador deben existir bajo "agents/orchestator/"
- [x] La transición del turno en "progress.md" debe actualizarse correctamente al delegar interactivamente

### 10. Cumplimiento de Invariantes del DbC
- [x] Ningún archivo del código fuente de producción del proyecto objetivo "conect4" bajo "src/" o definido en paths.json debe ser modificado, alterado o eliminado

## Evaluator Rubric

| Criterio | Puntuación (1-5) | Notas / Evidencia |
| :--- | :---: | :--- |
| **Funcionalidad** | 5 | Excelente: Backlog y MVC de tareas en ViewHarness totalmente funcionales. |
| **Respeto de Alcance de la característica** | 5 | Excelente: Alcance adaptado a la omisión de .mjs sin problemas. |
| **Calidad de Código** | 5 | Excelente: Arquitectura MVC clara, contratos DbC y reglas bien definidos. |

**Puntuación Total Estimada:** 15 / 15
