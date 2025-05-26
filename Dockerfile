FROM openjdk:21
EXPOSE 8080
ADD backend/target/gainmate.jar gainmate.jar
ENTRYPOINT ["java","-jar","gainmate.jar"]
