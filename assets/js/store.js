import Vuex from 'vuex'
import * as MUTATION from './misc/mutation-types.js'        // Типы мутаций

// Vuex-хранилище
let storeInstance = null

// Разрешенные типы отображения объектов обслуживания
export const ALLOWED_VIEW_TYPES = {
    "map": "на карте", 
    "table": "таблицей"
};

export default () => {
    if (!storeInstance) 
        storeInstance = new Vuex.Store({
            state: {
                // Фильтр по объектам обслуживания
                filter: {
                    selectedServices: [],   // Выбранные услуги - массив ID ([ 102, 105, ..., 500, ... ])
                    cityId: "991",          // Выбранный населенный пункт (его ID)
                },
                
                // Тип отображения объектов обслуживания, соответствующих фильтру
                viewType: "map",
            },

            mutations: {
                // Выбор города
                [MUTATION.SELECT_CITY] (state, newId) {
                    state.filter.cityId = newId;
                },

                // Выбор услуг
                [MUTATION.SELECT_SERVICES] (state, newServices) {
                    state.filter.selectedServices = newServices;
                },

                // Выбор типа отображения объектов обслуживания
                [MUTATION.SELECT_VIEW_TYPE] (state, viewType) {
                    // Если тип отображения есть в списке разрешенных
                    if (Object.keys(ALLOWED_VIEW_TYPES).indexOf(viewType) != -1) {
                        // Делаем его выбранным
                        state.viewType = viewType;
                    // Если типа отображения нет в списке разрешенных
                    } else {
                       // Задаем выбранный тип - "Карта"
                       state.viewType = "map";
                    }
                },
            },
        });


    return storeInstance
}