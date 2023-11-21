# Usa una imagen base con Node.js
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json e package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos del proyecto al contenedor
COPY . .

# Compila la aplicación React
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]