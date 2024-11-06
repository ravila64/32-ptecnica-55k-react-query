PASOS A SEGUIR ACTIVIDAD 11 - MIDUDEV CON REACT+TYPESCRIPT+ VITE

Prueba técnica con TypeScript y React
Esto es una prueba técnica de una empresa europea para un sueldo de 55000 €/anuales.

El objetivo de esta prueba técnica es crear una aplicación similar a la que se proporciona en este enlace: <https://midu-react-11.surge.sh/>. Para lograr esto, debe usar la API proporcionada por <https://randomuser.me/>.

Los pasos a seguir:

[√] Fetch 100 rows of data using the API.

[√] Display the data in a table format, similar to the example.

[√] Provide the option to color rows as shown in the example. -  35.18

[√] Allow the data to be sorted by country as demonstrated in the example.

[√] Enable the ability to delete a row as shown in the example.

[√] Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.

[√] Handle any potential errors that may occur.

[√] Implement a feature that allows the user to filter the data by country.

[√] Avoid sorting users again the data when the user is changing filter by country.

[√] Sort by clicking on the column header.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
