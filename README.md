# Marco Polo 2.0

## Resumen del Proyecto

Cree el results-screen que mantiene la misma arquitectura del proyecto game y backend, sin emitir eventos socket directamente desde el cliente (usa controladores/intermediarios como se solicito).

## Requisitos Funcionales Implementados

### 1. Results-Screen con Dos Vistas

**Vista 1 - Resultados en Tiempo Real:**
- Tabla con todos los jugadores conectados y puntajes actuales
- Actualizacion automatica cuando un usuario se conecta
- Puntuaciones actualizadas en tiempo real mediante Socket.IO
- Interfaz moderna y responsiva

**Vista 2 - Pantalla Final de Ganador:**
- Se activa cuando cualquier jugador alcance >= 100 puntos
- Muestra nombre del ganador y lista ordenada de mayor a menor
- Formato: 1. Juan (120 pts), 2. Ana (80 pts), 3. Luis (10 pts)
- Boton "Ordenar alfabeticamente" que reorganiza por nombre
- Boton "Reiniciar Juego" para limpiar puntuaciones

### 2. Logica de Puntuaciones Centralizada

**Reglas Implementadas:**
- Marco atrapa Polo especial: Marco +50 pts, Polo especial -10 pts
- Marco no atrapa Polo especial: Marco -10 pts, Polo +10 pts
- Polo especial no es atrapado: Polo especial +10 pts
- Polo especial es atrapado: Polo especial -10 pts
- Puntuaciones pueden ser negativas
- Todos los clientes game muestran puntuacion actual

## Cumplimiento de Requisitos

- Arquitectura: Mantiene misma estructura que game y backend
- Sin emision directa: Usa controladores/intermediarios
- Dos vistas: Tiempo real + Pantalla final
- Logica centralizada: Backend maneja todas las puntuaciones
- Sincronizacion: Todos los clientes actualizados
- Reinicio global: Funciona en todos los clientes
- Interfaz moderna: Diseno profesional y responsivo

## Instalacion y Ejecucion

```bash
npm install
npm start
```

Acceder a:
- http://localhost:5050 (Pagina principal)
- http://localhost:5050/game (Cliente de juego)
- http://localhost:5050/results (Pantalla de resultados)

## Despliegue en Vercel

```bash
npm i -g vercel
vercel login
vercel
```

El archivo vercel.json ya esta configurado :D