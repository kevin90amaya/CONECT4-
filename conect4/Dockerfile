# --- ENTORNO PARA JAVA 21 ---
FROM maven:3.9-eclipse-temurin-21

WORKDIR /workspaces/conect4

# Copiamos el pom para que las dependencias se descarguen al construir
COPY pom.xml .
RUN mvn dependency:go-offline
