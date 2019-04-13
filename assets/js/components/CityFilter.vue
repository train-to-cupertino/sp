<template>
	<div class="select_box uk-display-inline-block">
		<label class="uk-form-label" for="city_choose">Населенный пункт</label>
		<div class="uk-form-controls">
			<select id="citySelect" v-model="city" @change="cityChanged" class="select_default city_choose">
				<option v-for="city in citiesList" :value="city.id">{{city.name}}</option>
			</select>
		</div>
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
		
		/*
		mounted() {
			let _this = this;
			$('.city_choose').change(function() {
				_this.cityChanged($(this).val());
			});			
			
			$('.city_choose').niceSelect(); // !!!
		},

		updated() {
			$('.city_choose').niceSelect('update'); // !!!
		},

		created() {
			$('.city_choose').niceSelect(); // !!!
		},
		*/		
    }
</script>

<style scoped>
    
</style>