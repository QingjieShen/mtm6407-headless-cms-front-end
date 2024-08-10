<script setup>
import { ALL_PRODUCTS_URL, formatPrice } from '../utils';
import { useFetch } from '@vueuse/core';
import { ref, onMounted, computed } from 'vue';

const isLoading = ref(true);
const products = ref([]);
const searchQuery = ref('');

const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return products.value.filter(product => product.attributes.maker.toLowerCase().includes(query) || product.attributes.model.toLowerCase().includes(query) || product.attributes.description.toLowerCase().includes(query) || product.attributes.color.toLowerCase().includes(query) || product.attributes.year.toString().toLowerCase().includes(query))
});

onMounted(async () => {
  const { data } = await useFetch(ALL_PRODUCTS_URL).json();
  
  if (data.value) {
    products.value = data.value.data;
  }

  isLoading.value = false;
});

</script>

<template>
  <div v-if="isLoading" class="loader"></div>
  <div v-else>
    <div class="header-text">
      <h1>Products</h1>
      <input class="search-input" v-model="searchQuery" type="text" placeholder="Search by vehicle info" />
    </div>
    <ul class="products">
      <li v-for="product in filteredProducts" :key="product.id">
        <router-link :to="`/details/${product.id}`" class="product-link">
          <img :src="product.attributes.image?.data?.attributes?.url || 'fallback-image-url.jpg'" class="product-image" />
          <div class="product-info">
            <h3 class="product-maker">{{ product.attributes.maker }}</h3>
            <p class="product-model">{{ product.attributes.year }} {{ product.attributes.model }}</p>
            <strong class="product-price">${{ formatPrice(product.attributes.price) }}</strong>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>

.header-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.header-text .search-input {
  height: 1.5rem;
  justify-self: baseline;
  padding: 0.5rem;
  border-radius: 0.4rem;
  border: solid 1px #3c3c3c;
}

.products {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px; 
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 1200px;
  margin: 0 auto;
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


@media (min-width: 480px) {
  .products {
    grid-template-columns: 1fr 1fr; 
  }
}

@media (min-width: 768px) {
  .products {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .products {
    grid-template-columns: repeat(4, 1fr);
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
