<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue'
import { getLeads } from '../services/leadService';

interface lead {
    key: number,
    name: string,
    price: string,
    status: string,
    responsible_user: string,
    created_at: string,
    contacts: Array<Object>
}

const leads: Ref<Array<lead>> = ref([]);
const isLoading: Ref<boolean> = ref(false)

onMounted(async () => {
    isLoading.value = true
    leads.value = await getLeads();
    isLoading.value = false
})

const columns: Array<{ title: string, dataIndex: string, key: string }> = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Бюджет',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Ответственный',
        dataIndex: 'responsible_user',
        key: 'responsible_user',
    },
    {
        title: 'Дата создания',
        dataIndex: 'created_at',
        key: 'created_at',
    },
]

const search = async (event: Event): Promise<void> => {
    isLoading.value = true
    leads.value = await getLeads((event.target as HTMLInputElement).value);
    isLoading.value = false
}

</script>

<template>
    <section>
        <div class="relative w-[80%] mx-auto px-4 py-3 my-6 rounded-md bg-white">
            <div class="pb-3 flex justify-between border-b">
                <h1 class="text-lg font-semibold">Сделки amoCRM</h1>
                <a-input-search placeholder="Найти..." @input="search" style="width: 200px" />
            </div>
            <a-table :dataSource="leads" :columns="columns">

                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'status'">

                        <span v-if="record.status == 'Принимают решение'"
                            class="py-1 px-2 text-xs text-gray-600 rounded-md bg-[#ffcc66]">
                            {{ record.status }}
                        </span>

                        <span v-if="record.status == 'Переговоры'"
                            class="py-1 px-2 text-xs text-gray-600 rounded-md bg-[#ffff99]">
                            {{ record.status }}
                        </span>

                        <span v-if="record.status == 'Закрыто и не реализовано'"
                            class="py-1 px-2 text-xs text-gray-600 rounded-md bg-[#666666]">
                            {{ record.status }}
                        </span>

                        <span v-if="record.status == 'Согласование договора'"
                            class="py-1 px-2 text-xs text-gray-600 rounded-md bg-[#ffcccc]">
                            {{ record.status }}
                        </span>

                        <span v-if="record.status == 'Первичный контакт'"
                            class="py-1 px-2 text-xs text-gray-600 rounded-md bg-[#99ccff]">
                            {{ record.status }}
                        </span>

                        <span v-if="record.status == 'Успешно реализовано'"
                            class="py-1 px-2 text-xs text-gray-600 rounded-md bg-[#CCFF66]">
                            {{ record.status }}
                        </span>

                    </template>
                </template>

                <template #expandedRowRender="{ record }">
                    <div v-for="contact in record.contacts" class="flex items-center font-[500] gap-3 py-3">

                        <div class="flex gap-1 items-center">
                            <svg focusable="false" class="" data-icon="user" width="1em" height="1em"
                                fill="currentColor" aria-hidden="true" viewBox="64 64 896 896">
                                <path
                                    d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z">
                                </path>
                            </svg>

                            <span>{{ contact.name }}</span>
                        </div>

                        <a :href="`tel:${contact.custom_fields_values[0].values[0].value}`" class="pr-3 border-r ">
                            <svg focusable="false" class="" data-icon="phone" width="1em" height="1em"
                                fill="currentColor" aria-hidden="true" viewBox="64 64 896 896">
                                <path
                                    d="M877.1 238.7L770.6 132.3c-13-13-30.4-20.3-48.8-20.3s-35.8 7.2-48.8 20.3L558.3 246.8c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l89.6 89.7a405.46 405.46 0 01-86.4 127.3c-36.7 36.9-79.6 66-127.2 86.6l-89.6-89.7c-13-13-30.4-20.3-48.8-20.3a68.2 68.2 0 00-48.8 20.3L132.3 673c-13 13-20.3 30.5-20.3 48.9 0 18.5 7.2 35.8 20.3 48.9l106.4 106.4c22.2 22.2 52.8 34.9 84.2 34.9 6.5 0 12.8-.5 19.2-1.6 132.4-21.8 263.8-92.3 369.9-198.3C818 606 888.4 474.6 910.4 342.1c6.3-37.6-6.3-76.3-33.3-103.4zm-37.6 91.5c-19.5 117.9-82.9 235.5-178.4 331s-213 158.9-330.9 178.4c-14.8 2.5-30-2.5-40.8-13.2L184.9 721.9 295.7 611l119.8 120 .9.9 21.6-8a481.29 481.29 0 00285.7-285.8l8-21.6-120.8-120.7 110.8-110.9 104.5 104.5c10.8 10.8 15.8 26 13.3 40.8z">
                                </path>
                            </svg>
                        </a>

                        <a :href="`mailto:${contact.custom_fields_values[1].values[0].value}`">
                            <svg focusable="false" class="" data-icon="mail" width="1em" height="1em"
                                fill="currentColor" aria-hidden="true" viewBox="64 64 896 896">
                                <path
                                    d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0068.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z">
                                </path>
                            </svg>
                        </a>
                    </div>
                </template>
            </a-table>

            <div v-if="isLoading"
                class="absolute left-0 top-0 w-full h-full flex justify-center items-center bg-[#ffffffc4]">
                <a-spin />
            </div>

        </div>
    </section>
</template>

<style scoped>
h5 {
    background-color: rgb(213, 216, 219);
    color: #666666;
}
</style>: () => void: number | undefined
