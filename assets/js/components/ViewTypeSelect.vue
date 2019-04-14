<template>
	<div style="
	    position: absolute;
		left: 10px;
		top: 10px;
		background: rgba(255, 255, 255, 0.5);
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
		
		<v-icon
			:style="{ cursor: 'pointer' }"
			color="blue darken-4"
			@click="viewType = false"
		>
			list
		</v-icon>
		
		<v-switch
			v-model="viewType"
			:style="{ display: 'inline-flex!important' }"
			color="blue darken-4"
		></v-switch>
		
		<v-icon
			:style="{ cursor: 'pointer' }"
			color="blue darken-4"
			@click="viewType = true"
		>
			map
		</v-icon>
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