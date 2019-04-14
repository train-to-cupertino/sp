<template>
	<div style="height: auto;">
		<div style="position: relative;">
			<ViewTypeSelect :prefix="'list_'" />
			<div class="table-map" style="display: block;" >
				<div>
					<table class="uk-table uk-table-hover">
						<tr class="not-hover table-header">
							<th>Офис</th>
							<th>Адрес</th>
						</tr>
						<tr v-for="object in pageItems" :key="object.ID" >
							<td class=""><span><a :href="object.DETAILURL" >{{object.NAME}}</a></span></td>
							<td class=""><span>{{object.ADDR}}</span></td>
						</tr>
					</table>
				</div>
				<div v-if="maxPages && maxPages > 1">
					<ul class="uk-pagination pagination-short">
						<li class=""><a @click="pageNum > 1 ? pageNum-- : pageNum" :class="[(pageNum < 2)?'icon-prev-disabled':'']" ><i class="icon icon-prev"></i></a></li>
						<li class="uk-active"><span>{{pageNum}}</span></li>
						<li class="divider"><span>/</span></li>
						<!--<li><a @click="pageNum=1; pageSize=100500" >{{maxPages}}</a></li>-->
						<li><a>{{maxPages}}</a></li>
						<li><a @click="pageNum < maxPages ? pageNum++ : pageNum" :class="[(pageNum == maxPages)?'icon-next-disabled':'']" ><i class="icon icon-next"></i></a></li>
					</ul>
				</div>
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
                pageNum: 1,
                pageSize: 10,
            }
        },        
        
        computed: {
            // Тип отображения объектов обслуживания
            viewType: {
                get() {
                    return this.$store.state.viewType;
                }
            },
            
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
        }       
    }
</script>

<style scoped>
    
</style>