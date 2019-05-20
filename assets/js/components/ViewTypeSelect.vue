<template>
	<div style="
	    position: absolute;
		left: 10px;
		top: 10px;
		background: rgba(255, 255, 255, 0.7);
		z-index: 1;
		width: 160px;
		height: 68px;
		border-radius: 34px;
	">
		<!--
		<span v-for="vType in Object.keys(allowedViewTypes)">
			<input type="radio" :value="vType" v-model="viewType" :id="prefix + 'view_type_' + vType" />
			<label :for="prefix + 'view_type_' + vType" :class="vType + '-label'"><span>{{allowedViewTypes[vType]}}</span></label>
		</span>
		-->
		
		<v-tooltip bottom>
			<template v-slot:activator="{ on }">
				<v-icon
					:style="{ cursor: 'pointer' }"
					color="red darken-4"
					@click="viewType = false"
					v-on="on"
				>
					list
				</v-icon>
			</template>
			<span>Список</span>
		</v-tooltip>		

		
		<v-switch
			v-model="viewType"
			:style="{ display: 'inline-flex!important' }"
			color="red darken-4"
		></v-switch>
		
		<v-tooltip bottom>
			<template v-slot:activator="{ on }">
				<v-icon
					:style="{ cursor: 'pointer' }"
					color="red darken-4"
					@click="viewType = true"
					v-on="on"
				>
					map
				</v-icon>
			</template>
			<span>Карта</span>
		</v-tooltip>		
	</div>
</template>

<script>
	import * as MUTATION from './../misc/mutation-types.js'     // Типы мутаций
    import { ALLOWED_VIEW_TYPES } from "./../store.js"			// Допустимые типы отображения объектов обслуживания

    export default {
        name: "ViewTypeSelect",
		
		props: [
			"prefix",	// Префикс ID radio button'ов для исипользования данного компонента в нескольких местах страницы одновременно
		],
        
        computed: {
            // Тип отображения объектов, соответствующих фильтру
			/*
            viewType: {
                get() {
					
                    return this.$store.state.viewType;
                },
                
                set(value) {
                    this.$store.commit([MUTATION.SELECT_VIEW_TYPE], value);
                }
            },
			*/
			
            viewType: {
                get() {
                    return (this.$store.state.viewType == 'map');
                },
                
                set(value) {
                    this.$store.commit([MUTATION.SELECT_VIEW_TYPE], value ? 'map' : 'table');
                }
            },
			
            // Допустимые типы отображения отфильтрованных объектов обслуживания
            allowedViewTypes: function() {
                return ALLOWED_VIEW_TYPES;
            }
        },
    }
</script>

<style>

</style>