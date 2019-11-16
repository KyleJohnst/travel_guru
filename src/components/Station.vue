<template>
  <div>
    <p>Station Outbound Trips viewer</p>
    <div>
      <div class="station_select">
        <label for="dep_station_code">Outbound Station</label>
        <input type="text" maxlength="3" v-model="dep_station_code" required/>
        <label for="date">Date</label>
        <input type="date" name="date" id="" v-model="date">
        <label for="time">Time</label>
        <input type="time" name="time" id="" v-model="time">
        <button v-on:click="getData">Get me trips!</button>
      </div>
      <div class="station_view">
        <div v-if="!fetched">
          No trips yet
        </div>
        <div v-if="loading">
            Getting departures...
        </div>
        <div v-if="failed">
            Please ensure you input a valid station code
        </div>
        <div v-if="fetched">
            <p>{{stationData.station_name}}</p>
            <p>{{stationData.station_code}}</p>
          <div v-for="(dep, key) in stationData.departures.all" :key="key" class="service_card">
            <p>{{dep.operator_name}}</p>
            <p>{{dep.destination_name}}</p>
            <p>{{dep.aimed_departure_time}}</p>
            <p v-if="dep.platform !== null">Platform: {{dep.platform}}</p>
            <p v-if="dep.platform === null">No platform assigned</p>
          </div>
          <div v-if="failed && stationData === {}">
              Error getting data
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiData from "../../apiData.json";

export default {
  data() {
    return {
        dep_station_code: "",
        time: "",
        date: "",
        stationData: {},
        fetched: false,
        loading: false,
        failed: false
    };
  },

  methods: {
    getData() {
        let depart = this.dep_station_code.toLowerCase();
        this.loading = true;
        console.log(apiData);
        
      fetch(
          "https://transportapi.com/v3/uk/train/station/"+ depart +"/"+ this.date +"/"+ this.time +"/timetable.json?app_id="+ apiData.app_id +"&app_key="+ apiData.app_key +"&train_status=passenger"
      )
        .then(this.handleErrors)
        .then(res => res.json())
        .then(res => (this.stationData = res, this.fetched = true, this.loading = false, this.failed = false))
        .catch(error => (console.log(error), this.failed = true, this.loading = false)); 
    },
    handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    },
  }
};
</script>
<style scoped>
.service_card {
  border: 1px black solid;
  margin-bottom: 15px;
}
</style>