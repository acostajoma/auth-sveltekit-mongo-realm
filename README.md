# Authentication with Mongo, Realm Web Sdk and Sveltekit

## Creating a project

To start, you'll need to create an App on MongoDB Atlas(under app services)
After that, create an .env file and add the id of your app on a PUBLIC_APP_ID variable. Example below:

```javascript
PUBLIC_APP_ID=your_app
```

## MongoDB Config
You'll need to turn on the Email/Password auth on MongoDB. This can be found on MongoDB Atlas on App Services > Authentication > Authentication Providers > Email/Password.

## Starting project
Once Mongo and your .env file have been configured, run the command below to start the app:
```bash
npm run dev
```