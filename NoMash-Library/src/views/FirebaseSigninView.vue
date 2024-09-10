<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1>Sign in</h1>
                <p><input type="text" placeholder="Email" v-model="email" /></p>
                <p><input type="password" placeholder="Password" v-model="password" /></p>
                <p><button @click="signin">Sign in via Firebase</button></p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"
import { getFirestore, doc, getDoc } from "firebase/firestore"

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const signin = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        console.log("Firebase Sign in Successful!", userCredential.user);

        // Fetch user role from Firestore
        const userRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log("User Role:", userData.role);
        } else {
            console.log("No such document!");
            router.push("/");
        }
    } catch (error) {
        console.log("Sign in error:", error.code);
    }
};
</script>
