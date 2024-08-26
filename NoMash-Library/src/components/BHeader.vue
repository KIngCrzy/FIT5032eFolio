<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link v-if="!isAuthenticated && $route.path !== '/login'" to="/login" class="nav-link" active-class="active">Go to login</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="isAuthenticated" to="/home" class="nav-link" active-class="active">Home (Week 5)</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="isAuthenticated" to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <button v-if="isAuthenticated" @click="logout" class="btn btn-link nav-link">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const isAuthenticated = ref(localStorage.getItem('isAuthenticated'));
const router = useRouter();
const route = useRoute();
const updateAuthStatus = () => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated');
};

const logout = () => {
  localStorage.removeItem('isAuthenticated');
  isAuthenticated.value = null;
  window.dispatchEvent(new CustomEvent('auth-change'));
  router.push('/login'); 
};

onMounted(() => {
  window.addEventListener('auth-change', updateAuthStatus);
});

onUnmounted(() => {
  window.removeEventListener('auth-change', updateAuthStatus);
});
</script>


<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}

.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
