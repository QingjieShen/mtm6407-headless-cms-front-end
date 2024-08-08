<script setup>
import { useRoute } from 'vue-router';
import { useFetch } from '@vueuse/core';
import { ref, onMounted } from 'vue';
import { ONE_PRODUCTS_URL } from '../utils';

const route = useRoute();
const productId = route.params.id;
// console.log(productId)

const isLoading = ref(true);
const product = ref({});

onMounted(async () => {
  const { data } = await useFetch(`${ONE_PRODUCTS_URL}/${productId}?populate=*`).json();
  if (data.value) {
    product.value = data.value.data;
  }
  isLoading.value = false;
});
</script>

<template>
  <div v-if="isLoading" class="loader"></div>
  <div v-else class="product-detail">
    <button @click="$router.push('/')">&larr; Go Back to Home</button>
    <div class="product-info-container">
        <img :src="product?.attributes?.image?.data?.attributes?.url || 'fallback-image-url.jpg'" class="product-image" />
        <div class="product-info">
            <h2>{{ product?.attributes?.year }} {{ product?.attributes?.maker }} {{ product?.attributes?.model || "" }}</h2>
            <p>{{ product?.attributes?.description }}</p>
            <span>Our Price: <strong class="product-price">${{ product?.attributes?.price }}</strong></span>
        </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.product-detail button {
    background: none;
    width: 100%;
    border: none;
    text-align: left;
    font-size: 1.2rem;
    text-decoration: underline;
}

.product-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
}

.product-image {
    width: min(100%, 600px);
}

.product-info {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
}

.product-price {
    font-size: 1.5rem;
    color: #333;
}

/* Loader animation */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loader {
    border: 4px solid rgba(0, 0, 0, 0.2); 
    border-left-color: #333; 
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 50px auto;
}

@media only screen and (min-width: 992px) {
    .product-info-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
    }

    .product-info {
        margin-top: 0;
    }
}
</style>

