<template>
  <v-icon
    small
    @click="toggleDarkMode"
    v-text="'$vuetify.icons.darkMode'"
  ></v-icon>
</template>

<script>
export default {
  name: 'DarkModeToggle',
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('darkMode', this.$vuetify.theme.dark);
    },
  },
};
</script>
