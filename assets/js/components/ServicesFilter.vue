<template>
<div class="content-box">
    <div class="uk-container uk-container-center">
        <div class="uk-grid">
		
            <div class="uk-width-medium-1-3 uk-width-small-1-1">
                <div class="form_margin uk-display-inline-block">
                    <form class="uk-form uk-form-stacked">
						<CityFilter :citiesList="citiesList" />

                        <div class="input_box uk-display-inline-block">
                            <div class="uk-form-controls checkbox-group">
								<div v-for="service in allServices" >
									<input v-model="services" type="checkbox" :value="service.id" :id="'service_'+service.id" />
									<label :for="'service_'+service.id">{{service.name}}</label>
								</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="uk-width-medium-1-3 uk-width-small-1-1">
                <div class="form_margin uk-display-inline-block">
                    <form class="uk-form uk-form-stacked">
                        <label class="uk-form-label column-name">Услуги для частных лиц</label>
                        <div class="input_box uk-display-inline-block">
                            <div class="uk-form-controls checkbox-group">
								<div v-for="service in flServices" >
									<input v-model="services" type="checkbox" :value="service.id" :id="'service_'+service.id" />
									<label :for="'service_'+service.id">{{service.name}}</label>
								</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>			
			
            <div class="uk-width-medium-1-3 uk-width-small-1-1">
                <div class="form_margin uk-display-inline-block">
                    <form class="uk-form uk-form-stacked">
                        <label class="uk-form-label column-name">Услуги для юридических лиц</label>
                        <div class="input_box uk-display-inline-block">
                            <div class="uk-form-controls checkbox-group">
								<div v-for="service in urServices" >
									<input v-model="services" type="checkbox" :value="service.id" :id="'service_'+service.id" />
									<label :for="'service_'+service.id">{{service.name}}</label>
								</div>
                            </div>
                        </div>
                    </form>
                </div>
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