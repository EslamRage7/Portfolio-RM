# React + Vite

## Contact form (EmailJS)

1. Create an EmailJS email service and a template using the supplied contact
   email design.
2. In the template, use `{{name}}`, `{{email}}`, and `{{message}}` as the
   template variables. Set the recipient to the inbox that should receive
   contact requests; optionally set Reply-To to `{{email}}`.
3. Copy `.env.example` to `.env.local` and fill in the service ID, template ID,
   and public key from your EmailJS account.
4. Restart the Vite development server after changing environment values.

The EmailJS public key is used in the browser and is not a private credential.
Do not put private keys or service secrets in `VITE_` variables.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
