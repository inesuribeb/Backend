# Backend para The Bike Country 🚴‍♂️  

Este proyecto constituye la lógica de negocio de una empresa de turismo premium especializada en ciclismo. Su objetivo es gestionar datos relacionados con clientes, países, trabajadores, paquetes turísticos y fuentes de referencia, proporcionando una API JSON para ser consumida por el frontend.  

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
  - 
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
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   JWT_SECRET=

4. Iniciar el servidor:
   ```bash
   npm start

## 🚀 **Endpoints Principales**  

### **Autenticación**  
- `POST /auth/login`  
- `POST /auth/register`  

### **Clientes**  
- `GET /clients`  
- `POST /clients`
- `PUT /clients/:id` 
- `DELETE /clients/:id` 

### **Paquetes**  
- `GET /packs`  
- `POST /packs`
- `PUT /packs/:id` - Actualizar paquete (solo admin)  
- `DELETE /packs/:id` - Eliminar paquete (solo admin)   


---

## 🔜 **Próximos Pasos**  
- Desarrollo del frontend consumiendo esta API.  
- Optimización de la lógica de negocio.  
- Implementación de pruebas unitarias y de integración.  

---

## 🤝 **Contribuciones**  
¡Contribuciones y sugerencias son bienvenidas!  
Si encuentras un error o tienes una idea para mejorar este proyecto, abre un **issue** o envía un **pull request**.


