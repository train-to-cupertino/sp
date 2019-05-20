<template>
<div>
	<div>
		<CityFilter :citiesList="citiesList" />
		
		<v-tabs
			v-model="activeGroup"
			color="red darken-4"
			dark
			slider-color="white"
		>
			<v-tab
				key="0"
				ripple
			>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-icon
							:style="{ cursor: 'pointer' }"
							color="white"
							v-on="on"
						>
							apps
						</v-icon>
					</template>
					<span>Для всех клиентов</span>
				</v-tooltip>
			</v-tab>
			<v-tab
				key="1"
				ripple
			>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-icon
							:style="{ cursor: 'pointer' }"
							color="white"
							v-on="on"
						>
							person
						</v-icon>
					</template>
					<span>Для частных клиентов</span>
				</v-tooltip>
			</v-tab>
			<v-tab
				key="2"
				ripple
			>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-icon
							:style="{ cursor: 'pointer' }"
							color="white"
							v-on="on"
						>
							business
						</v-icon>
					</template>
					<span>Для корпоративных клиентов</span>
				</v-tooltip>			
			</v-tab>
			
			<v-tab-item
				key="0"
			>
				<v-card flat>
					<div>
						<div v-for="service in allServices" >
							<v-checkbox
								color="red darken-4" 
								v-model="services"
								:label="service.name"
								:value="service.id"
							></v-checkbox>				
						</div>
					</div>
				</v-card>
			</v-tab-item>
			<v-tab-item
				key="1"
			>
				<v-card flat>
					<div>
						<div v-for="service in flServices" >
							<v-checkbox
								color="red darken-4" 
								v-model="services"
								:label="service.name"
								:value="service.id"
							></v-checkbox>
						</div>
					</div>
				</v-card>
			</v-tab-item>
			<v-tab-item
				key="2"
			>
				<v-card flat>
					<div>
						<div v-for="service in urServices">
							<v-checkbox
								color="red darken-4" 
								v-model="services"
								:label="service.name"
								:value="service.id"
							></v-checkbox>				
						</div>
					</div>
				</v-card>
			</v-tab-item>
			
			
		</v-tabs>		

	</div>
</div>
</template>

<script>
		import * as MUTATION from './../misc/mutation-types.js'				// Типы мутаций
	import CityFilter from "./CityFilter.vue";
		
		export default {
				name: "ServiceFilter",
				
				props: [ 
					"servicesList",						// Перечень предоставляемых услуг
					"citiesList"
				],
				
				data() {
					return {
						activeGroup: null
					}
				},
		
				components: {
					CityFilter,		 // Фильтр по городу
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