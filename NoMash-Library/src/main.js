import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmOnBhIu4Edy2hDj8rY1o-6WjgsMGkCjc",
  authDomain: "week7-rujieye.firebaseapp.com",
  projectId: "week7-rujieye",
  storageBucket: "week7-rujieye.appspot.com",
  messagingSenderId: "653767288485",
  appId: "1:653767288485:web:19426a9fe672fd8ef40f4c"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')