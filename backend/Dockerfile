# -------------------------------------------------------------
# Stage 1: Build & Package the Spring Boot JAR
# -------------------------------------------------------------
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /build

# Copy Maven wrapper and POM to leverage Docker cache for dependencies
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code and build application jar (skip tests as CI handles them)
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Extract layers using Spring Boot layertools
WORKDIR /build/target
RUN java -Djarmode=layertools -jar *.jar extract

# -------------------------------------------------------------
# Stage 2: Minimal Production JRE Runtime
# -------------------------------------------------------------
FROM eclipse-temurin:17-jre-alpine AS runner

WORKDIR /app

# Run as non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy extracted layers in order of least-to-most frequently changed
COPY --from=builder /build/target/dependencies/ ./
COPY --from=builder /build/target/spring-boot-loader/ ./
COPY --from=builder /build/target/snapshot-dependencies/ ./
COPY --from=builder /build/target/application/ ./

EXPOSE 8080

# Configure JVM memory limits for containerized environments
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS org.springframework.boot.loader.launch.JarLauncher"]