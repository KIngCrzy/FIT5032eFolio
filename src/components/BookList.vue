<template>
    <div>
        <h1>Search Books</h1>
        <form @submit.prevent="fetchBooks">
            <div>
                <label for="isbn-threshold">ISBN greater than:</label>
                <input type="number" v-model.number="isbn" id="isbn-threshold" required />
            </div>
            <div>
                <label for="limit">Limit Results:</label>
                <input type="number" v-model.number="limitResults" id="limit" required />
            </div>
            <button type="submit">Search</button>
        </form>
        <ul>
            <li v-for="book in books" :key="book.id">
                {{ book.name }} - ISBN: {{ book.isbn }}
                <button @click="updateBook(book.id, book.name)">Update</button>
                <button @click="deleteBook(book.id)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default {
    setup() {
        const books = ref([]);
        const isbn = ref(1000);
        const limitResults = ref(5);

        const fetchBooks = async () => {
            const q = query(
                collection(db, 'books'),
                where('isbn', '>', isbn.value),
                orderBy('isbn'),
                limit(limitResults.value)
            );
            const querySnapshot = await getDocs(q);
            books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        };

        const updateBook = async (id, currentName) => {
            const newName = prompt("Enter new book name:", currentName);
            if (newName) {
                await updateDoc(doc(db, 'books', id), { name: newName });
                fetchBooks();
            }
        };

        const deleteBook = async (id) => {
            await deleteDoc(doc(db, 'books', id));
            fetchBooks();
        };

        onMounted(fetchBooks);

        return {
            books, isbn, limitResults, updateBook, deleteBook, fetchBooks
        };
    }
};
</script>
