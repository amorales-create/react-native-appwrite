# AGENT.md

## Contexto del proyecto

Gildi es una app móvil basada en React Native, estructurada por carpetas de funcionalidad (feature folders). Utiliza Redux Toolkit para el manejo de estado, Tailwind CSS para estilos, e internacionalización con i18n.

---

## Arquitectura

La arquitectura está basada en el patrón modular por features:

- Cada feature tiene su propia carpeta bajo `src/features/`.
- Dentro de cada feature:
  - `components/`: Componentes UI específicos de la feature.
  - `screens/`: Pantallas de la feature.
  - `store/`: Slices y selectors de Redux para la feature.
- Recursos compartidos van en `src/shared/` (tema, store global, i18n, tipos).
- La navegación está centralizada en `src/navigation/`.
- Los assets estáticos van en `assets/`.

Ventajas:

- Escalabilidad: Fácil agregar nuevas features sin afectar otras.
- Mantenibilidad: Separación clara de responsabilidades.
- Reusabilidad: Recursos compartidos accesibles desde cualquier feature.

---

## Reglas CSS y Tailwind

- Usar clases de Tailwind para estilos rápidos y consistentes.
- Los estilos globales deben ir en `global.css`.
- Personalizaciones y extensiones de Tailwind en `tailwind.config.js`.
- Evitar estilos inline salvo casos muy puntuales.
- Para componentes complejos, crear clases utilitarias en `global.css`.
- Seguir la convención de nombres de Tailwind y evitar duplicidad de clases.

---

## Creación de una nueva feature

1. Crear una carpeta bajo `src/features/` con el nombre de la feature.
2. Dentro de la carpeta, crear:
   - `components/`: Para componentes UI de la feature.
   - `screens/`: Para pantallas principales de la feature.
   - `store/`: Para slices y selectors de Redux relacionados.
3. Registrar la pantalla en el sistema de navegación (`src/navigation/AppNavigator.tsx`).
4. Si la feature requiere tipos globales, agrégalos en `src/shared/types/`.
5. Si la feature requiere recursos compartidos (colores, textos, hooks), agrégalos en `src/shared/`.
<!-- 6. Añadir tests en `src/__tests__/` o archivos `*.test.ts(x)` dentro de la feature. -->
6. Usar clases de Tailwind para los estilos y agregar utilidades en `global.css` si es necesario.
7. Documentar la feature en el Readme si es relevante.

---

## Herramientas

<!-- - Testing: Jest (`jest.config.js`). -->

- Linter: ESLint (migrar a `eslint.config.js` para v10).
- Formateo: Prettier (`.prettierrc`).

## Scripts

- `npm run test`: Ejecuta tests.
- `npm run lint`: Linter.
- `npm run format`: Formatea el código.

## Recomendaciones

<!-- - Añadir tests en `src/__tests__/` o archivos `*.test.ts(x)`. -->

- Migrar ESLint a `eslint.config.js`.
- Mantener la estructura modular y reutilizable.

---

## Ejemplo de estructura de una feature

```
src/features/nuevaFeature/
	components/
		NuevoComponente.tsx
	screens/
		NuevaPantalla.tsx
	store/
		nuevaFeatureSlice.ts
		nuevaFeatureSelectors.ts
```

---

## Buenas prácticas

- Mantener los archivos pequeños y enfocados.
- Usar hooks personalizados en `src/shared/hooks/` si se reutilizan.
- Documentar componentes complejos.
- Usar internacionalización para textos visibles.
- Revisar y formatear el código antes de hacer commit.

---

## Convenciones de idioma

- **Variables y comentarios:** Todas las variables y comentarios en el código deben estar escritos en inglés para mantener consistencia y facilitar la colaboración internacional.
- **Textos en la interfaz de usuario:** Todos los textos generados en los templates (como botones, encabezados, etc.) deben estar en inglés. No se deben usar textos hardcodeados.
- **Internacionalización:**
  - Todos los textos deben ser registrados en los archivos JSON de internacionalización (`src/shared/i18n/en.json` y `src/shared/i18n/es.json`).
  - Utilizar la función `t()` para acceder a los textos registrados en los archivos de internacionalización.
  - Ejemplo:

    ```tsx
    import { t } from 'i18next';

    const MyComponent = () => <button>{t('button.submit')}</button>;
    ```
