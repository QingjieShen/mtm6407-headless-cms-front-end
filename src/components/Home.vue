<script setup>
import { ALL_PRODUCTS_URL } from '../utils';
import { useFetch } from '@vueuse/core';
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

const products = ref([]);

onMounted(async () => {
  const { data } = await useFetch(ALL_PRODUCTS_URL).json();
  
  if (data.value) {
    products.value = data.value.data;
  }

  isLoading.value = false;
});
</script>

<template>
  <h1>Products</h1>
  <div v-if="isLoading" class="loader"></div>
  <ul v-else class="products">
    <li v-for="product in products" :key="product.id">
      <a :href="`/details/${product.id}`" class="product-link">
        <img :src="product.attributes.image?.data?.attributes?.url || 'fallback-image-url.jpg'" class="product-image" />
        <div class="product-info">
          <h3 class="product-maker">{{ product.attributes.maker }}</h3>
          <p class="product-model">{{ product.attributes.model }}</p>
          <strong class="product-price">${{ product.attributes.price }}</strong>
        </div>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px; 
  list-style: none;
  padding: 0;
  margin: 0;
}

.products li {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: transform 0.3s ease;
}

.products li:hover {
  transform: scale(1.02);
}

.product-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.product-image {
  width: 100%;
  height: 200px; 
  object-fit: cover; 
}

.product-info {
  padding: 16px;
  flex: 1; 
}

.product-maker {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.product-model {
  margin: 8px 0;
  font-size: 1rem;
}

.product-price {
  font-size: 1.1rem;
  color: #333;
}

@media (max-width: 768px) {
  .products {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products {
    grid-template-columns: 1fr; 
  }
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
