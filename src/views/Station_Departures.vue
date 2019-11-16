<template>
  <div class="station">
    <h1>This is the station departures page</h1>
    <Departures/>
  </div>
</template>

<script>
// @ is an alias to /src
import Departures from "@/components/Station.vue";

export default {
  name: "station_departures",
  components: {
    Departures
  },
  methods: {
    handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
  }
};
</script>
