<template>
	<div class="map-block">
		<div class="content-box">
			<div class="uk-container-center uk-container absolute-pos">
				<div class="uk-grid">
					<div class="uk-width-medium-1-2 uk-width-1-2">
						<h3 class="uk-h3">Карта офисов</h3>
					</div>
					
					<ViewTypeSelect :prefix="'map_'" />
					
					<div class="uk-width-medium-1-1">

					</div>
				</div>
			</div>
			
			<div id="ymap"></div>
			
		</div>
	</div>
</template>

<script>
	import ViewTypeSelect from './ViewTypeSelect.vue'

    export default {
        name: "MapView",
        
        props: [
            "objects",      // Объекты обслуживания (приходят уже отфильтрованными)
            "cities",       // Города
        ],
		
		components: {
			ViewTypeSelect,	
		},
        
        data() {
            return {
                mapObject: null,    // Карта
            }
        },
        
        computed: {
            // ID выбранного города
            cityId: {
                get() {
                    return this.$store.state.filter.cityId;
                }
            },
            
            // Выбранные услуги
            selectedServices: {
                get() {
                    return this.$store.state.filter.selectedServices;
                }
            },

            // Тип отображения объектов обслуживания
            viewType: {
                get() {
                    return this.$store.state.viewType;
                }
            },
        },
        
        methods: {
            // Обновляет отрисовку объектов обслуживания, соответствующих фильтру
            renderFilteredObjects() {
                // Очищаем карту от всех объектов
                this.mapObject.geoObjects.removeAll();
                
                // Метки объектов обслуживания
                let placemarks = [];
                
                let PlacemarkHintLayout = ymaps.templateLayoutFactory.createClass(
					'<div class="balloon-wrap"' + 
						'<div class="balloon-inner-wrap">'+
							'<div class="balloon-header">$[properties.bContent.name]</div>' +
							'<div class="balloon-address">$[properties.bContent.address]</div>' + 
						'</div>' + 
					'</div>'
                );
                
                for(let obj of this.objects) {
                    let coords = obj['COORDS'].split(',');
                    
                    placemarks.push(new ymaps.Placemark(
                        [
                            coords[0], 
                            coords[1]
                        ],
                
                        {
                            bContent: {
                                name: obj['NAME'],
                                //address: obj['ADDR'] + ' ' + (obj['TIMETABLE'].reduce(function (accum, curVal) { return accum.concat(curVal.srvc); }, [] ).join(', ')),
								address: obj['ADDR'],
                            },
                                    
                        },
                        
                        {
                            hintLayout: PlacemarkHintLayout,
                            
                            // Опции.
                            iconLayout: 'default#imageWithContent',
                            iconImageHref: 'http://kubankredit.ru/upload/images/pin.png',	// Путь к изображению метки
                            iconImageSize: [31, 46],            // Размер
                            iconImageOffset: [-15, -46],        // Смещение
                        }
                    ));
                }
                
                // Шаблон хинта метки кластера
                let ClustererHintLayout = ymaps.templateLayoutFactory.createClass(
					'<div class="balloon-wrap"' + 
						'<div class="balloon-inner-wrap">' +
						
							'[if properties.geoObjects.0] ' + 
								'<div class="balloon-header">$[properties.geoObjects.0.properties.bContent.name]</div>' +
								'<div class="balloon-address">$[properties.geoObjects.0.properties.bContent.address]</div>' + 
							'[endif]' + 
							
							'[if properties.geoObjects.1] ' + 
								'<div class="balloon-header">$[properties.geoObjects.1.properties.bContent.name]</div>' +
								'<div class="balloon-address">$[properties.geoObjects.1.properties.bContent.address]</div>' + 
							'[endif]' + 

							'[if properties.geoObjects.2] ' + 
								'<div class="balloon-header">$[properties.geoObjects.2.properties.bContent.name]</div>' +
								'<div class="balloon-address">$[properties.geoObjects.2.properties.bContent.address]</div>' + 
							'[endif]' + 							
							
							'[if properties.geoObjects.3] <div style="text-align: center; font-weight: bold;" >...</div> [endif]' + 
							
						'</div>' + 
					'</div>'					
                );               
               
                // Кластеризатор
                let clusterer = new ymaps.Clusterer({
                    // Задаем собственный шаблон кластера
                    clusterIconLayout: ymaps.templateLayoutFactory.createClass(
                        '<div class="cluster_icon"><p>{{ properties.geoObjects.length }}</p></div>'
                    ),
                    
                    hintLayout: ClustererHintLayout,

                    // Геометрия кластера
                    clusterIconShape: {
                        // Прямоугольник
                        //type: 'Rectangle',
                        //coordinates: [[0, 0], [50, 50]]
                        
                        // Круг
                        type: 'Circle',
                        coordinates: [25, 25],
                        radius: 25,
                    }
                });
                
                // Добавляем массив меток в кластеризатор
                clusterer.add(placemarks);

                // Добавляем кластеризатор на карту
                this.mapObject.geoObjects.add(clusterer);
            },
        },
        
        watch: {
            // Слежение за обновлением выбранного города с целью выполнения необходимых действий над картой
            cityId: function(value) {
                let city = this.cities.find(x => x.id == value);
                
                // Если город найден и заданы его координаты
                if (city) {
                    if (city.coord) {
                        if (city.coord[0] && city.coord[1]) {
                            // Перемещаем центр карты на координаты города
                            this.mapObject.setCenter([city.coord[0], city.coord[1]], 13, { duration: 100, flying: true });
                        }
                    }
                }
            },
            
            // Слежение за обновлением списка выбранных услуг с целью выполнения необходимых действий над картой
            selectedServices: function(value) {
                // Отрисовка объектов, соответствующих фильтру
                this.renderFilteredObjects();
            },            
        },
        
        created() {
            let _this = this;

            // Инициализация карты
            ymaps.ready(function() {
	        _this.mapObject = new ymaps.Map("ymap", {
	            center: [45.0448400, 38.9760300],
	            zoom: 12,
	            controls: []
	        }, {avoidFractionalZoom: true});

	        _this.mapObject.events.add('boundschange', _this.renderFilteredObjects());
	    });
        }
    }
</script>

<style>
    #ymap {
        height: 700px;
        width: 100%;
    }
    
    .balloon-wrap {
		
        width: 300px;
        /*height: 100px;
        background: red;*/
    }
    
    .cluster_icon {
        height: 50px; 
        width: 50px; 
        position: relative; 
        background: url(http://kubankredit.ru/upload/images/pin50.png)
    }
    
    .cluster_icon p {
        margin: 0; 
        font-weight: bold; 
        position: absolute; 
        top: 50%; 
        left: 50%; 
        margin-right: -50%; 
        transform: translate(-50%, -50%);
    }
</style>