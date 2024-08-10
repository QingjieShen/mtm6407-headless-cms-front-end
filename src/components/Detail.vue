<script setup>
import { useRoute } from 'vue-router';
import { useFetch } from '@vueuse/core';
import { ref, onMounted } from 'vue';
import { ONE_PRODUCTS_URL, formatPrice } from '../utils';

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
    <button @click="$router.push('/')">&larr; Back to Home</button>
    <div class="product-info-container">
      <img :src="product?.attributes?.image?.data?.attributes?.url || 'fallback-image-url.jpg'" alt="Product Image" class="product-image" />
      <div class="product-info">
        <h2>
          {{ product?.attributes?.year }} {{ product?.attributes?.maker }} {{ product?.attributes?.model || "" }}
        </h2>
        <p>{{ product?.attributes?.description }}</p>
        <span class="product-price">Our Price: <strong class="product-price-value">${{ formatPrice(product?.attributes?.price) }}</strong></span>
        <div class="product-actions">
          </div>
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
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-detail button {
  background: none;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.product-detail button:hover {
  background-color: #eee;
}

.product-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  @media only screen and (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
}

.product-image {
  width: min(100%, 600px);
  border-radius: 5px;
}

.product-info {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.product-price {
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
}

.product-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between; /* Align buttons horizontally */
}

.product-image:hover {
  transform: scale(1.05); /* Slight zoom on hover */
  transition: transform 0.2s ease-in-out;
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
</style>
