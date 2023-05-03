# Getting Started with Create React App

This project was create in firebase and react js.

After you clone the project first install node_modules using the command "yarn install" (note: use yarn manager, install it first in your machine).
After you installing the node_modules, create a firebase account, go to this link "https://console.firebase.google.com/" then add project and create a project name then click "create project".

Then go to project overview in rigth side click project settings then scroll down then in "Your Apps" Add the web app click this icon "</>" then add name to the app.
After that copy this firebaseConfig"
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
"
then in the app go to "src" folder then "app" folder then "stores" folder then remove change the "firebaseConfig".

Then run the app using "yarn start".




