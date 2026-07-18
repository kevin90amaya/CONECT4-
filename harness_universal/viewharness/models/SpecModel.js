export class SpecModel {
    constructor() {
        this.rawContent = '';
    }

    /**
     * Carga el archivo target-project-spec.md desde una ruta relativa.
     */
    async fetchSpec() {
        try {
            // El archivo index.html se ejecuta desde viewharness/
            // por lo que target-project-spec.md se encuentra en ../specs/target-project-spec.md
            const response = await fetch('../specs/target-project-spec.md', { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`No se pudo cargar la especificación: ${response.statusText}`);
            }
            this.rawContent = await response.text();
        } catch (error) {
            console.error("Error en SpecModel.fetchSpec:", error);
            throw error;
        }
    }

    getRawContent() {
        return this.rawContent;
    }
}
