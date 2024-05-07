<template>
    <div>

        <h3 class="text-center mb-8">{{ $t("general.ourProperties") }}</h3>

        <FilterBar @filterPrice="handleFilterPrice" @filterBeds="handleFilterBeds" @filterItems="handleFilterMoreInfo">
        </FilterBar>

        <div v-if="filteredProperties.length > 0" class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SimplePropertyCard v-for="property in filteredProperties" :key="property?.id" :search="useRoute().query" :property="property" />
        </div>
        <div v-else>
            <p v-if="filteredProperties.length === 0">No se encontraron propiedades que cumplan con los filtros
                seleccionados.</p>
            <Spinner v-else />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fetchProperties, searchProperties } from "../../api/fetchProperties"
import SimplePropertyCard from "../../components/properties/SimplePropertyCard.vue"

const properties = ref([]);
const filteredProperties = ref([]);
const price = ref(null); // Define price ref
const beds = ref(null); // Define beds ref
const moreInfo = ref(null); // Define beds ref

onMounted(async () => {
    if(useRoute().query?.start_date) {
        properties.value = await searchProperties(useRoute().query);
    } else {
        properties.value = await fetchProperties();
    }

    filteredProperties.value = properties.value; // Initially set filteredProperties to all properties
})

// Event handlers for filter changes
const handleFilterPrice = (newValue) => {
    // Handle price filter change
    console.log('Price Filter Changed:', newValue);
    price.value = newValue; // Update price ref
    filterProperties();
}

const handleFilterBeds = (newValue) => {
    // Handle beds filter change
    console.log('Beds Filter Changed:', newValue);
    beds.value = newValue; // Update beds ref
    filterProperties();
}


const handleFilterMoreInfo = (newValue) => {
    // Handle beds filter change
    console.log('More Info Filter Changed:', newValue);
    moreInfo.value = newValue; // Update beds ref
    moreInfo.value.forEach(posicion => {
        console.log(posicion.name);
    });    
    filterProperties();
}
// Function to filter properties based on filter values
// const filterProperties = () => {
//     filteredProperties.value = properties.value.filter(property => {
//         const priceFilter = price.value;
//         const bedsFilter = beds.value;
//         const itemFiler = moreInfo.value;

//         // Check if property passes both price and beds filters
//         return (priceFilter ? (property.price >= priceFilter[0] && property.price <= priceFilter[1]) : true) &&
//             (bedsFilter ? (property.beds >= bedsFilter.beds) : true);
//     });
// }


const filterProperties = () => {
    filteredProperties.value = properties.value.filter(property => {
        const priceFilter = price.value;
        const bedsFilter = beds.value;
        const itemFilter = moreInfo.value;

        // Check if property passes price and beds filters
        const passesPriceFilter = priceFilter ? (property.price >= priceFilter[0] && property.price <= priceFilter[1]) : true;
        const passesBedsFilter = bedsFilter ? (property.beds >= bedsFilter.beds) : true;

        // Check if property has any itemFilter
        const passesItemFilter = itemFilter ? itemFilter.some(item => property.find(item.name)) : true;
        console.log(passesItemFilter);

        // Return true if property passes all filters
        return passesPriceFilter && passesBedsFilter && passesItemFilter;
    });
}

</script>