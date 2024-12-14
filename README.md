# Backend para The Bike Country 🚴‍♂️  

Este proyecto constituye la lógica de negocio de una empresa de turismo premium especializada en ciclismo en Euskadi. Su objetivo es gestionar datos relacionados con clientes, trabajadores, paquetes turísticos y reservas, proporcionando una API JSON para ser consumida por el frontend.  

## 🔧 **Características del Proyecto**  
- **Base de datos**:  
  Construida con MySQL y organizada en las siguientes tablas:  
  - `client`  
  - `country`  
  - `workers`  
  - `packs`  
  - `clients_book_packs`  
  - `referral_sources`
 
- **Conversión a API JSON**:  
  Toda la información almacenada en la base de datos está preparada para convertirse en endpoints JSON accesibles a través de la API.  

- **Tecnologías utilizadas**:  
  - **Node.js**: Entorno de ejecución.  
  - **Express.js**: Framework para la creación de la API.  
  - **MySQL**: Base de datos relacional.  
  - **JWT (JSON Web Tokens)**: Gestión de autenticación y seguridad.  
  - **Bcrypt**: Cifrado de contraseñas.  
  - **JavaScript**: Lenguaje principal para toda la lógica de negocio.
    
## ⬇️ **Instalación y Uso**  

1. Clonar este repositorio:  
   ```bash
   git clone git@github.com:inesuribeb/The-Bike-Country.git
   cd The-Bike-Country

2. Instalar dependencias:
   ```bash
   npm install

3. Configurar variables de entorno:
   ```bash
    DB_HOST=the_bike_country_db
    DB_PORT=3309
    APP_HOST=the_bike_country
    APP_PORT=3002

    DB_USER=ines
    DB_PASSWORD=1234
    DB_DATABASE=the_bike_country
    DB_ROOT_PASSWORD=1234
    JWT_SECRET=1234

4. Iniciar el servidor:
   ```bash
   npm start

## 🚀 **Endpoints Principales**  

### **Autenticación**  
- `POST /client/api/clients/login`
- `POST /worker/api/workerslogin`  
- `POST /client/api/clients//register`  

### **Clientes**  
- `GET client/api/clients`
- `GET client/api/clients/:id`
- `POST client/api/clients/create`
- `PUT client/api/clients/:id/update` 
- `DELETE client/api/clients/:id/delete` 

### **Packs**  
- `GET pack/api/packs`
- `GET pack/api/packs/:id`  
- `POST pack/api/packs/create`
- `PUT pack/api/packs/:id/deactivate`

### **Workers** 
- `GET worker/api/workers`
- `GET worker/api/workers/:id`
- `POST worker/api/workers`
- `PUT worker/api/workers/:id/update` 
- `DELETE worker/api/workers/:id/delete`

### **Reservations** 
- `GET reservation/api/reservations`
- `GET reservation/api/reservations/:id`  
- `POST reservation/api/reservations/create`
- `PUT reservation/api/reservations/:id/cancel`
- `PUT reservation/api/reservations/:id/status`

### **Countries** 
- `GET countries/api/countries`

### **Countries** 
- `GET source/api/sources`

---

## 🔜 **Próximos Pasos**  
- Desarrollo del frontend consumiendo esta API.  
- Optimización de la lógica de negocio.  
- Implementación de pruebas unitarias y de integración.  

---

## 🤝 **Contribuciones**  
¡Contribuciones y sugerencias son bienvenidas!  
Si encuentras un error o tienes una idea para mejorar este proyecto, abre un **issue** o envía un **pull request**.


