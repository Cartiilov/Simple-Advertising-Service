# Simple Classified Ads Service

This is a simple classified ads service project developed for the Advanced Internet Technologies course. It consists of two main parts: the frontend and the backend. You can access full documentation in Polish in file *Serwis_z_ogłoszeniami.pdf*.

![strona glowna wylog](https://github.com/user-attachments/assets/009c5d98-336a-4d33-a0c1-8895046a4b25)

## Project Objective

The goal of this project is to create a classified ads service that allows logged-in users to post various types of information, such as offers to sell, buy, etc. Users can also attach photos to their posts. The service will include a basic search feature for finding posts.

## Features

### Non-logged-in User
- **Browse Posts**: View available posts.
  ![Posty](https://github.com/user-attachments/assets/d1f66c3e-b936-47d0-ad33-21ec81a6789e)
- **View Contact Information of Post Owners**: See contact details of post owners.
- **Search Posts**: Use keywords to find specific posts
  ![wyszukiwarka](https://github.com/user-attachments/assets/95a756a8-5210-4438-bbc8-53bd9feb9937)

- **Login or Register**: Access the login or registration page to gain additional functionalities.
![rejestracja](https://github.com/user-attachments/assets/2ffdcb17-c10b-485c-b1c0-4de557495934)

### Logged-in User
- **Browse Posts**: View posts created by other users.
- **Create New Posts**: Add new posts with details and optional photos.
  ![Dodaj post](https://github.com/user-attachments/assets/2e5bf1cd-12e4-4e34-b90d-99c385c95003)
- **Add Contact Information**: Update their profile with contact information.
- **View Contact Information of Post Owners**: Access contact details of other post owners.
- **Search Posts**: Use keywords to find specific posts.
- **Logout**: End the session and log out.

---

## Technology Stack

### Frontend
* [![React][react-shield]][react-url]
* [![Vite][vite-shield]][vite-url]
* [![TypeScript][typescript-shield]][typescript-url]
* [![Axios][axios-shield]][axios-url]
* [![CSS/SCSS][css-shield]][css-url]
* [![React Context API][context-shield]][context-url]

### Backend
* [![Spring Boot][spring-boot-shield]][spring-boot-url]
* [![Spring Data JPA][spring-data-jpa-shield]][spring-data-jpa-url]
* [![Spring Data JDBC][spring-data-jdbc-shield]][spring-data-jdbc-url]
* [![Spring Boot Starter JDBC][jdbc-shield]][jdbc-url]
* [![Spring Boot Starter Web][spring-web-shield]][spring-web-url]
* [![PostgreSQL JDBC Driver][postgres-jdbc-shield]][postgres-jdbc-url]
* [![Lombok][lombok-shield]][lombok-url]
* [![JWT][jwt-shield]][jwt-url]
* [![Spring Content][spring-content-shield]][spring-content-url]

### Database
* [![PostgreSQL][postgres-shield]][postgres-url]

## Database structure
![struktura-bd](https://github.com/user-attachments/assets/a3d01093-e7f9-4ed2-be9e-a4a1cb8ef0d0)


## Setup and Installation

To run the project locally, follow these steps for setting up the frontend and backend components.

### Frontend

1. **Install npm dependencies**  
   Navigate to the frontend directory and install the necessary dependencies:
   ```bash
   $ npm install
   ```
2. **Start frontend**  
   In the Simple-Advertising-Service project directory, navigate to the frontend/adv folder and start the frontend development server:
   ```bash
   $ npm run dev
    ```
 3. **Start the Backend**
    Open the Backend project in IntelliJ IDEA. Run the backend server by clicking the RUN button in IntelliJ.
---

[react-shield]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/

[vite-shield]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vitejs.dev/

[typescript-shield]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/

[axios-shield]: https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white
[axios-url]: https://axios-http.com/

[css-shield]: https://img.shields.io/badge/CSS%20%26%20SCSS-1572B6?style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://developer.mozilla.org/en-US/docs/Web/CSS

[context-shield]: https://img.shields.io/badge/React%20Context%20API-61DAFB?style=for-the-badge&logo=react&logoColor=white
[context-url]: https://reactjs.org/docs/context.html

[spring-boot-shield]: https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white
[spring-boot-url]: https://spring.io/projects/spring-boot

[spring-data-jpa-shield]: https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[spring-data-jpa-url]: https://spring.io/projects/spring-data-jpa

[spring-data-jdbc-shield]: https://img.shields.io/badge/Spring%20Data%20JDBC-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[spring-data-jdbc-url]: https://spring.io/projects/spring-data-jdbc

[jdbc-shield]: https://img.shields.io/badge/Spring%20Boot%20Starter%20JDBC-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[jdbc-url]: https://spring.io/guides/gs/relational-data-access/

[spring-web-shield]: https://img.shields.io/badge/Spring%20Boot%20Starter%20Web-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[spring-web-url]: https://spring.io/guides/gs/rest-service/

[postgres-jdbc-shield]: https://img.shields.io/badge/PostgreSQL%20JDBC%20Driver-336791?style=for-the-badge&logo=postgresql&logoColor=white
[postgres-jdbc-url]: https://jdbc.postgresql.org/

[lombok-shield]: https://img.shields.io/badge/Lombok-FF9800?style=for-the-badge&logo=lombok&logoColor=white
[lombok-url]: https://projectlombok.org/

[jwt-shield]: https://img.shields.io/badge/JSON%20Web%20Token-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white
[jwt-url]: https://jwt.io/

[spring-content-shield]: https://img.shields.io/badge/Spring%20Content-6DB33F?style=for-the-badge&logo=spring&logoColor=white
[spring-content-url]: https://paulcwarren.github.io/spring-content/content-services-for-spring

[postgres-shield]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[postgres-url]: https://www.postgresql.org/
