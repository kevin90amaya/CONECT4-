export class ProgressModel {
    constructor() {
        this.rawContent = '';
        this.turn = 'DESCONOCIDO';
        this.wip = 0;
        this.decisions = [];
    }

    /**
     * Carga el archivo progress.md desde una ruta relativa.
     */
    async fetchProgress() {
        try {
            // Se asume que index.html se ejecuta desde viewharness/
            // por lo tanto, progress.md está en ../state/progress.md
            const response = await fetch('../state/progress.md', { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`No se pudo cargar progress.md: ${response.statusText}`);
            }
            this.rawContent = await response.text();
            this.parseMarkdown(this.rawContent);
        } catch (error) {
            console.error("Error en ProgressModel.fetchProgress:", error);
            throw error;
        }
    }

    /**
     * Parsea el contenido markdown con expresiones regulares.
     * @param {string} mdText
     */
    parseMarkdown(mdText) {
        // Expresión regular para Turno actual: busca "**Turno actual:** AGENTINIT" o similar
        const turnMatch = mdText.match(/\*\*\s*Turno\s+actual\s*:\s*\*\*\s*([A-Za-z0-9_]+)/i) || 
                          mdText.match(/Turno\s+actual\s*:\s*\*?\*?\s*([A-Za-z0-9_]+)/i);
        if (turnMatch) {
            this.turn = turnMatch[1].trim();
        } else {
            this.turn = 'DESCONOCIDO';
        }

        // Expresión regular para WIP
        const wipMatch = mdText.match(/\*\*\s*WIP\s*:\s*\*\*\s*(\d+)/i) || 
                         mdText.match(/WIP\s*:\s*\*?\*?\s*(\d+)/i);
        if (wipMatch) {
            this.wip = parseInt(wipMatch[1].trim(), 10);
        } else {
            this.wip = 0;
        }

        // Extraer decisiones si existen
        // Busca viñetas que comiencen con algo indicando decisión, o secciones
        this.decisions = [];
        const lines = mdText.split('\n');
        let inDecisionsSection = false;
        
        for (const line of lines) {
            if (line.match(/^##\s*Decisiones/i)) {
                inDecisionsSection = true;
                continue;
            } else if (line.match(/^##\s*/)) {
                inDecisionsSection = false;
            }

            if (inDecisionsSection) {
                const decisionMatch = line.match(/^\s*[\-\*]\s*(.+)/);
                if (decisionMatch) {
                    this.decisions.push(decisionMatch[1].trim());
                }
            }
        }
    }

    getTurn() {
        return this.turn;
    }

    getWip() {
        return this.wip;
    }

    getDecisions() {
        return this.decisions;
    }

    getRawContent() {
        return this.rawContent;
    }
}
