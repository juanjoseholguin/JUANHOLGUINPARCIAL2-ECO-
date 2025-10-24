# Guia de Despliegue en Vercel

## Pasos para Desplegar

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Iniciar sesion en Vercel**
   ```bash
   vercel login
   ```

3. **Desplegar el proyecto**
   ```bash
   vercel
   ```

4. **Configuracion automatica**
   - El archivo `vercel.json` ya esta configurado
   - Las rutas estan mapeadas correctamente
   - Los headers de cache estan configurados

## URLs del Proyecto Desplegado

- **Pagina principal**: `https://tu-proyecto.vercel.app/`
- **Cliente de juego**: `https://tu-proyecto.vercel.app/game`
- **Pantalla de resultados**: `https://tu-proyecto.vercel.app/results`

## Configuracion de Vercel

El archivo `vercel.json` incluye:
- Builds para Node.js
- Rutas para API y archivos estaticos
- Headers de cache para optimizacion
- Mapeo correcto de directorios

## Notas Importantes

- El proyecto usa Socket.IO que requiere configuracion especial en Vercel
- Las rutas estan configuradas para manejar tanto el cliente game como results-screen
- Los archivos estaticos se sirven correctamente
- La API esta configurada para funcionar en el entorno de Vercel
