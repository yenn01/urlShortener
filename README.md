# Shorter
![image](https://user-images.githubusercontent.com/48972583/218263393-4909c658-805d-4d3f-b6ee-c546ba55fb3d.png)

A service web application that helps users shorten long URLs into a **_shorter_** URL. <br/>
Inspired by IPFS style hashing methods to detect similar files. <br/>Long URLs which have Short URLs (Surls) created will show all existing short URLs for that URL. Users can choose to either create public Surls which can be seen by everyone or opt to login (via Google) to create private URLs that will only be shown to the creating user.

Live website can be found [here](https://shorter-cgcko.vercel.app/) (https://shorter-cgcko.vercel.app/) and is built directly from this repository

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

### Known Bugs
Checking for another Long URL while the ```<Title>``` is being fetched for the previous Long URL may result in the previous title replacing the currently displayed ```<Title>``` if the previous Long URL fetch takes too long.

---
## Test cases
```HTTP
https://www.google.com/
https://www.facebook.com/
https://en.wikipedia.org/wiki/Adler-32
```







