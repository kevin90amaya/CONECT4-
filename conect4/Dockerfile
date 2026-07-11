# --- ETAPA 1: Construcción (Build) ---
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Instalar Node.js y npm en el contenedor de construcción
RUN apt-get update && apt-get install -y nodejs npm

# Copiamos pom.xml y package.json para aprovechar la caché de Docker
COPY pom.xml .
COPY package.json package-lock.json* ./

# Descargamos dependencias de Maven y de Node
RUN mvn dependency:go-offline -B
RUN npm install

# Copiamos todo el código fuente del proyecto
COPY src ./src
COPY vite.config.js .

# 1. Compilamos Java y copiamos recursos estáticos iniciales
RUN mvn compile -B

# 2. Compilamos el frontend con Vite (escribe en target/classes/static)
RUN npm run build

# 3. Empaquetamos todo en el JAR (sin hacer "clean" para no borrar el build de Vite)
RUN mvn package -DskipTests -B

# --- ETAPA 2: Ejecución (Run) ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copiamos el JAR compilado desde la etapa anterior
COPY --from=build /app/target/conect4-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto por defecto (informativo)
EXPOSE 8080

# Comando para iniciar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
