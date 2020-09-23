<template>
  <v-btn
    icon
    @click="setSettingsDialog(true)"
  >
    <v-icon v-text="'$vuetify.icons.settings'"></v-icon>
  </v-btn>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'SettingsButton',
  methods: {
    ...mapMutations({
      setSettingsDialog: 'helper/SET_SETTINGS_DIALOG',
    }),
  },
};
</script>
