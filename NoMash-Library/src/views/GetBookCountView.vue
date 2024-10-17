<template>
    <div id="app">
        <h1>Book Counter</h1>
        <button @click="getBookCount">Get Book Count</button>
        <p v-if="count !== null">Total number of books: {{ count }}</p>
        <p v-if="error">{{ error }}</p>
        <h1>Add Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <button type="submit">Add Book</button>
        </form>

        <p v-if="message">{{ message }}</p>
        <p v-if="addBookError">{{ addBookError }}</p>
    </div>
    
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            count: null,
            error: null,
            isbn: '',
            name: '',
            addBookError: null,
            message: null,
        };
    },
    methods: {
        async getBookCount() {
            try {
                const response = await axios.get('https://countbooks-dpjhf5srva-uc.a.run.app');
                this.count = response.data.count;
                this.error = null;
            } catch (error) {
                console.error('Error fetching book count:', error);
                this.error = error;
                this.count = null;
            }
        },
        async addBook() {
            try {
                const response = await axios.post('https://addbook-dpjhf5srva-uc.a.run.app', {
                    isbn: this.isbn,
                    name: this.name,
                });
                
                this.message = response.data;
                this.addBookError = null;

                this.isbn = '';
                this.name = '';
            } catch (error) {
                console.error('Error adding book:', error);
                this.addBookError = 'Error adding book';
                this.message = null;
            }
        },
    },
};
</script>