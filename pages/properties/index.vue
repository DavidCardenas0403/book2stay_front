<template>
  <div>
    <h3 class="text-center mb-8">{{ $t('general.ourProperties') }}</h3>

    <FilterBar @filterPrice="handleFilterPrice" @filterBeds="handleFilterBeds" @filterItems="handleFilterMoreInfo"
      @filterSearch="handleFilterSearch">
    </FilterBar>





    <div v-if="filteredProperties.length > 0" class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <SimplePropertyCard v-for="property in filteredProperties" :key="property?.id" :search="useRoute().query"
        :property="property" />
    </div>
    <div v-else>
      <p v-if="filteredProperties.length === 0">
        No se encontraron propiedades que cumplan con los filtros seleccionados.
      </p>
      <Spinner v-else />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { fetchProperties, searchProperties } from '../../api/fetchProperties'
import SimplePropertyCard from '../../components/properties/SimplePropertyCard.vue'

const loading = ref(true)
const properties = ref([])
const filteredProperties = ref([])
const price = ref(null)
const beds = ref(null)
const moreInfo = ref(null)
const searchTerm = ref(null);

onMounted(async () => {
  if (useRoute().query?.start_date) {
    properties.value = await searchProperties(useRoute().query);
  } else {
    properties.value = await fetchProperties();
  }

  filteredProperties.value = properties.value // Initially set filteredProperties to all properties
  loading.value = false
})

const handleFilterPrice = (newValue) => {
  price.value = newValue;
  filterProperties();
}

const handleFilterBeds = (newValue) => {
  beds.value = newValue;
  filterProperties();
}

const handleFilterMoreInfo = (newValue) => {
  moreInfo.value = newValue;
  console.log(moreInfo.value);
  if (moreInfo.value.length == 0) {
    moreInfo.value = null
  }
  filterProperties();
}

const handleFilterSearch = (newValue) => {
  searchTerm.value = newValue;
  filterProperties();
};


const filterProperties = () => {
  filteredProperties.value = properties.value.filter((property) => {
    const priceFilter = price.value
    const bedsFilter = beds.value
    const itemFilter = moreInfo.value

    const passesPriceFilter = priceFilter ? (property.price >= priceFilter[0] && property.price <= priceFilter[1]) : true;
    const passesBedsFilter = bedsFilter ? (property.beds >= bedsFilter.beds) : true;

    const passesMoreInfoFilter = itemFilter ? itemFilter.every(detail => property[detail.moreInfo]) : true;

    const passesSearchFilter = searchTerm.value ?
      property.PropertyTexts.some(text => text.name.toLowerCase().includes(searchTerm.value.toLowerCase())) :
      true;

    return passesPriceFilter && passesBedsFilter && passesMoreInfoFilter && passesSearchFilter;
  });
  console.log(filteredProperties.value);
}

</script>
