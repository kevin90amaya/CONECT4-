export class HarnessView {
    constructor() {
        // Cachear elementos del DOM
        this.appContainer = document.getElementById('app');
        this.btnProgressTab = document.getElementById('btn-progress-tab');
        this.btnDiagramTab = document.getElementById('btn-diagram-tab');
        this.panelProgress = document.getElementById('panel-progress');
        this.panelDiagram = document.getElementById('panel-diagram');
        
        this.loadingOverlay = document.getElementById('loading-overlay');
        this.errorToast = document.getElementById('error-toast');
        this.errorMessage = document.getElementById('error-message');
        
        // Elementos de progreso
        this.turnValue = document.getElementById('turn-value');
        this.wipValue = document.getElementById('wip-value');
        this.wipWarning = document.getElementById('wip-warning');
        this.decisionsList = document.getElementById('decisions-list');
        this.btnRefresh = document.getElementById('btn-refresh');
        this.lastUpdatedValue = document.getElementById('last-updated-value');
        
        // Elementos del diagrama
        this.svgContainer = document.getElementById('svg-container');
        this.agentDetailsPanel = document.getElementById('agent-details-panel');
        this.agentDetailsPlaceholder = document.getElementById('agent-details-placeholder');
        this.agentDetailsContent = document.getElementById('agent-details-content');
        
        this.agentNameEl = document.getElementById('agent-name');
        this.agentRoleEl = document.getElementById('agent-role');
        this.agentPreEl = document.getElementById('agent-pre');
        this.agentPostEl = document.getElementById('agent-post');
        this.agentInvEl = document.getElementById('agent-inv');
        
        // Manejador del hover de agentes
        this.onAgentHover = null;
    }

    /**
     * Vincula el cambio de pestañas.
     * @param {Function} handler Callback con el nombre de la pestaña ('progress' | 'diagram')
     */
    bindTabChange(handler) {
        this.btnProgressTab.addEventListener('click', () => handler('progress'));
        this.btnDiagramTab.addEventListener('click', () => handler('diagram'));
    }

    /**
     * Vincula el botón de refresco.
     * @param {Function} handler Callback para recargar los datos
     */
    bindRefresh(handler) {
        this.btnRefresh.addEventListener('click', () => handler());
    }

    /**
     * Vincula el evento de hover del SVG.
     * @param {Function} handler Callback al hacer hover sobre un agente: handler(agentName)
     */
    bindAgentHover(handler) {
        this.onAgentHover = handler;
    }

    /**
     * Alterna la visualización de las pestañas.
     * @param {string} tabName Nombre de la pestaña ('progress' o 'diagram')
     */
    showTab(tabName) {
        if (tabName === 'progress') {
            this.btnProgressTab.classList.add('tab-active');
            this.btnDiagramTab.classList.remove('tab-active');
            this.panelProgress.classList.remove('hidden');
            this.panelDiagram.classList.add('hidden');
        } else {
            this.btnProgressTab.classList.remove('tab-active');
            this.btnDiagramTab.classList.add('tab-active');
            this.panelProgress.classList.add('hidden');
            this.panelDiagram.classList.remove('hidden');
        }
    }

    /**
     * Renderiza el estado de progreso.
     * @param {string} turn
     * @param {number} wip
     * @param {Array<string>} decisions
     */
    renderProgress(turn, wip, decisions) {
        this.turnValue.textContent = turn;
        this.wipValue.textContent = wip;
        
        // Actualizar advertencia de WIP si es mayor que 1
        if (wip > 1) {
            this.wipWarning.classList.remove('hidden');
            this.wipValue.classList.add('text-danger');
        } else {
            this.wipWarning.classList.add('hidden');
            this.wipValue.classList.remove('text-danger');
        }

        // Renderizar decisiones
        this.decisionsList.innerHTML = '';
        if (decisions && decisions.length > 0) {
            decisions.forEach(decision => {
                const li = document.createElement('li');
                li.className = 'decision-item';
                li.textContent = decision;
                this.decisionsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.className = 'decision-item-empty';
            li.textContent = 'No hay decisiones registradas aún.';
            this.decisionsList.appendChild(li);
        }

        // Actualizar hora de última actualización
        const now = new Date();
        this.lastUpdatedValue.textContent = now.toLocaleTimeString();

        // Resaltar agente de turno en el SVG si ya se renderizó
        this.highlightActiveAgentInSvg(turn);
    }

    /**
     * Renderiza e inicializa los eventos del SVG.
     * @param {string} svgContent
     */
    renderDiagram(svgContent) {
        this.svgContainer.innerHTML = svgContent;
        
        // Asociar eventos a todos los elementos del SVG que representen agentes
        // En nuestro SVG a medida usaremos el atributo [data-agent] en los grupos <g>
        const agentElements = this.svgContainer.querySelectorAll('[data-agent]');
        
        agentElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const agentName = el.getAttribute('data-agent');
                
                // Efecto visual hover en SVG
                el.classList.add('svg-agent-hover');
                
                if (this.onAgentHover) {
                    this.onAgentHover(agentName);
                }
            });

            el.addEventListener('mouseleave', (e) => {
                el.classList.remove('svg-agent-hover');
                
                if (this.onAgentHover) {
                    this.onAgentHover(null);
                }
            });
            
            // Soporte para pantallas táctiles (clic/touch)
            el.addEventListener('click', (e) => {
                const agentName = el.getAttribute('data-agent');
                // Quitar hover de otros elementos
                agentElements.forEach(other => other.classList.remove('svg-agent-hover'));
                el.classList.add('svg-agent-hover');
                
                if (this.onAgentHover) {
                    this.onAgentHover(agentName);
                }
                e.stopPropagation();
            });
        });

        // Limpiar hover si se hace clic fuera de los agentes en el SVG
        const svgEl = this.svgContainer.querySelector('svg');
        if (svgEl) {
            svgEl.addEventListener('click', () => {
                agentElements.forEach(el => el.classList.remove('svg-agent-hover'));
                if (this.onAgentHover) this.onAgentHover(null);
            });
        }

        // Si ya hay un turno cargado, resaltarlo
        const currentTurn = this.turnValue.textContent;
        if (currentTurn) {
            this.highlightActiveAgentInSvg(currentTurn);
        }
    }

    /**
     * Resalta visualmente el agente que tiene el turno actual en el SVG.
     * @param {string} turnName
     */
    highlightActiveAgentInSvg(turnName) {
        const agentElements = this.svgContainer.querySelectorAll('[data-agent]');
        agentElements.forEach(el => {
            const agentName = el.getAttribute('data-agent');
            if (agentName && agentName.toLowerCase() === turnName.toLowerCase()) {
                el.classList.add('svg-agent-active');
            } else {
                el.classList.remove('svg-agent-active');
            }
        });
    }

    /**
     * Muestra la información de un agente en el panel lateral.
     * @param {string} agentName
     * @param {Object} details Detalles del agente (role, precondicion, poscondicion, invariant, etc.)
     */
    showAgentDetails(agentName, details) {
        if (!agentName || !details) {
            // Mostrar placeholder y ocultar contenido
            this.agentDetailsPlaceholder.classList.remove('hidden');
            this.agentDetailsContent.classList.add('hidden');
            return;
        }

        // Mostrar contenido y ocultar placeholder
        this.agentDetailsPlaceholder.classList.add('hidden');
        this.agentDetailsContent.classList.remove('hidden');

        // Llenar datos
        this.agentNameEl.textContent = agentName;
        this.agentRoleEl.textContent = details.role || 'Sin rol especificado';
        
        // Precondición
        this.agentPreEl.innerHTML = '';
        if (details.precondicion) {
            Object.entries(details.precondicion).forEach(([key, val]) => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${key}:</strong> ${val}`;
                this.agentPreEl.appendChild(li);
            });
        } else {
            this.agentPreEl.innerHTML = '<li>Ninguna</li>';
        }

        // Postcondición
        this.agentPostEl.innerHTML = '';
        if (details.poscondicion) {
            Object.entries(details.poscondicion).forEach(([key, val]) => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${key}:</strong> ${val}`;
                this.agentPostEl.appendChild(li);
            });
        } else {
            this.agentPostEl.innerHTML = '<li>Ninguna</li>';
        }

        // Invariante
        this.agentInvEl.innerHTML = '';
        if (details.invariant) {
            Object.entries(details.invariant).forEach(([key, val]) => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${key}:</strong> ${val}`;
                this.agentInvEl.appendChild(li);
            });
        } else {
            this.agentInvEl.innerHTML = '<li>Ninguna</li>';
        }
    }

    /**
     * Muestra/oculta el overlay de carga.
     * @param {boolean} show
     */
    toggleLoading(show) {
        if (show) {
            this.loadingOverlay.classList.remove('hidden');
        } else {
            this.loadingOverlay.classList.add('hidden');
        }
    }

    /**
     * Muestra un mensaje de error elegante.
     * @param {string} message
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorToast.classList.remove('hidden');
        
        // Ocultar automáticamente después de 5 segundos
        setTimeout(() => {
            this.errorToast.classList.add('hidden');
        }, 5000);
    }
}
