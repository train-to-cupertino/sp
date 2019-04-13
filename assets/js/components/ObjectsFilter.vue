<template>
    <div>
        <ServicesFilter :servicesList="lists.services" :citiesList="lists.cities" />
    </div>
</template>

<script>
    import ServicesFilter from "./ServicesFilter.vue";
    
    // Компонент "Фильтр отображаемых объектов обслуживания"
    export default {
        name: "ObjectsFilter",
        
        props: [
            "lists",        // Списки данных
        ],
        
        components: {
            ServicesFilter, // Фильтр по предоставляемым услугам
        },
    }
</script>

<style scoped>
    
</style>