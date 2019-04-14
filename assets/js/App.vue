<template>
	<div id="app">
		<v-app id="inspire">
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
					
                    services: [     // Список предоставляемых услуг
                        // Услуги для юрлиц
                        { 
                            id: 500, 
							name: 'Операционное обслуживание',
                            category: 'ur' 
                        },
                        {   
                            id: 501, 
							name: 'Прием наличных для зачисления на р/с', 
                            category: 'ur'
                        },
                        {
                            id: 502, 
							name: 'Безналичное валютное обслуживание', 
                            category: 'ur'
                        },
                        {
                            id: 503, 
							name: 'Кредитование', 
                            category: 'ur'
                        },
                        
                        // Услуги для физлиц
                        {
                            id: 100, 
							name: 'Банковские карты', 
                            category: 'fl'
                        },
                        { 
                            id: 101, 
							name: 'Денежные переводы', 
                            category: 'fl' 
                        },
                        { 
                            id: 102, 
							name: 'Валютно-обменные операции', 
                            category: 'fl' 
                        },
                        { 
                            id: 103, 
							name: 'Кредитование', 
                            category: 'fl' 
                        },
                        { 
                            id: 104, 
							name: 'Операции с монетами и драгоценными металлами', 
                            category: 'fl' 
                        },
                        { 
                            id: 105, 
							name: 'Вклады, текущие счета', 
                            category: 'fl' 
                        },
                        {
                            id: 110, 
							name: 'Сбор данных для ЕБС', 
                            category: 'fl' 
                        },
                        
                        // Услуги для обоих категорий
                        { 
                            id: 106, 
                            name: 'Сейфовые ячейки', 
                            category: 'all',
                        },
                        { 
                            id: 107, 
                            name: 'Прием платежей', 
                            category: 'all',
                        },
                        {
                            id: 108, 
                            name: 'Терминал самообслуживания', 
                            category: 'all',
                        },
                        { 
                            id: 109, 
                            name: 'Банкомат', 
                            category: 'all',
                        }
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
            //let urlOffices = 'https://www.kubankredit.ru/service/?json=Y';

            let _this = this;
			
			_this.lists.objects = Data.ITEMS;   // Список объектов обслуживания
			_this.lists.cities = Data.CITYS;    // Список населенных пунктов

            // Получение списков нас. пунктов и объектов обслуживания
			/*
            this.$http.get(urlOffices+"&"+this.rnd()).then((response) => {
                _this.lists.objects = response.data.ITEMS;   // Список объектов обслуживания
                _this.lists.cities = response.data.CITYS;    // Список населенных пунктов
            });
			*/
        },
    }
</script>
    
<style scoped>
.content .main-page-banner {
	background-color: #fff;
}   

.content .main-page-banner .banner-main {
	min-height: auto;
} 

.content .main-page-banner .main-banner-article .uk-article .uk-article-title {
	color: #000;
}
</style>