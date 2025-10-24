# Como usar Vercel para desplegar tu proyecto

## Que es Vercel?
Vercel es una plataforma que te permite desplegar tu aplicacion web en internet de forma gratuita. Es como tener tu servidor en la nube.

## Pasos para desplegar:

### 1. Instalar Vercel CLI
```bash
npm i -g vercel
```

### 2. Iniciar sesion en Vercel
```bash
vercel login
```
- Te abrira el navegador
- Inicia sesion con tu cuenta de GitHub, Google o email

### 3. Desplegar el proyecto
```bash
vercel
```
- Te preguntara algunas cosas, solo presiona Enter para usar los valores por defecto
- Vercel automaticamente detectara que es un proyecto Node.js

### 4. Tu aplicacion estara en internet!
- Vercel te dara una URL como: https://tu-proyecto.vercel.app
- Puedes compartir esta URL con cualquiera

## URLs de tu aplicacion desplegada:
- **Pagina principal**: https://tu-proyecto.vercel.app/
- **Cliente de juego**: https://tu-proyecto.vercel.app/game
- **Pantalla de resultados**: https://tu-proyecto.vercel.app/results

## Notas importantes:
- El archivo `vercel.json` ya esta configurado
- Cada vez que hagas cambios, ejecuta `vercel` de nuevo para actualizar
- Vercel es gratis para proyectos personales
- Tu aplicacion estara disponible 24/7 en internet

## Si tienes problemas:
- Asegurate de que el servidor funcione localmente primero
- Revisa que todas las dependencias esten en package.json
- El archivo vercel.json maneja toda la configuracion automaticamente
