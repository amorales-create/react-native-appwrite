# Product Management App

> Proyecto móvil (React Native + Expo) para gestionar productos — estructura base y componentes para autenticación y listas de productos.

## Estado actual
- Plantilla de aplicación Expo con TypeScript
- Navegación (`@react-navigation/native`), estado con `@reduxjs/toolkit` y `react-redux`
- Soporte para internacionalización (`i18next` / `react-i18next`)
- Estilos con `nativewind` / `tailwindcss`
- Componentes de autenticación en `src/features/auth`
- Lista y tarjetas de productos en `src/features/products`

> Nota: el repo lleva el nombre `react-native-appwrite` (posible integración con Appwrite planeada), pero actualmente no se detecta configuración de Appwrite en el código.

## Requisitos
- Node.js (recomendado >= 18)
- npm o yarn
- Expo CLI (opcional si usas las tareas de `package.json`)
- Cuenta de GitHub para subir el repositorio (opcional)

## Get started (desarrollo local)

1. Instalar dependencias

```bash
# desde la raíz del proyecto
npm install
# o con yarn
yarn install
```

2. Ejecutar la app con Expo

```bash
npm start
# o
yarn start
```

Abre en Expo Go (Android/iOS) o usa el emulador de tu elección.

3. Variables de entorno / backend

Si integras un backend (Appwrite u otro), crea un archivo `.env` y añade las variables necesarias (URL, keys). Guarda la configuración en un lugar seguro y no incluyas credenciales en el repo.

Si usas Appwrite, añade al menos:

- `EXPO_PUBLIC_APPWRITE_ENDPOINT` – la URL de tu servidor Appwrite (p. ej. `https://cloud.appwrite.io/v1`)
- `EXPO_PUBLIC_APPWRITE_PROJECT_ID` – el ID del proyecto en Appwrite
- `EXPO_PUBLIC_APPWRITE_PLATFORM` – el bundle id o package name de tu app (p. ej. `com.example.app`)
- `EXPO_PUBLIC_APPWRITE_OAUTH_SUCCESS_URL` – URL de redirección tras OAuth (configurada en Appwrite). Example for Expo AuthSession: `https://auth.expo.io/@<expo-username>/<expo-slug>` or a custom scheme like `com.example.mobileappappwrite://redirect`.
- `EXPO_PUBLIC_APPWRITE_OAUTH_FAILURE_URL` – URL de fallo tras OAuth (same host/scheme as success). Add these to Appwrite console under your project's Google OAuth provider settings.

4. Flujos comunes

- Crear una rama para tu cambio: `git checkout -b feat/mi-cambio`
- Hacer commits atómicos con mensajes claros
- Abrir Pull Request al `main` o al flujo que use el equipo

## Cómo subir este proyecto a GitHub (si aún no lo tienes remoto)

1. Crea el repo en GitHub (en tu cuenta). Si no quieres usar la UI, puedes usar `gh` o la API.
2. Añade remoto y sube:

```bash
git remote add origin git@github.com:TU_USUARIO/product-management-app.git
git push -u origin main
```

Si el repositorio remoto es vacío y no deja forkear, puedes crear tu propio repo y hacer push a él (ver instrucciones anteriores).

## Estructura importante

- `App.tsx` – punto de entrada
- `src/navigation` – navegación de la app
- `src/features/auth` – formularios y botones de login
- `src/features/products` – `ProductListScreen`, `ProductCard`
- `src/store` – configuración del store y hooks

## Contribuir
- Abre un issue para proponer cambios grandes
- Haz PRs pequeñas y revisables

---
Si quieres, puedo: (a) crear este `README.md` (ya lo añadí), (b) añadir un `CONTRIBUTING.md` o (c) crear un commit inicial y ayudarte a subirlo a tu repo en GitHub. ¿Qué prefieres que haga ahora?
Welcome
