# 🎮 Conecta 4 - Full Stack Web Application

Una aplicación web completa del clásico juego **Conecta 4**, construida con arquitectura cliente-servidor moderno. Ofrece una experiencia interactiva completa con soporte para múltiples modos de juego, personalización del tablero e IA integrada.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Cómo Ejecutar](#-cómo-ejecutar)
- [Configuración de Desarrollo](#-configuración-de-desarrollo)
- [API REST](#-api-rest)
- [Testing](#-testing)
- [Arquitectura](#-arquitectura)

---

## ✨ Características

### 🎮 Modos de Juego
- **Humano vs Humano**: Dos jugadores locales en la misma pantalla
- **Humano vs Máquina**: Juega contra IA con movimientos inteligentes
- **Máquina vs Máquina**: Observa cómo dos IA se enfrentan

### ⚙️ Personalización Completa
- **Tablero Configurable**: Ajusta filas (3-30) y columnas (3-30) dinámicamente
- **Condición de Victoria Personalizable**: Define cuántas fichas consecutivas necesitas para ganar (3-30)
- **Número de Jugadores**: Soporta de 2 a 10 jugadores en el tablero
- **Reinicio en Tiempo Real**: Cambia la configuración sin reiniciar la aplicación

### 🌐 Internacionalización (i18n)
- Interfaz disponible en **Inglés** y **Español**
- Cambio de idioma dinámico sin recargar la página

### 📊 Detección de Estados del Juego
- ✅ Detección automática de **victoria** (4 fichas consecutivas o el número configurado)
- ✅ Detección de **empate** (tablero lleno)
- ✅ Validación de **movimientos inválidos** (columnas llenas)
- ✅ Gestión automática de **turnos**

### 🎨 Interfaz Responsive
- Diseño moderno y limpio con CSS personalizado
- Escalado automático del tablero
- Compatible con navegadores modernos

---

## 🛠️ Stack Tecnológico

### Backend
| Componente | Descripción |
|-----------|-------------|
| **Java 21** | Lenguaje de programación principal |
| **Spring Boot 3.4.1** | Framework para aplicación web |
| **Spring Web MVC** | Controladores REST y arquitectura web |
| **Spring Data JPA** | Persistencia y manejo de datos |
| **H2 Database** | Base de datos relacional en memoria (desarrollo/pruebas) |
| **Maven** | Gestión de dependencias y construcción |

### Frontend
| Componente | Descripción |
|-----------|-------------|
| **JavaScript (ES6+)** | Lógica del cliente y orquestación |
| **Vite** | Bundler y servidor de desarrollo ultra-rápido |
| **CSS 3** | Estilos y responsive design |
| **HTML 5** | Markup semántico |

### Testing
| Herramienta | Propósito |
|-----------|---------|
| **Jest** | Pruebas unitarias e integración en JavaScript |
| **Playwright** | Pruebas End-to-End (E2E) en navegadores reales |
| **JUnit 4** | Pruebas unitarias en Java |
| **Hamcrest 2.2** | Matchers para assertions en tests |
| **Spring Boot Test** | Pruebas de integración en Spring |

### Contenedorización & DevOps
| Herramienta | Propósito |
|-----------|---------|
| **Docker** | Containerización multi-etapa |
| **Docker Compose** | Orquestación de contenedores (opcional) |

---

## 📁 Estructura del Proyecto

```text
conect4/
├── src/
│   ├── main/
│   │   ├── java/com/conect4maxmax/conect4/
│   │   │   ├── Conect4Application.java      # Entry point
│   │   │   ├── controller/                  # REST Controllers
│   │   │   │   ├── GameController.java      # Lógica de turnos del juego
│   │   │   │   ├── BoardController.java     # Gestión del tablero
│   │   │   │   ├── SettingsMenuController.java # Configuración
│   │   │   │   ├── playersController.java   # Gestión de jugadores
│   │   │   │   └── ToggleButtonController.java # Toggles dinámicos
│   │   │   ├── service/                     # Lógica de negocio
│   │   │   │   ├── GameService.java         # Orquestación del juego
│   │   │   │   ├── boardService.java        # Operaciones del tablero
│   │   │   │   ├── PlayersService.java      # Gestión de jugadores
│   │   │   │   ├── SettingsMenuService.java # Configuración
│   │   │   │   ├── ToggleButtonService.java # Toggles
│   │   │   │   └── dto/                     # Data Transfer Objects
│   │   │   │       ├── GameResult.java      # Respuesta del juego
│   │   │   │       └── ProposedColumn.java  # Movimiento del jugador
│   │   │   └── models/                      # Entidades del dominio
│   │   │       ├── Board.java               # Tablero (7x6 por defecto)
│   │   │       ├── Players.java             # Gestión de jugadores
│   │   │       ├── PlayerProperties.java    # Props de cada jugador
│   │   │       ├── Cell.java                # Celda individual
│   │   │       ├── Color.java               # Enum de colores
│   │   │       ├── GameMode.java            # Enum de modos
│   │   │       ├── PlayerTipe.java          # Enum HUMAN/COMPUTER
│   │   │       ├── HumanPlayer.java         # Jugador humano
│   │   │       └── ComputerPlayer.java      # IA del juego
│   │   └── resources/
│   │       ├── application.properties       # Config Spring
│   │       └── static/
│   │           ├── index.html               # HTML principal
│   │           ├── styles.css               # Estilos del juego
│   │           ├── scripts.js               # Carga de módulos
│   │           └── js/
│   │               ├── AppController.js     # Controlador principal
│   │               ├── api/                 # Cliente HTTP
│   │               ├── game/                # Lógica del juego
│   │               ├── board/               # Visualización del tablero
│   │               ├── models/              # Modelos del cliente
│   │               ├── players/             # Gestión de jugadores
│   │               ├── memus/               # Menús interactivos
│   │               ├── Messages/            # i18n (EN/ES)
│   │               └── utils/               # Utilidades
│   └── test/
│       ├── java/                            # Tests JUnit
│       └── resources/
│           └── static/js/                   # Tests Jest
│               ├── *.test.js                # Suite de pruebas
│               └── all.test.js              # Todas las pruebas
├── E2E test/                                # Pruebas Playwright
├── pom.xml                                  # Config Maven
├── package.json                             # Config NPM
├── vite.config.js                           # Config Vite
├── jest.config.cjs                          # Config Jest
├── playwright.config.js                     # Config Playwright
├── babel.config.cjs                         # Config Babel
├── Dockerfile                               # Build multi-etapa
└── COMODOCKERRIZAR.TXT                      # Guía Docker (en español)
```

### Cómo Encaja Todo

```text
┌─────────────────────────────────────────────────────────────┐
│                       CLIENTE (JavaScript)                  │
│   index.html   →   scripts.js   →   AppController.js        │
│   (UI/UX)      → (Lógica del juego) →   (Orquestación)      │
│                                                             │
│       ┌────────────────────────────────────────────────────┐│
│       │ Módulos: Game, Board, Players, Menu, Messages, i18n││
│       └────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
                               ↓ HTTP REST ↓
┌─────────────────────────────────────────────────────────────┐
│                    SERVIDOR (Java + Spring Boot)            │
│                                                             │
│ Controller Layer (REST Endpoints)                           │
│  ├─ /api/game/resolve-turn → Procesar movimiento            │
│  ├─ /api/board/create      → Crear tablero                  │
│  ├─ /api/board/reset       → Reiniciar tablero              │
│  ├─ /api/players           → Gestionar jugadores            │
│  └─ /api/settings          → Configuración                  │
│                                                             │
│ Service Layer (Lógica de Negocio)                           │
│  ├─ GameService         → Turnos y validación               │
│  ├─ boardService        → Operaciones tablero               │
│  ├─ PlayersService      → Alternancia turnos                │
│  └─ SettingsMenuService → Config dinámicas                  │
│                                                             │
│ Model Layer (Dominio)                                       │
│  ├─ Board (7x6, configurable) → Estado del juego            │
│  ├─ Players (hasta 10)        → Gestión de turnos           │
│  └─ Cell, Color, GameMode, etc. → Entidades                 │
│                                                             │
│ Persistence Layer                                           │
│  └─ H2 Database (en memoria)  → Datos sesión                │
└─────────────────────────────────────────────────────────────┘
```

## 🐳 Ejecución con Docker

```bash
# 1. Navega al directorio del proyecto
cd conect4

# 2. Construye la imagen Docker
docker build -t conecta4-app:latest .

# 3. Ejecuta el contenedor
docker run -d -p 8080:8080 --name conecta4 conecta4-app:latest

# 4. Accede a la aplicación
# Abre http://localhost:8080 en tu navegador

# 5. Para detener y eliminar el contenedor
docker stop conecta4
docker rm conecta4
```

## �� Testing

### Pruebas de Frontend (JavaScript)

```bash
cd conect4

# Ejecuta todos los tests
npm run test

# Modo observación (re-ejecuta al cambiar archivos)
npm run test:watch

# Cobertura de código
npm run test:coverage

# Tests por categoría (con tags @)
npm run test:unit              # @unit
npm run test:integration       # @integration
npm run test:view              # @view
npm run test:controller        # @controller
npm run test:model             # @model
npm run test:memus             # @memus
npm run test:config            # @config
npm run test:suite             # @suite

# Suite completa
npm run test:all
```

### Pruebas End-to-End (Playwright)

```bash
# Ejecuta pruebas E2E en navegadores reales
npx playwright test

# Modo UI (interfaz visual)
npx playwright test --ui

# Debugger paso a paso
npx playwright test --debug
```

### Pruebas de Backend (Java)

```bash
# Ejecuta tests JUnit
mvn test

# Solo tests unitarios
mvn test -DscanForTestClasses=true

# Con reporte
mvn clean test jacoco:report
```

## 📈 Arquitectura

### Flujo de un Movimiento (Happy Path)

1. Usuario hace clic en una columna (Frontend)
   ↓
2. JavaScript captura el evento y valida
   ↓
3. POST `/api/game/resolve-turn` con `{ column: X }`
   ↓
4. `GameController.resolveTurn()` recibe `ProposedColumn`
   ↓
5. `GameService.play(proposedColumn)`
   ├─ Valida: ¿Columna llena?
   ├─ Valida: ¿Es el turno correcto?
   ├─ Coloca la ficha en Board
   ├─ Verifica: ¿Victoria (4 en línea)?
   ├─ Verifica: ¿Tablero lleno (empate)?
   ├─ Alterna turno en Players
   └─ Retorna `GameResult`
   ↓
6. Frontend recibe `GameResult`
   ├─ Actualiza visualización del tablero
   ├─ Muestra estado: "Turno de X" | "¡X gana!" | "¡Empate!"
   └─ Si es turno de máquina → Espera 1s → Auto-juega

### Patrones de Diseño Utilizados

- **MVC (Model-View-Controller)**: Separación clara de responsabilidades
- **Service Layer**: Lógica de negocio aislada en servicios
- **DTO (Data Transfer Objects)**: Comunicación REST tipada
- **Component-based (Spring)**: Inyección de dependencias
- **Modular JavaScript**: Separación en módulos (game, board, players, etc.)

## 🎯 Casos de Uso Principales

### 🎮 Caso 1: Partida Humano vs Máquina
- Usuario selecciona "Jugar" en menú
- Elige modos de juego si quiere personalizar
- Hace clic en una columna
- La máquina juega automáticamente
- Sistema detecta victoria/empate
- Opción para jugar de nuevo

### ⚙️ Caso 2: Personalización del Tablero
- Usuario accede a "Configuración"
- Ajusta filas (3-30) y columnas (3-30)
- Modifica fichas para ganar (3-30)
- Valida restricciones automáticamente
- Aplica cambios sin reiniciar

### 🌐 Caso 3: Cambio de Idioma
- Usuario pulsa botón de idioma (EN/ES)
- Toda la interfaz se actualiza instantáneamente
- Los mensajes se traducen dinámicamente
- Se mantiene en sesión
