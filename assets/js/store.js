import Vuex from 'vuex'
import * as MUTATION from './misc/mutation-types.js'        // ���� �������

// Vuex-���������
let storeInstance = null

// ����������� ���� ����������� �������� ������������
export const ALLOWED_VIEW_TYPES = {
    "map": "�� �����", 
    "table": "��������"
};

export default () => {
    if (!storeInstance) 
        storeInstance = new Vuex.Store({
            state: {
                // ������ �� �������� ������������
                filter: {
                    selectedServices: [],   // ��������� ������ - ������ ID ([ 102, 105, ..., 500, ... ])
                    cityId: "991",          // ��������� ���������� ����� (��� ID)
                },
                
                // ��� ����������� �������� ������������, ��������������� �������
                viewType: "map",
            },

            mutations: {
                // ����� ������
                [MUTATION.SELECT_CITY] (state, newId) {
                    state.filter.cityId = newId;
                },

                // ����� �����
                [MUTATION.SELECT_SERVICES] (state, newServices) {
                    state.filter.selectedServices = newServices;
                },

                // ����� ���� ����������� �������� ������������
                [MUTATION.SELECT_VIEW_TYPE] (state, viewType) {
                    // ���� ��� ����������� ���� � ������ �����������
                    if (Object.keys(ALLOWED_VIEW_TYPES).indexOf(viewType) != -1) {
                        // ������ ��� ���������
                        state.viewType = viewType;
                    // ���� ���� ����������� ��� � ������ �����������
                    } else {
                       // ������ ��������� ��� - "�����"
                       state.viewType = "map";
                    }
                },
            },
        });


    return storeInstance
}