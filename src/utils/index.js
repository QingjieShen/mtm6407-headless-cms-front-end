export const ALL_PRODUCTS_URL = 'https://mtm6407-headless-cms-back-end.onrender.com/api/vehicles?populate=*';
export const ONE_PRODUCTS_URL = 'https://mtm6407-headless-cms-back-end.onrender.com/api/vehicles';

export const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}