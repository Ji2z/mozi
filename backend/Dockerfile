FROM openjdk:8-jdk-alpine as builder
WORKDIR /backend
COPY . .
RUN chmod +x ./gradlew

RUN ./gradlew clean build
RUN ls /build/libs

FROM adoptopenjdk:8-jre-hotspot 
COPY --from=builder /backend/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "./app.jar"]