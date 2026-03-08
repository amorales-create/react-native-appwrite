## Configuración de testing, lint y formato

<!-- ### Testeo (Jest)
- Instalado y configurado en `jest.config.js`.
- Ejecuta los tests con:
  ```bash
  npm run test
  ```
- Actualmente no hay tests definidos, pero la configuración está lista. -->

### Linter (ESLint)

- Instalado y configurado.
- **Nota:** ESLint v10 requiere migrar la configuración a `eslint.config.js`.
- Ejecuta el linter con:
  ```bash
  npm run lint
  ```
- Para migrar la configuración, sigue la [guía oficial](https://eslint.org/docs/latest/use/configure/migration-guide).

### Formateo (Prettier)

- Instalado y configurado en `.prettierrc`.
- Ejecuta el formateo con:
  ```bash
  npm run format
  ```
- El comando arregla el estilo de código en todos los archivos.

### Scripts agregados

<!-- - `npm run test`: Ejecuta tests con Jest. -->
- `npm run lint`: Ejecuta ESLint.
- `npm run format`: Ejecuta Prettier.

### Recomendación

<!-- - Añade tests en `src/__tests__/` o archivos `*.test.ts(x)`. -->
- Migra la configuración de ESLint a `eslint.config.js` para compatibilidad total.

# Proyecto

## Descripción

Proyecto móvil basado en React Native, estructurado por funcionalidades (feature folders) para facilitar la escalabilidad y el mantenimiento. Utiliza Redux para la gestión de estado, Tailwind para estilos, y soporta internacionalización.

## Estructura principal

- `App.tsx`: Punto de entrada de la aplicación.
- `src/features/`: Funcionalidades principales (auth, products).
  - `components/`: Componentes UI específicos de cada feature.
  - `screens/`: Pantallas de cada feature.
  - `store/`: Slices y selectors de Redux.
- `src/shared/`: Recursos reutilizables.
  - `i18n/`: Configuración y archivos de internacionalización.
  - `store/`: Configuración global de Redux.
  - `theme/`: Configuración de tema y colores.
  - `types/`: Tipos globales.
- `src/navigation/`: Navegación centralizada.
- `assets/`: Recursos estáticos (imágenes, etc).

## Instalación

1. Clona el repositorio.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Ejecuta la app:
   ```bash
   npm start
   ```

## Tecnologías

- React Native
- Redux Toolkit
- Tailwind CSS
- Internacionalización (i18n)

## Scripts útiles

- `npm start`: Inicia el proyecto.
- `npm run android`: Ejecuta en Android.
- `npm run ios`: Ejecuta en iOS.

## Configuración de internacionalización

Los archivos de idioma están en `src/shared/i18n/`.

## Configuración de estilos

Tailwind configurado en `tailwind.config.js` y `global.css`.

## Contribución

1. Crea una rama desde `main`.
2. Haz tus cambios.
3. Abre un Pull Request.

## Licencia

MIT
Welcome
