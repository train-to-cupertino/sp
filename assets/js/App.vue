<template>
	<div>
		<v-app>
			<v-container text-xs-center>
				<v-layout row wrap>
					<v-flex xs4>
						<ObjectsFilter :lists="lists" />
					</v-flex>
					<v-flex xs8>
						<ObjectsView :viewType="viewType" :lists="lists"/>
					</v-flex>				
				</v-layout>
			</v-container>
		</v-app>
	</div>
</template>

<script>
	import ObjectsFilter from "./components/ObjectsFilter.vue";
	import ObjectsView from "./components/ObjectsView.vue";
	import Data from "./data/service_points.js";

    // Головной компонент приложения "Офисы и банкоматы"
    export default {
        name: "App",
        
        data() {
            return {
                // Списки данных
                lists: {
                    cities: [],     // Список населенных пунктов
                    objects: [],    // Список объектов обслуживания
					
                    services: [
                    ]
                }
            }
        },        
        
        computed: {
			
            // Тип отображения объектов, соответствующих фильтру
            viewType: {
                get() {
                    return this.$store.state.viewType;
                }
            },
        },
        
        components: {
            ObjectsFilter,  // Фильтр объектов обслуживания: выбор города, выбор услуг
            ObjectsView,    // Отображение объектов обслуживания. Способы отображения: список, карта
        },
        
        methods: {
            rnd: function() {
                return Math.round();
            },
        },
        
		created() {
            let pointsUrl = 'http://q9853157.beget.tech/sp/points.json';
            let servicesUrl = 'http://q9853157.beget.tech/sp/services.json';

            let _this = this;
			
			/*
			_this.lists.objects = Data.ITEMS;   // Список объектов обслуживания
			_this.lists.cities = Data.CITYS;    // Список населенных пунктов
			console.log(_this.lists);
			*/
			
            // Точки
            this.$http.get(pointsUrl).then((response) => {
                _this.lists.objects = response.data.ITEMS;   // Список объектов обслуживания
                _this.lists.cities = response.data.CITYS;    // Список населенных пунктов
            })

			// Услуги
            this.$http.get(servicesUrl).then((response) => {
				console.log(response);
                _this.lists.services = response.data.services;
            })			
        },
    }
</script>
    
<style scoped>

</style>