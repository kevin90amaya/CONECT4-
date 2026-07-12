# Diagrama de Flujo de Trabajo (El Flujo Conecta 4)

Este documento contiene la representación visual del ciclo de vida de una tarea dentro del Meta-Arnés. Ilustra los roles de los distintos agentes, las intervenciones humanas y los archivos que sirven como puntos de control a lo largo del proceso.

```mermaid
flowchart TD
    %% Entradas principales
    A("Orquestador<br/>(CREA TARES)")
    A --> |"2. Invoca"| B("spec_partner<br/>(Agente de Diseño)")
    B --> |"Escribe"| E["specs/*-spec.md<br/>(Borrador Técnico)"]
    E --> |"3. Cede flujo a"| F("gherkin_author<br/>(Agente de Contratos)")
    F --> |"Destila"| G["features/*.feature<br/>(Contrato Gherkin)"]
    G --> |" LEE specs y features"|H("generator_partner<br/>(Agente de Desarrollo)")
    H --> |"Escribe/Modifica"| I["Código Fuente /<br/>Configuraciones"]
    I --> |"5. Termina e Invoca"| J("feature_verifier<br/>(Auditor de Feature)")
    J --> |"Genera"| K["verifications/history/*_checklist.md"]
    K -.-> |"termina e invoca"| O("session_verifier<br/>(Auditor de Session)")
    O --> |"Evalúa punto por punto"| N["clean-state-checklist.md"]
    O --> |"Edita Exclusivamente"| M["Actualiza state/progress.md<br/>Crea state/session_handoff.md<br/>Actualiza diagrams/"]
    %% Estilos visuales
    linkStyle default stroke:#94a3b8,stroke-width:2px
```
