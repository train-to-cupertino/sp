<template>
    <div>
        <MapView 
            v-show="viewType == 'map'" 
            :objects="filteredObjects" 
            :cities="lists.cities" 
        />
        <ListView 
            v-show="viewType == 'table'" 
            :objects="filteredObjects" 
            :cities="lists.cities" 
        />
    </div>
</template>

<script>
    import MapView from "./MapView.vue"
    import ListView from "./ListView.vue"
    
    export default {
        name: "ObjectsView",
        
        props: [
            "lists",    // Списки данных
        ],
        
        components: {
            MapView,
            ListView
        },
        
        computed: {
            // Тип отображения объектов обслуживания
            viewType: {
                get() {
                    return this.$store.state.viewType;
                }
            },
            
            filteredObjects: {
                get() {
                    let _this = this;
                    // Все объекты обслуживания
                    let objects = this.lists.objects;
                    
                    // Количество выбранных услуг
                    let selectedServicesCount = this.getSelectedServicesCount();

                    // Если не выбрана ни одна услуга, 
                    // то отображать все объекты обслуживания (фильтр не используется)
                    if (selectedServicesCount == 0) {
                        return objects;
                    }
                    
                    // Объекты обслуживания, соответствующие фильтру
                    let _filteredObjects = objects.filter(x => _this.checkObject(x));
                    
                    return _filteredObjects;
                }
            },
        },
        
        methods: {
            // Возвращает количество выбранных услуг
            getSelectedServicesCount: function() {
                // Выбранные услуги
                let selectedServices = this.$store.state.filter.selectedServices;
                
                return selectedServices.length;
            },
            
            
            // Выполняет проверу объекта обслуживания на соответствие фильтру
            checkObject: function(obj) {
                // Выбранные услуги
                let selectedServices = this.$store.state.filter.selectedServices;
                
                // Услуги, предоставляемые объектом обслуживания
                let objectServices = [];

                if (obj.TIMETABLE && obj.TIMETABLE.length) {
                    for(let servicesGroup of obj.TIMETABLE) {
                        if (servicesGroup.srvc && servicesGroup.srvc.length) {
                            for(let service of servicesGroup.srvc) {
                                objectServices.push(Number(service));
                            }
                        }
                    }
                }
                
                
                // Если выбрана услуга "Терминал" и объект предоставляет услугу "Терминал",
                // то объект отображается в любом случае
                if (selectedServices.indexOf(108) != -1 && objectServices.indexOf(108) != -1)
                    return true;
                
                // Если выбрана услуга "Банкомат" и объект предоставляет услугу "Банкомат",
                // то объект отображается в любом случае
                if (selectedServices.indexOf(109) != -1 && objectServices.indexOf(109) != -1)
                    return true;
                
                
                // Предоставляет ли объект обслуживания все выбранные услуги
                for(let selectedServiceId of selectedServices) {
					
                    // Если услуга - "Банкомат" или "Терминал", то не учитываем их в фильтре
                    if (selectedServiceId == 108 || selectedServiceId == 109)
                        continue;
                    
                    // Если услуга выбрана пользователем,
                    if (selectedServices.indexOf(selectedServiceId) != -1) {
                        // но объект ее не предоставляет,
                        if (objectServices.indexOf(selectedServiceId) == -1)
                            // тогда объект не отображается на карте
                            return false;
                    }
                }
                
                
                return true;
            },            
        }
    }
</script>

<style scoped>
    
</style>