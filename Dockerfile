# Use Java 17
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy project
COPY . .

# Build project
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Run app
CMD ["java", "-jar", "target/*.jar"]
