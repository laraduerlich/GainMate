# 💪 GainMate – Deine persönliche Fitness-Webapp

**GainMate** ist eine Fitness-Web-App mit Fokus auf mobile Nutzung, mit der du deine Trainingsziele strukturiert und langfristig verfolgen kannst. Die Anwendung ermöglicht es dir, Übungen zu erstellen, Workouts zusammenzustellen und deinen Fortschritt übersichtlich zu dokumentieren – alles an einem Ort.


## 🚀 Features

- 📋 **Exercises verwalten**  
  Erstelle und speichere beliebig viele Übungen (Exercises) – inklusive Beschreibung und Muskelgruppen.

- 🏋️‍♂️ **Workouts erstellen**  
  Kombiniere beliebige Exercises zu Workouts und organisiere dein Training effizient.

- 📈 **Progress-Tracking**  
  Notiere bei jeder Übung, wie viele Wiederholungen und welches Gewicht du verwendet hast.  
  → **Besonders praktisch:** Dein Fortschritt wird **übungsspezifisch** gespeichert – egal, in welchem Workout sie enthalten ist.

- 🔁 **Wiederverwendbarkeit**  
  Exercises können in mehreren Workouts verwendet werden – du behältst immer den Überblick über deinen aktuellen Leistungsstand.


## 🛠️ Verwendete Technologien

- **Java (Spring Boot)** – Backend-Entwicklung
- **React mit TypeScript** – Frontend-Entwicklung
- **MongoDB** – Datenbank zur Speicherung von Usern, Exercises und Workouts
- **TailwindCSS** – Styling der Anwendung

## 📂 Projektstruktur
```bash
gainmate/
│── github/ # Backend-Code (Spring Boot) 
│── idea/ # Backend-Code (Spring Boot) 
│── backend/ # Backend-Code (Spring Boot) 
│   ├── src/main/java/com/example/backend/ # Hauptcode für das Backend 
│   │   ├── controller/ 
│   │   ├── exception/ 
│   │   ├── model/
│   │   ├── security/
│   │   ├── repo/
│   │   ├── service/ 
│   │   ├── BackendApplication.java 
│   ├── src/main/resources/ 
│   │   ├── application.properties
│   ├── src/test/java/com/example/backend/ # Tests für das Backend
│   │   ├── controller/ 
│   │   ├── model/
│   │   ├── security/
│   │   ├── service/ 
│   │   ├── BackendApplicationTests.java 
│   ├── src/main/resources/ 
│   │   ├── application.properties  
│   ├── pom.xml 
│── frontend/ # Frontend-Code (React)
│   ├── public/ # Icon-Bilder für das Frontend
│   ├── src/ # Quellcode des Frontends 
│   │   ├── components/ 
│   │   ├── pages/ 
│   │   ├── types/ 
│   │   ├── utlis/ # DataService für Backend-Anbindung  
│   │   ├── App.js 
│   │   ├── index.js 
│   │   ├── styles.css 
│   ├── package.json # Abhängigkeiten für React
│   ├── tailwind.config.ts # Konfigurationsdatei für TailwindCSS
│   ├── vite.config.js
│── .gitignore
```
