
<template>
  <div>
    <h3>Application List</h3>
        <ApplicationTable :applications="applications" />   
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
            applications: [
    {
        "ProviderLabel": "Aaseya",
        "PSM": "Tim",
        "ApplicationName": "Inspection",
        "ApplicationHealth": "Green",
        "ApplicationDescription": "",
        "NoOfLiveSubscribers": 2,
        "DevCompletionPercentage": "10%"
    },
    {
        "ProviderLabel": "AI4Process",
        "PSM": "Sasi",
        "ApplicationName": "Inspection",
        "ApplicationHealth": "Green",
        "ApplicationDescription": "",
        "NoOfLiveSubscribers": 2,
        "DevCompletionPercentage": "10%"
    },
    {
        "ProviderLabel": "OneDoor",
        "PSM": "Sasi",
        "ApplicationName": "Inspection",
        "ApplicationHealth": "Green",
        "ApplicationDescription": "",
        "NoOfLiveSubscribers": 2,
        "DevCompletionPercentage": "10%"
    },
    {
        "ProviderLabel": "OneDoor",
        "PSM": "Pradeep",
        "ApplicationName": "Inspection",
        "ApplicationHealth": "Green",
        "ApplicationDescription": "",
        "NoOfLiveSubscribers": 2,
        "DevCompletionPercentage": "10%"
    }
]
        };
    }
};
</script>

<style>
 h3 {
    padding: 2px;
  }
</style>
