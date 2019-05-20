<template>
	<div style="height: auto;">
		<div style="position: relative;">
			<ViewTypeSelect :prefix="'list_'" />
			<div style="top: 90px; position: absolute;">
				<v-data-table :items="objects" :headers="headers" class="elevation-1" :search="search" :custom-filter="customFilter" rows-per-page-text="Точек на странице">
					<template slot="pageText" scope="{ pageStart, pageStop, itemsLength }">
							С {{ pageStart }} по {{ pageStop }} из {{ itemsLength }} точек обслуживания
					</template>	
					<template v-slot:items="objects">
						<td style="width: 250px;">
							{{ objects.item.NAME }}
						</td>
						<td class="justify-center px-0" style="width: 340px;">
							{{ objects.item.ADDRESS }}
						</td>
					</template>
					<template v-slot:no-data>
						<div class="mt-2">Список точек обслуживания пуст</div>
					</template>
					<template v-slot:no-results>
						<div class="mt-2">Не найдены элементы, соответствующие фильтру</div>
					</template>		
				</v-data-table>
			</div>
		</div>
	</div>	
</template>

<script>
	import ViewTypeSelect from "./ViewTypeSelect.vue"

    export default {
        name: "ListView",
        
        props: [
            "objects",      // Объекты обслуживания (приходят уже отфильтрованными)
            "cities",       // Города
        ],
		
		components: {
			ViewTypeSelect
		},
        
        data() {
            return {
				/*
                pageNum: 1,
                pageSize: 10,
				*/
				headers: [
					{
						text: 'Офис',
						align: 'left',
						value: 'NAME'
					},
					{
						text: 'Адрес',
						align: 'left',
						value: 'ADDRESS',
						//sortable: false,
					},
				],				
            }
        },        
        
        computed: {
            // Тип отображения объектов обслуживания
            viewType: {
                get() {
                    return this.$store.state.viewType;
                }
            },
            /*
            // Максимальное количество страниц
            maxPages: function() {
                if(this.objects) {
                    return Math.ceil(this.objects.length / this.pageSize);
                }
            },
            
            // Объекты обслуживания, расположенные на странице с номером pageNum
            pageItems: function() {
                if(!this.objects) 
                    return [];

                let sItem = (this.pageNum - 1) * this.pageSize;
                let eItem = sItem + this.pageSize;

                let result = this.objects.slice(sItem, eItem);

                return result;
            }
			*/
        }       
    }
</script>

<style scoped>
    
</style>