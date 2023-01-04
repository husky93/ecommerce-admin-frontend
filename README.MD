# ecommerce-admin-dashboard

Fully functional Ecommerce Admin Dashboard linked with REST API written in Node.js and Express. You can see API code here:
<br />
### [Shop API](https://github.com/husky93/express-shop-api)


Made with use of [React](https://pl.reactjs.org/) library along with [TypeScript](https://www.typescriptlang.org/) for type checking. [React Query](https://react-query-v3.tanstack.com/) along with [axios](https://axios-http.com/) was used for data fetching, caching and general management of asynchronous state. [React Hook Form](https://react-hook-form.com/) was used for form handling along with [zod](https://github.com/colinhacks/zod) for schema validation.

### Live: [click here](https://husky93.github.io/ecommerce-admin-frontend/)

## Features
- Authentication based on email and password inputs. Server side Authentication based on JWT Token.
- Dashboard routes protected from displaying for non-authenticated users.
- Nested routing system.
- Fetched data caching using React Query.
- Refetch cached data while it has been mutated by user.
- CPU expensive Homepage data calculations memoized with React hook useMemo.
- Responsive table displaying recent transactions on Dashboard homepage (fetched from API with ``recent`` filter as a HTTP request parameter).
- Display Spinner or Skeleton placeholders while waiting for API response.
- ### CRUD functionality for Items and Categories models:
  - Create form with validation.
  - Update form fetches and displays current item / category data as inputs default values.
  - Update Item form fetches categories and displays them as select input options.
  - Delete option with confirm popup modal.
  - CRUD operations based on external custom-made API.
  - Display error on invalid API response.
  - Refetch cached data and redirect user on valid API response.
- Display data for Transaction model.
- Change transaction status on select input change (API request).

### Dependencies Used:
- [React](https://pl.reactjs.org/)
- [React Router](https://reactrouter.com/en/main)
- [React Query](https://react-query-v3.tanstack.com/)
- [axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/)
- [zod](https://github.com/colinhacks/zod)
- [React Toastify](https://www.npmjs.com/package/react-toastify)
- [React Content Loader](https://skeletonreact.com/)
- [date-fns](https://date-fns.org/)


#### Dev dependencies and tools used:
- [TypeScript](https://www.typescriptlang.org/)
- [vite](https://vitejs.dev/)
- [PostCSS Autoprefixer](https://github.com/postcss/autoprefixer)
