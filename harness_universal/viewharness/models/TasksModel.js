export class TasksModel {
    constructor() {
        this.tasks = [];
    }

    /**
     * Carga el backlog de tareas desde la ruta relativa.
     */
    async fetchTasks() {
        try {
            // El dashboard index.html está en viewharness/, por lo tanto
            // target_feature_list.json está en ../tareas/target_feature_list.json
            const response = await fetch('../tareas/target_feature_list.json', { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`No se pudo cargar target_feature_list.json: ${response.statusText}`);
            }
            const data = await response.json();
            this.tasks = data.features || [];
        } catch (error) {
            console.error("Error en TasksModel.fetchTasks:", error);
            throw error;
        }
    }

    getTasks() {
        return this.tasks;
    }
}
