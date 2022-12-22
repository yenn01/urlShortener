# Shorter

A service web application that helps users shorten long URLs into a smaller URL.

Live web site can be found [here](https://shorter-cgcko.vercel.app/) (https://shorter-cgcko.vercel.app/).

---

## Installation

### Stack
- Svelte
- Firebase Realtime Database

### Setting up Firebase
Create a `.env` at root of project folder and copy from Firebase your Firebase Realtime Database Config Keys in it as follows:
```
API_KEY=PUT_YOUR_API_KEY_FROM_FIREBASE_HERE
AUTH_DOMAIN=PUT_YOUR_URL_FROM_FIREBASE_HERE
DATABASE_URL=PUT_YOUR_URL_FROM_FIREBASE_HERE
PROJECT_ID=PUT_YOUR_PROJECT_ID_FROM_FIREBASE_HERE
STORAGE_BUCKET=PUT_YOUR_STORAGE_BUCKET_FROM_FIREBASE_HERE
MESSAGING_SENDER_ID=PUT_YOUR_ID_HERE
APP_ID=PUT_YOUR_ID_HERE
MEASUREMENT_ID=PUT_YOUR_ID_HERE
```

### Svelte
This is a project built on [Svelte](https://svelte.dev). Run the following code to install needed dependencies.

```bash
npm install
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```


Navigate to [localhost:8080](http://localhost:8080) or refer to CLI for another port number if 8080 is taken.

If you're using [Visual Studio Code](https://code.visualstudio.com/) it is recommend to instal the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

### Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```
---
### Important Note
The current configuration of the source codes are meant for production. Certain changes are needed to run on `localhost`. Changing the url format from `https://` to `http://` for two fetch functions are needed. They are the fetch title of website function at `Input.svelte` and the redirection function at `Db.svelte`.

### Disclaimer
The website's front-end development was coded with the latest browser supports in mind, legacy browsers may not be supported.







