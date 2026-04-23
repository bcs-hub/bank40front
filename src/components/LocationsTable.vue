<script>
export default {
  name: 'LocationsTable',
  props: {
    locations: {}
  }
}
</script>

<template>
  <table v-if="!locations.length==0" class="table table-hover">
    <thead>
    <tr>
      <th scope="col">Linn</th>
      <th scope="col">Asukoht</th>
      <th scope="col">Teenused</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="location in locations" :key="location.locationId">
      <td>{{ location.cityName }}</td>
      <td>{{ location.locationName }}</td>
      <td>
        <div
          v-for="transactionType in location.transactionTypes"
          :key="transactionType.transactionTypeName"
        >
          {{ transactionType.transactionTypeName }}
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>