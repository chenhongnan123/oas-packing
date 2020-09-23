<template>
  <div>
    <v-icon
      small
      class="mr-2"
      v-text="isConnected
        ? '$vuetify.icons.connected'
        : '$vuetify.icons.disconnected'"
    ></v-icon>
    <span
      class="caption font-weight-medium"
      v-text="isConnected ? $t('connected') : $t('disconnected')"
    ></span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'IsConnected',
  computed: {
    ...mapState({
      isConnected: state => state.helper.isConnected,
    }),
  },
};
</script>
