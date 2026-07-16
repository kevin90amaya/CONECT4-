# 🧠 Meta-Arnés de Pair Programming (Enrutador de Sesión)

Este documento es el enrutador central del repositorio. El **Meta-Arnés** es el entorno de orquestación donde los agentes especializados interactúan, planifican, diseñan y auditan tareas antes de modificar el código de producción.

> [!IMPORTANT]
> **Acción Inmediata:** Si acabas de iniciar sesión o perder contexto, **DEBES** leer `/workspaces/CONECT4-/meta_harness/agents/ORCHESTRATOR.md` antes de hacer cualquier otra cosa.

---

## 📋 Tabla de Contenidos

- [Propósito del Meta-Arnés](#-propósito-del-meta-arnés)
- [Estructura del Directorio](#-estructura-del-directorio)
- [Flujo de Trabajo (El Flujo Bob)](#-flujo-de-trabajo-el-flujo-bob)
- [Reglas y Límites](#-reglas-y-límites)

---

## 🎯 Propósito del Meta-Arnés

El Meta-Arnés se encarga de:
- **Orquestar Agentes:** Coordinar a los especialistas (Orquestador, Spec Partner, Gherkin Author, Generator Partner, etc.).
- **Gestionar el Estado:** Mantener la memoria de la sesión y el progreso a través de handoffs.
- **Auditoría Estricta:** Asegurar que cada paso de desarrollo esté precedido por especificaciones, casos de prueba (Gherkin) y aprobación humana explícita.
- **Desarrollo del Arnés:** Mejorarse a sí mismo y construir el `harness_universal`.

---

## 📁 Estructura del Directorio

```text
meta_harness/
├── agents/                  # Instrucciones y reglas para agentes
│   └── ORCHESTRATOR.md      # Archivo CRÍTICO de inicio para agentes
├── diagrams/                # Diagramas de arquitectura y estado
├── docs/                    # Documentación y manifiestos
├── estructura/              # Definiciones de arquitectura (META_ARCHITECTURE, etc.)
├── features/                # Archivos .feature (Escenarios Gherkin)
├── scripts/                 # Utilidades del arnés
├── specs/                   # Especificaciones de proyectos (Debates y planes)
├── state/                   # Estado de la sesión (handoff, progress, pendings)
├── tareas/                  # Listas de tareas (meta y target feature lists en JSON)
├── verifications/           # Auditorías y checklists generados por el feature_verifier
├── .agents/                 # Configuraciones locales de agentes
├── clean-state-checklist.md # Checklist de estado limpio para cierres de sesión
├── init_meta.sh             # Script de inicialización
└── README.md                # Este enrutador central
```

---

## 🔄 Flujo de Trabajo (El Flujo Bob)

Toda tarea debe seguir este ciclo estricto (WIP=1):

1. **Debate y Plan (`spec_partner`)**: Se crea un documento de especificación y se actualiza el estado de la tarea.
2. **Destilación Gherkin (`gherkin_author`)**: Se extraen los escenarios de comportamiento.
3. **Puerta Humana Obligatoria**: Se requiere aprobación explícita antes de programar.
4. **Desarrollo (`generator_partner`)**: El generador escribe el código.
5. **Auditoría (`feature_verifier`)**: Se audita la implementación y se genera una rúbrica.
6. **Handoff (`session_verifier`)**: Evaluación de cierre y relevo de sesión.

---

## 🛡️ Reglas y Límites

- Las reglas, límites de alcance y las **Instrucciones Estrictas de Reinicio** han sido movidas a `agents/ORCHESTRATOR.md` para mantener un entorno legible para los agentes (siguiendo el patrón de separación de arquitectura y producto).
- **Prohibido** tomar decisiones sin preguntar y ofrecer opciones (A, B, C...).
- **Lecturas Obligatorias:** Cada agente debe consultar siempre los archivos en `state/` antes de actuar.