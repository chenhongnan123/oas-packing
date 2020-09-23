<template>
  <v-btn
    icon
    @click="setHistoryDialog(true),getBarcodes()"
  >
    <v-icon v-text="'$vuetify.icons.history'"></v-icon>
  </v-btn>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'HistoryButton',
  methods: {
    ...mapMutations({
      setHistoryDialog: 'helper/SET_HISTORY_DIALOG',
    }),
    ...mapActions({
      getBarcodes: 'packing/GET_PACKING_BARCODES',
    }),
  },
};
</script>
