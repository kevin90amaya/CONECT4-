# aqui se guardan agustes pendientes de este meta_arnes y de bob-harness 

deves listar los pendientes y preguntar si es momento de resolverlos y luego actualizar este archivo

pendientes 

- [x] 1. Crear una carpeta en `meta_harness` para guardar diagramas del estado actual del `meta_harness`.
- [x] 2. Crear distintos tipos de diagramas que representen el estado actual del `meta_harness`.
- [x] 3. Estudiar y traer estas funcionalidades del `bob-harness` hacia el `meta_harness` (referente al pipeline de `spec_partner`, `gherkin_author` y la puerta humana de aprobación)."FALTA verificacion como esta en el bob-harness"
 - [x] 4. añdir Graphify para mapear los arneses"la idea sentral es que deve formar parte de los sistemas o como un subsistema que serviria a los sestemas principales del meta-harness"
 - [x] 5. CONFIGUARA Graphify EN META HARNESS PARA QUE LOS AGENTES LO PEDEAN USAR O UTILIZAR LOS MAPAS QUE CREO PARA AYUDARLOS EN LAS FASES EXPLORATORIAS QUE ES DONDE MAS RECURSOSO HAORRA
   - [x] 5.1. Asegurar instalación con soporte Gemini desde el código fuente local e ignorar `.env` en Git de forma segura.
   - [x] 5.2. Resolver el bloqueo de cuota (HTTP 429) al mapear masivamente con la capa gratuita (Free Tier) de Gemini.
   - [x] 5.3. Explorar alternativas de mapeo: procesar por subcarpetas progresivamente, aumentar la cuota, o usar LLMs alternativos. (Solucionado con Throttled Extraction local)
   - [x] ~~5.4. Indicarle a los agentes que tienen que usar en sus fases exploratorias el mapa de graphify, para ahorrar contexto.~~ *(Cancelado: Tras auditoría manual, se comprobó que Graphify omite referencias críticas. Se reemplaza por el 5.5).*
   - [x] 5.5. Diseñar y construir un Mapeador Interno Propio (Harness Mapper) con validación cruzada entre agentes. Ver justificación y debate en `docs/graphify_analysis_conversation.md`. *(Completado y mapeo finalizado).*
   - [ ] 6. INTEGRAR HARNESS MAPPER , HAY QUE INDICARLE A LOS AGENTES COMO USARLO EN FASES EXPLORATORIAS
- [ ] 7. code-review-graph para mapear el src." esta si deve ser una caracteristica o funcionalidad del bob-harness "
