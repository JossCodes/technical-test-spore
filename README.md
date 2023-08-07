# Proyecto Fullstack - Vehicles Hub

Este proyecto es una aplicación fullstack desarrollada con Node.js 16, que utiliza una base de datos PostgreSQL llamada 'vehicles_hub'. Asegúrate de tener instalado Node.js y npm antes de continuar.

## Tabla de Contenidos

- [Requisitos previos](#requisitos-previos)
- [Configuración](#configuración)
  - [Configurar la base de datos](#configurar-la-base-de-datos)
- [Instalación](#instalación)
- [Build y migraciones](#build-y-migraciones)
- [Iniciar el proyecto](#iniciar-el-proyecto)
  - [Iniciar el servidor de la API](#iniciar-el-servidor-de-la-api)
  - [Iniciar el cliente](#iniciar-el-cliente)
- [Información adicional](#información-adicional)

## Requisitos previos

1. Instalar Node.js (recomendado 16 o más reciente): [https://nodejs.org](https://nodejs.org)
2. Instalar PostgreSQL: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

## Configuración

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en la raíz del proyecto.

## Configurar la base de datos

1. Asegúrate de que PostgreSQL esté instalado y en ejecución.
2. Crea una base de datos llamada 'vehicles_hub'.
3. En el archivo `.env` en la carpeta api reemplaza las variables con tus credenciales

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=vehicles_hub
DB_USERNAME=tu_usuario_de_postgres
DB_PASSWORD=tu_contraseña_de_postgres
```

## Instalación

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```sh
$ npm run install:all
```

Este comando instalará las dependencias tanto para la API (backend) como para el cliente (frontend).

## Build y migraciones

Antes de iniciar el proyecto, debes realizar las migraciones y los seeders necesarios. Estos pasos también crearán dos usuarios:

- Usuario Superuser:

  - Email: superuser@example.com
  - Contraseña: 12345678
  - Rol: superuser

- Usuario Regular:

  - Email: user@example.com
  - Contraseña: 12345678
  - Rol: user

Para realizar estas operaciones, ejecuta el siguiente comando:

```sh
$ npm run build:all
```

Este comando ejecutará las migraciones y seeders, y construirá tanto la API como el cliente.

## Iniciar el proyecto

Ahora, puedes iniciar tanto el servidor de la API como el cliente. Abre dos terminales, una para cada uno, y ejecuta los siguientes comandos:

### Iniciar el servidor de la API:

```sh
$ npm run start:api
```

### Iniciar el cliente:

```sh
$ npm run start:client
```

## Información adicional

Si necesitas realizar tareas específicas en la API o el cliente por separado, puedes utilizar los siguientes comandos:

- Para construir solo la API: `npm run build:api`
- Para construir solo el cliente: `npm run build:client`
- Para realizar las migraciones y seeders sin construir: `npm run setupDB`
