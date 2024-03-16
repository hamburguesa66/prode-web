# prode-web

Frontend for a custom implementation of the argentinian sports forecasting game commonly known as [PRODE](https://es.wikipedia.org/wiki/Pron%C3%B3sticos_deportivos).  

If you are looking the backend piece, go [here](https://github.com/hamburguesa66/prode-api).

## Requirements

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more by checking the proper [documentation](https://facebook.github.io/create-react-app/docs/getting-started).

* [Node.js](https://nodejs.org/) (v16+)
* [npm](https://www.npmjs.com/) (v8+)

## Local setup

1. Clone the repository.

```bash
git clone https://github.com/hamburguesa66/prode-web
```

2. Get into `prode-web` and install the dependencies.

```bash
yarn install
```

3. Create a file named `.env.local` with the following:

```bash
REACT_APP_API_URL=http://localhost:8080/
```

> Note: the final location would be `./prode-web/.env.local`

4. Run the app.

```bash
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

## Deployment

### Generate build

Build the app for production to the `build` folder.

```bash
yarn build
```

> The command bundles React in production mode and optimizes the build for the best performance.

> The build is minified and the filenames include the hashes.

> See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Server side setup

1. Configure the following environment variables:

| Variable            | Description                   | Example                 |  
|---------------------|-------------------------------|-------------------------|
| `REACT_APP_API_URL` | Base URL of the API (backend) | `http://localhost:8080` |

2. Set up the Redirect and Rewrite Rules.

| Source              | Destination                   | Action                  |  
|---------------------|-------------------------------|-------------------------|
| `/*`                | `/index.html`                 | `Rewrite`               |
