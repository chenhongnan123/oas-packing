<template>
  <v-footer
    app
    dark
    padless
    height="28"
    :class="!isConnected ? 'error' : ''"
  >
    <v-row no-gutters>
      <v-col cols="2" class="text-start">
        <is-connected class="ml-4"></is-connected>
      </v-col>
      <v-col cols="10" class="text-end">
        <current-time class="mr-4"></current-time>
        <dark-mode-toggle class="mr-2"></dark-mode-toggle>
        <language-menu></language-menu>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex';
import IsConnected from '@/components/IsConnected.vue';
import LanguageMenu from '@/components/menu/LanguageMenu.vue';
import CurrentTime from '@/components/CurrentTime.vue';
import DarkModeToggle from '@/components/DarkModeToggle.vue';

export default {
  name: 'AppFooter',
  components: {
    IsConnected,
    LanguageMenu,
    CurrentTime,
    DarkModeToggle,
  },
  computed: {
    ...mapState({
      isConnected: state => state.helper.isConnected,
    }),
  },
};
</script>
