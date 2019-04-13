<template>
<div class="uk-width-medium-1-2 uk-width-1-2">
	<div class="map-toolbar">
		<span v-for="vType in Object.keys(allowedViewTypes)">
			<input type="radio" :name="prefix + 'map-table'" :value="vType" v-model="viewType" :id="prefix + 'view_type_' + vType" />
			<label :for="prefix + 'view_type_' + vType" :class="vType + '-label'"><span>{{allowedViewTypes[vType]}}</span></label>
		</span>
	</div>
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
            viewType: {
                get() {
                    return this.$store.state.viewType;
                },
                
                set(value) {
                    this.$store.commit([MUTATION.SELECT_VIEW_TYPE], value);
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