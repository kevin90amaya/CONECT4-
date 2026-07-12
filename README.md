# Conect4

Este es un proyecto web del clásico juego **Conecta 4**, desarrollado como una aplicación web completa.

## 🛠️ Tecnologías Utilizadas

El proyecto utiliza un conjunto robusto de tecnologías modernas, integrando un backend en Java con herramientas avanzadas para el desarrollo y pruebas del frontend:

### Backend
* **Java 21**: Lenguaje de programación principal.
* **Spring Boot**: Framework central para la aplicación.
  * **Spring Web MVC**: Para la arquitectura web y controladores.
  * **Spring Data JPA**: Para el manejo y persistencia de datos.
  * **Mustache**: Motor de plantillas (Server-Side Rendering) para generar las vistas dinámicas.
* **H2 Database**: Base de datos relacional en memoria, muy útil para el desarrollo y pruebas rápidas.
* **Maven**: Herramienta principal de construcción y gestión de dependencias (`pom.xml`).
* **JUnit & Hamcrest**: Frameworks para pruebas unitarias y de integración en Java.

### Frontend y Entorno de Pruebas (Node.js)
* **Vite**: Herramienta de empaquetado (bundler) y servidor de desarrollo súper rápido para los recursos del cliente.
* **Jest**: Framework principal para las pruebas unitarias del código JavaScript del frontend (incluyendo soporte para JSDOM).
* **Playwright**: Herramienta para realizar pruebas de integración y End-to-End (E2E) directamente sobre navegadores reales.
* **Babel**: Compilador de JavaScript de próxima generación.
* **NPM**: Gestor de dependencias para el ecosistema de JavaScript (`package.json`).

## 🎮 Características y Casos de Uso

El proyecto está diseñado bajo un modelo Cliente-Servidor (CSR) donde el frontend en JavaScript orquesta la interfaz y se comunica de manera constante y asíncrona con la API de Spring Boot.

### Casos de Uso del Menú
El menú de la aplicación es interactivo y ofrece opciones para personalizar completamente la experiencia de juego:
* **Internacionalización**: Cambiar el idioma de la interfaz (Inglés / Español) dinámicamente.
* **Inicio de Partida**: Oculta el menú y despliega el tablero de juego para empezar a jugar.
* **Configuración de Victoria**: Definir cuántas fichas consecutivas se necesitan para ganar (conect-to-win).
* **Dimensiones del Tablero**: Personalizar el tamaño de la cuadrícula ajustando el número de filas y columnas.
* **Configuración de Jugadores**: Modificar la cantidad de participantes y asignarles el control (Humano o Máquina automatizada).
* **Restablecer Ajustes**: Devolver todas las configuraciones de los jugadores a sus valores por defecto.
* **Navegación Fluida**: Sistema de menús anidados que permiten explorar submenús y volver atrás fácilmente.

### Casos de Uso del Juego
Durante la partida, el juego ofrece un control completo del flujo y una gran interactividad:
* **Selección de Modo de Juego**: Permite configurar el tipo de enfrentamiento al iniciar (Humano vs Humano, Humano vs Máquina, etc.).
* **Gestión de Turnos Automática**: El sistema controla a quién le toca jugar y solicita el movimiento mediante la interfaz interactiva (si es humano) o lo ejecuta directamente (si es máquina).
* **Auto-escalado Dinámico**: Posibilidad de reajustar el tamaño del tablero mediante controles "Toggle" en tiempo real o restablecerlo a la medida clásica (6x7).
* **Detección Automática de Resultados**: Tras cada jugada, se valida el estado de la partida detectando:
  * Transición al siguiente turno.
  * Condición de victoria de uno de los jugadores.
  * Condición de empate cuando el tablero se llena.
  * Movimientos inválidos (como intentar insertar una ficha en una columna llena).
* **Continuación y Reinicio**: Diálogo interactivo al terminar la partida para decidir si jugar otra ronda (reiniciando automáticamente el estado en el servidor) o regresar al menú principal.

## 🚀 Cómo ejecutar el proyecto

### Requisitos Previos
* **Java 21**
* **Maven** (o usar el wrapper incluido `./mvnw`)
* **Node.js** y **NPM**
* **Docker** (opcional, necesario si se desea ejecutar la aplicación mediante contenedores)

### Levantar la aplicación

#### Opción 1: De forma local (Desarrollo)

1. Navega al directorio de la aplicación:
   ```bash
   cd conect4
   ```

2. Inicia la aplicación con Spring Boot:
   ```bash
   mvn spring-boot:run
   ```
   La aplicación se levantará normalmente en `http://localhost:8080`.

#### Opción 2: Usando Docker (Contenedorizado)

El proyecto cuenta con un `Dockerfile` optimizado con compilación multi-etapa (*multi-stage build*) que automatiza la instalación de Node.js, compila los recursos del frontend con Vite, compila el backend de Java con Maven y genera una imagen final ligera basada en Alpine.

1. Navega al directorio donde se encuentra el `Dockerfile`:
   ```bash
   cd conect4
   ```

2. Construye la imagen Docker localmente:
   ```bash
   docker build -t spring-boot-docker .
   ```

3. Inicia el contenedor mapeando el puerto `8080`:
   ```bash
   docker run -d -p 8080:8080 --name conect4-app spring-boot-docker
   ```
   La aplicación estará disponible en `http://localhost:8080`.

4. Para detener y eliminar el contenedor activo:
   ```bash
   docker stop conect4-app
   docker rm conect4-app
   ```

### Pruebas de Frontend y E2E

Para instalar las dependencias de Node y correr las pruebas:
```bash
npm install
npm run test           # Ejecuta pruebas unitarias con Jest
npx playwright test    # Ejecuta pruebas End-to-End
```
