export class HarnessController {
    /**
     * @param {ProgressModel} progressModel
     * @param {DiagramModel} diagramModel
     * @param {HarnessView} view
     */
    constructor(progressModel, diagramModel, view) {
        this.progressModel = progressModel;
        this.diagramModel = diagramModel;
        this.view = view;
        
        this.pollingIntervalId = null;
        this.isTabActive = 'progress';

        // Base de datos estática local con las especificaciones DbC de todos los agentes
        this.agentDetailsDb = {
            "AGENTINIT": {
                role: "Inicializador del Arnés Universal",
                precondicion: {
                    "paths_exists": "El archivo de mapeo paths.json debe existir y ser legible."
                },
                poscondicion: {
                    "directories_created": "Se ha creado y está disponible el directorio state/ en harness_universal/.",
                    "progress_initialized": "Se ha inicializado el archivo progress.md.",
                    "check_wip_success": "El script de validación check-wip.mjs se ejecuta con éxito."
                },
                invariant: {
                    "production_code_untouched": "Ningún código fuente de producción del proyecto objetivo puede ser alterado."
                }
            },
            "orchestator": {
                role: "Orquestador Central del Pipeline",
                precondicion: {
                    "state_valid": "El archivo de progreso progress.md contiene un estado y turno válidos."
                },
                poscondicion: {
                    "delegation": "Lee el turno actual y delega el control al agente correspondiente.",
                    "task_created": "Genera o actualiza el listado de tareas en el arnés."
                },
                invariant: {
                    "task_integrity": "El estado de las tareas debe reflejar fielmente el progreso de la sesión."
                }
            },
            "gitAGENT": {
                role: "Agente de Versionado de Git Reactivo",
                precondicion: {
                    "git_initialized": "El repositorio Git existe y es válido en el workspace."
                },
                poscondicion: {
                    "branch_created": "Crea una nueva rama al iniciar una característica (en turno specpartner).",
                    "commit_done": "Crea commits atómicos por cada agente al finalizar su respectivo turno.",
                    "merge_done": "Realiza el merge final a main (en turno verifiersession)."
                },
                invariant: {
                    "clean_history": "El historial de commits de Git debe mapear fielmente el flujo del pipeline."
                }
            },
            "specpartner": {
                role: "Especialista en Definición y Especificaciones",
                precondicion: {
                    "turn_active": "El turno en progress.md es specpartner.",
                    "task_assigned": "Existe una tarea activa en progreso en el listado de tareas."
                },
                poscondicion: {
                    "specs_created": "Define las especificaciones de comportamiento en target-project-spec.md.",
                    "git_branch": "Inicia la rama correspondiente de Git mediante gitAGENT."
                },
                invariant: {
                    "specs_match_requirements": "Las especificaciones deben alinearse exactamente con los requerimientos."
                }
            },
            "gherkinauthor": {
                role: "Autor de Escenarios de Prueba Gherkin",
                precondicion: {
                    "specs_ready": "Las especificaciones en target-project-spec.md están completas y aprobadas."
                },
                poscondicion: {
                    "features_created": "Escribe los escenarios de prueba en archivos .feature en la carpeta features/."
                },
                invariant: {
                    "gherkin_validity": "Los escenarios Gherkin deben ser sintácticamente válidos y sin ambigüedades."
                }
            },
            "desingpartner": {
                role: "Especialista en Diseño de Arquitectura POO",
                precondicion: {
                    "features_ready": "Los escenarios .feature existen y están validados."
                },
                poscondicion: {
                    "design_defined": "Diseña la estructura de clases en PlantUML y la propone para debate.",
                    "design_approved": "El diseño de clases es aprobado formalmente por el usuario."
                },
                invariant: {
                    "design_patterns": "El diseño propuesto debe seguir estrictamente buenas prácticas de POO y MVC."
                }
            },
            "testpartner": {
                role: "Especialista de Pruebas Unitarias e Integración (TDD)",
                precondicion: {
                    "design_approved": "El diseño de clases está aprobado y los archivos .feature están listos."
                },
                poscondicion: {
                    "tests_written": "Escribe los tests automatizados (TDD) en base al diseño y características."
                },
                invariant: {
                    "tdd_cycle": "Los tests deben escribirse primero y fallar antes de que se implemente el código."
                }
            },
            "codepartner": {
                role: "Especialista de Desarrollo de Código",
                precondicion: {
                    "tests_exist": "Los tests automatizados existen y fallan (fase roja del TDD)."
                },
                poscondicion: {
                    "code_implemented": "Escribe el código mínimo necesario para que pasen todos los tests (fase verde)."
                },
                invariant: {
                    "no_dead_code": "No se permite agregar código huérfano, no testeado o innecesario."
                }
            },
            "judge": {
                role: "Juez de Ejecución y Generación de Reportes",
                precondicion: {
                    "code_written": "El codepartner ha finalizado su implementación física."
                },
                poscondicion: {
                    "reports_generated": "Ejecuta los tests, mide la cobertura y guarda el resultado en judgereports/.",
                    "panteon_updated": "Registra los resultados en el panteón de ejecuciones."
                },
                invariant: {
                    "test_pass": "Todos los tests del proyecto objetivo deben pasar al 100%."
                }
            },
            "refactorpartner": {
                role: "Especialista en Refactorización y Calidad de Código",
                precondicion: {
                    "tests_pass": "Todos los tests están en verde (exitosos)."
                },
                poscondicion: {
                    "code_cleaned": "Optimiza y limpia la estructura del código sin cambiar su comportamiento externo."
                },
                invariant: {
                    "behavior_preserved": "Las pruebas deben permanecer en verde durante todo el refactoring."
                }
            },
            "mutationtester": {
                role: "Tester de Pruebas de Mutación",
                precondicion: {
                    "code_refactored": "El código ha pasado la fase inicial de refactorización."
                },
                poscondicion: {
                    "mutation_scores": "Ejecuta mutate.sh, calcula el Mutation Score y valida los tests contra mutantes."
                },
                invariant: {
                    "kill_mutants": "Asegura la robustez de la suite de pruebas eliminando mutantes sobrevivientes."
                }
            },
            "refactoringXP": {
                role: "Especialista en Programación Extrema (XP)",
                precondicion: {
                    "performance_needed": "Se requiere optimización de rendimiento o simplificación del código."
                },
                poscondicion: {
                    "xp_refactor_done": "Aplica técnicas extremas de refactorización para mejorar radicalmente el código."
                },
                invariant: {
                    "green_tests": "Las pruebas deben mantenerse exitosas y sin regresiones."
                }
            },
            "verifierfeacture": {
                role: "Verificador de Criterios de Aceptación de Características",
                precondicion: {
                    "mutation_testing_done": "Las pruebas de mutación se han completado."
                },
                poscondicion: {
                    "feature_verified": "Verifica formalmente que la feature implementada coincide con la especificación."
                },
                invariant: {
                    "scope_adherence": "Asegura que no se hayan introducido elementos fuera del alcance aprobado."
                }
            },
            "verifiersession": {
                role: "Verificador y Cierre de Sesión de Pair Programming",
                precondicion: {
                    "feature_verified": "La característica ha pasado la verificación de verifierfeacture."
                },
                poscondicion: {
                    "merge_success": "Realiza el merge final de la feature a la rama main de Git.",
                    "cleanup_done": "Ejecuta cleanupscanner.sh y limpia los archivos de estado temporales."
                },
                invariant: {
                    "main_branch_stable": "La rama main de producción debe permanecer siempre en un estado funcional."
                }
            }
        };
    }

    /**
     * Inicializa la aplicación y carga los datos.
     */
    async init() {
        // Enlazar eventos de la vista al controlador
        this.view.bindTabChange((tabName) => this.handleTabChange(tabName));
        this.view.bindRefresh(() => this.handleRefresh());
        this.view.bindAgentHover((agentName) => this.handleAgentHover(agentName));

        // Carga inicial
        this.view.showTab(this.isTabActive);
        await this.loadInitialData();
        
        // Iniciar polling automático cada 5 segundos (B.2: Refresco híbrido)
        this.startPolling();
    }

    /**
     * Carga todos los datos al iniciar.
     */
    async loadInitialData() {
        this.view.toggleLoading(true);
        try {
            // Cargar en paralelo
            await Promise.all([
                this.progressModel.fetchProgress(),
                this.diagramModel.fetchSvg()
            ]);

            // Renderizar datos en la vista
            this.view.renderProgress(
                this.progressModel.getTurn(),
                this.progressModel.getWip(),
                this.progressModel.getDecisions()
            );
            
            this.view.renderDiagram(this.diagramModel.getSvgContent());
        } catch (error) {
            this.view.showError(`Error al cargar datos iniciales: ${error.message}`);
        } finally {
            this.view.toggleLoading(false);
        }
    }

    /**
     * Maneja el cambio de pestañas.
     * @param {string} tabName
     */
    handleTabChange(tabName) {
        this.isTabActive = tabName;
        this.view.showTab(tabName);
    }

    /**
     * Refresco manual de los datos.
     */
    async handleRefresh() {
        this.view.toggleLoading(true);
        try {
            await this.progressModel.fetchProgress();
            
            // Volver a renderizar
            this.view.renderProgress(
                this.progressModel.getTurn(),
                this.progressModel.getWip(),
                this.progressModel.getDecisions()
            );
            
            // Cargar SVG de nuevo si es necesario
            await this.diagramModel.fetchSvg();
            this.view.renderDiagram(this.diagramModel.getSvgContent());
        } catch (error) {
            this.view.showError(`Error en actualización manual: ${error.message}`);
        } finally {
            this.view.toggleLoading(false);
        }
    }

    /**
     * Maneja el hover sobre un agente en el SVG interactivo.
     * @param {string|null} agentName Nombre del agente sobre el que se hace hover
     */
    handleAgentHover(agentName) {
        if (!agentName) {
            this.view.showAgentDetails(null, null);
            return;
        }

        // Buscar en la base de datos local (case insensitive para tolerar variaciones del SVG)
        const matchedKey = Object.keys(this.agentDetailsDb).find(
            key => key.toLowerCase() === agentName.toLowerCase()
        );

        if (matchedKey) {
            this.view.showAgentDetails(matchedKey, this.agentDetailsDb[matchedKey]);
        } else {
            // Si no se encuentra, mostrar datos genéricos de fallback
            this.view.showAgentDetails(agentName, {
                role: "Agente del Pipeline",
                precondicion: { "descripcion": "Especificación no definida" },
                poscondicion: { "descripcion": "Especificación no definida" },
                invariant: { "descripcion": "Especificación no definida" }
            });
        }
    }

    /**
     * Inicia el polling automático cada 5 segundos.
     */
    startPolling() {
        if (this.pollingIntervalId) return;

        this.pollingIntervalId = setInterval(async () => {
            try {
                // Almacenamos el turno y wip anteriores para verificar si han cambiado
                const prevTurn = this.progressModel.getTurn();
                const prevWip = this.progressModel.getWip();
                const prevDecisionsLength = this.progressModel.getDecisions().length;

                await this.progressModel.fetchProgress();

                const turnChanged = prevTurn !== this.progressModel.getTurn();
                const wipChanged = prevWip !== this.progressModel.getWip();
                const decisionsChanged = prevDecisionsLength !== this.progressModel.getDecisions().length;

                // Solo renderizamos si realmente hubo un cambio para evitar parpadeos visuales
                if (turnChanged || wipChanged || decisionsChanged) {
                    this.view.renderProgress(
                        this.progressModel.getTurn(),
                        this.progressModel.getWip(),
                        this.progressModel.getDecisions()
                    );
                }
            } catch (error) {
                // El error de polling se maneja silenciosamente para no interrumpir la experiencia,
                // pero se muestra en consola.
                console.warn("Error en polling de actualización de progreso:", error);
            }
        }, 5000);
    }

    /**
     * Detiene el polling.
     */
    stopPolling() {
        if (this.pollingIntervalId) {
            clearInterval(this.pollingIntervalId);
            this.pollingIntervalId = null;
        }
    }
}
