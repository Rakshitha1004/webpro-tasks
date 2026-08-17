# -------------------------------------------------------------
# Stage 1: Build & Package the Spring Boot JAR
# -------------------------------------------------------------
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /build

# Copy Maven wrapper and POM to leverage Docker cache for dependencies
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code and build application jar
COPY src ./src
RUN ./mvnw clean package -DskipTests

# -------------------------------------------------------------
# Stage 2: Minimal Production JRE Runtime
# -------------------------------------------------------------
FROM eclipse-temurin:17-jre-alpine AS runner

WORKDIR /app

# Run as non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy packaged jar from builder stage
COPY --from=builder /build/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]