# Vehicle Product Display Website
## Overview
- This project is a vehicle product display website showcasing images and details of various vehicles. All vehicle images were captured by [Qingjie (Clark)](https://qingjie.dev) in 2023. 
- The vehicle information displayed includes the maker, model, year, and a description, though the prices are fictional.
- On the home page, users can browse a summary of all vehicles and use the search functionality to filter results based on color, make, model, description, and year. 
- Clicking on a vehicle navigates to a detailed information page with more comprehensive data.

## Key Features
- **Home Page:** Displays brief information for all vehicles with a search function to filter by various criteria.
- **Detailed View:** Each vehicle has a detailed page accessible via navigation from the home page.
- **Search Functionality:** Users can search vehicles by year, model, maker, description, and color.
- **Loading State:** A loading effect is shown while data is being fetched from the server.
- **Navigation:** Includes a "Back to Home" link on the detail page for easy navigation.

## Technology
- **Front-End:** Built with Vue.js, utilizing the @vueuse/core for data fetching and state management.
- **Back-End:** The [REST API](https://mtm6407-headless-cms-back-end.onrender.com/api/vehicles?populate=*) is powered by a headless CMS built with Strapi, and hosted on Render. The API provides data for the front-end to consume.
- **Deployment:** The website is deployed and accessible at [https://headless-cms-product-review.netlify.app/](https://headless-cms-product-review.netlify.app/).

## Installation
- To run this project locally, clone the repository and install the dependencies:

```
npm install
npm run dev
```
