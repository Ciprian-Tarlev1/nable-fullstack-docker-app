FROM openjdk:17-jdk-slim as builder
WORKDIR /builder
ADD . /builder
RUN ./mvnw -DskipTests=true clean install

FROM openjdk:17-jdk-slim as extractor
WORKDIR /project
COPY  --from=builder /builder/target/how-to-docker-0.0.1-SNAPSHOT.jar /project

# Break up jar into 4 folders:
#    dependency --> All jars identified by mvn
#    spring-boot-loader --> System for generating self-contained JAR/WAR
#    snapshot-dependencies--> Any dependency whose version contains SNAPSHOT
#    application --> application classes and resources
RUN java -Djarmode=layertools -jar how-to-docker-0.0.1-SNAPSHOT.jar extract

FROM openjdk:17-jdk-slim
WORKDIR /app

COPY  --from=extractor /project/dependencies/. /app/.

COPY  --from=extractor /project/spring-boot-loader/. /app/.

COPY  --from=extractor /project/snapshot-dependencies/. /app/.

COPY  --from=extractor /project/application/. /app/.

EXPOSE 8080

CMD ["java", "org.springframework.boot.loader.JarLauncher"]
