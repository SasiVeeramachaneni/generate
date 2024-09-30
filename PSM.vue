
<template>
  <div class="psm-container">
    <div v-for="psm in psms" :key="psm.PSM" class="psm-card">
      <h6 class="psm-name">{{ psm.PSM }}</h6>
      <ul>
        <li v-for="provider in psm.Providers" :key="provider" class="provider-name">{{ provider }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      psms: [{"PSM":"Tim","Providers":["Aaseya","OneDoor"]},{"PSM":"Sasi","Providers":["AI4Process","OneDoor"]},{"PSM":"Pradeep","Providers":["OneDoor","OneDoor"]}]
    };
  }
};
</script>

<style scoped>
.psm-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  padding: 2px;
}

.psm-card {
  padding: 3px;
}

.psm-name {
  margin: 0 0 2px;
  border: 1.5px solid black;
  background-color: silver; /* Add grey background color */
  padding: 2px;
}

.provider-name {
  margin: 0px 0;
  border: 1px solid black;
  padding: 2px;
  font-size: 8px; /* Define the font size for provider names here */
}

.psm-card ul {
  list-style-type: none;
  padding: 0;
}
</style>

