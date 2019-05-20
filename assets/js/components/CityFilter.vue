<template>
	<div>
		<!--<label>Населенный пункт</label>-->
			<!--
			<select id="citySelect" v-model="city" class="select_default city_choose">
				<option v-for="city in citiesList" :value="city.id">{{city.name}}</option>
			</select>
			-->
			<v-select
				:items="citiesList"
				label="Solo field"
				solo
				item-text="name" 
				item-value="id"
				v-model="city"
				class="ma-0	pa-0"
			></v-select>
	</div>
</template>

<script>
    import * as MUTATION from './../misc/mutation-types.js'        // Типы мутаций
    
    // Компонент "Фильтр отображаемых объектов обслуживания по городу"
    export default {
        name: "CityFilter",
        
        props: [
            "citiesList",   // Перечень городов
        ],
		
		data() {
			return {
				defaultCity: {
				  name: "г. Краснодар",
				  id: "991"
				},				
			}
		},
        
        computed: {
            // Выбранный город
            city: {
                get() {
                    return this.$store.state.filter.cityId;
                },
                
                set(value) {
                    this.$store.commit([MUTATION.SELECT_CITY], value);
                }
            }
        },
        
        methods: {
            debug: function() {
                console.log(this.$store.state.filter.cityId);
            },
			
			cityChanged: function(value) {
				this.$store.commit([MUTATION.SELECT_CITY], value);
			}
        },
    }
</script>

<style scoped>
    
</style>