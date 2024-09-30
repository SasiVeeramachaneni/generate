<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Provider Label</th>
            <th>PSM</th>
            <th>Name</th>
            <th>Health</th>
            <th>Application Description</th>
            <th>Live Subscribers</th>
            <th>Dev Completion %</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(app, index) in applications" :key="index">
            <td>{{ app.ProviderLabel }}</td>
            <td>{{ app.PSM }}</td>
            <td>{{ app.ApplicationName }}</td>
            <td>{{ app.ApplicationHealth }}</td>
            <td>{{ app.ApplicationDescription }}</td>
            <td>{{ app.NoOfLiveSubscribers }}</td>
            <td>{{ app.DevCompletionPercentage }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ApplicationTable',
    props: {
      applications: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8px; /* Reduced font size */
    padding-top: 10px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 2px;
    font-size: small;
  }
  
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  </style>
  