<template>
  <span class="caption font-weight-medium" v-text="time"></span>
</template>

<script>
export default {
  name: 'CurrentTime',
  data() {
    return {
      interval: null,
      time: null,
    };
  },
  methods: {
    updateTime() {
      this.time = new Date().toLocaleString(this.$i18n.locale);
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      this.updateTime();
    }, 1000);
    this.updateTime();
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>
