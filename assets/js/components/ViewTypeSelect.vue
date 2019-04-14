<template>
<div style="position: absolute; left: 40px; top: 40px; background: rgba(255,255,255,0.5); z-index: 1; border: 1px solid black;">
	<!--
	<span v-for="vType in Object.keys(allowedViewTypes)">
		<input type="radio" :value="vType" v-model="viewType" :id="prefix + 'view_type_' + vType" />
		<label :for="prefix + 'view_type_' + vType" :class="vType + '-label'"><span>{{allowedViewTypes[vType]}}</span></label>
	</span>
	-->
	<v-icon>
		list
	</v-icon>
	
	<v-switch
		v-model="viewType"
		:label=""
	></v-switch>
	
	<v-icon>
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