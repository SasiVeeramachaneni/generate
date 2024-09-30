
<template>
    <div id="app">
        <ApplicationTable v-for="(item, index) in data" :key="index" :label="item.Label"
            :applications="item.Applications" />
    </div>
</template>

<script>
import ApplicationTable from '../ApplicationTable.vue';

export default {
    name: 'App',
    components: {
        ApplicationTable
    },
    data() {
        return {
            data: [
    {
        "Label": "Aaseya",
        "Applications": [
            {
                "Status": "Red",
                "Name": "Inspection",
                "ActionItems": "GFojfdi idf iudf iudfh iudfvhdiuf diufh"
            }
        ]
    },
    {
        "Label": "AI4Process",
        "Applications": [
            {
                "Status": "Red",
                "Name": "Booking application",
                "ActionItems": "GFojfdi idf iudf iudfh iudfvhdiuf diufh"
            },
            {
                "Status": "Green",
                "Name": "Learning management",
                "ActionItems": "test idf iudf iudfh iudfvhdiuf diufh"
            }
        ]
    }
]
        };
    }
};
</script>

<style>
/* Add any global styles here */
</style>
