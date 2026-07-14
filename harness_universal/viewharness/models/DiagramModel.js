export class DiagramModel {
    constructor() {
        this.svgContent = '';
    }

    /**
     * Carga el archivo harnes_poo.svg desde una ruta relativa.
     */
    async fetchSvg() {
        try {
            // Se asume que index.html se ejecuta desde viewharness/
            // por lo tanto, harnes_poo.svg está en ../diagrams/harnes_poo.svg
            const response = await fetch('../diagrams/harnes_poo.svg', { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`No se pudo cargar el diagrama SVG: ${response.statusText}`);
            }
            this.svgContent = await response.text();
        } catch (error) {
            console.error("Error en DiagramModel.fetchSvg:", error);
            throw error;
        }
    }

    getSvgContent() {
        return this.svgContent;
    }
}
