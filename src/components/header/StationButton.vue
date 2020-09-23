<template>
  <span class="station-button">
    <v-btn
    icon
    >
      <v-icon v-text="'$vuetify.icons.station'"></v-icon>
      <span style="line-height:48px;">{{stationName}}</span>
    </v-btn>
  </span>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'StationButton',
  computed: {
    ...mapState({
      stationName: state => state.helper.stationName,
    }),
  },
};
</script>
<style scoped>
.station-button{
  display: inline-block;
  position: relative;
  margin: 0 20px;
}
.logout-button{
  position: absolute;
  right: 0;
}
</style>
