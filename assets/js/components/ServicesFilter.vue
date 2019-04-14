<template>
<div>
	<div>
		<CityFilter :citiesList="citiesList" />

		<div>
			<div v-for="service in allServices" >
				<input v-model="services" type="checkbox" :value="service.id" :id="'service_'+service.id" />
				<label :for="'service_'+service.id">{{service.name}}</label>
			</div>
		</div>
	</div>

	<div>
		<label class="uk-form-label column-name">Услуги для частных лиц</label>
		<div>
			<div v-for="service in flServices" >
				<input v-model="services" type="checkbox" :value="service.id" :id="'service_'+service.id" />
				<label :for="'service_'+service.id">{{service.name}}</label>
			</div>
		</div>
	</div>

	<div>
		<label class="uk-form-label column-name">Услуги для юридических лиц</label>
		<div>
			<div v-for="service in urServices">
				<input v-model="services" type="checkbox" :value="service.id" :id="'service_'+service.id" />
				<label :for="'service_'+service.id">{{service.name}}</label>
			</div>
		</div>
	</div>
</div>
</template>

<script>
    import * as MUTATION from './../misc/mutation-types.js'        // Типы мутаций
	import CityFilter from "./CityFilter.vue";
    
    export default {
        name: "ServiceFilter",
        
        props: [
            "servicesList",            // Перечень предоставляемых услуг
			"citiesList"
        ],
        
        data() {
            return {

            }
        },
		
        components: {
            CityFilter,     // Фильтр по городу
        },		
            
        computed: {
            // Выбранные услуги
            services: {
                get() {
                    return this.$store.state.filter.selectedServices
                },
                
                set(value) {
                    this.$store.commit([MUTATION.SELECT_SERVICES], value);
                }
            },
            
            // Услуги для юрлиц
            urServices: function() {
                return this.servicesList.filter(x => {
                   return x.category == 'ur';
                });
            },
            
            // Услуги для физлиц
            flServices: function() {
                return this.servicesList.filter(x => {
                   return x.category == 'fl';
                });
            },
            
            // Услуги для обоих категорий
            allServices: function() {
                return this.servicesList.filter(x => {
                    return x.category == 'all';
                });
            },
        },
        
        methods: {
            debug: function() {
                console.log(this.$store.state.filter.selectedServices);
            }
        }
    }
</script>

<style scoped>
    
</style>