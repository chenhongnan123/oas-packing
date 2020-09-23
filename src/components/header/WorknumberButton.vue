<template>
  <span class="work-number" @click="isShowLogout = !isShowLogout">
    <v-btn
    icon
    >
      <v-icon v-text="'$vuetify.icons.card'"></v-icon>
      <span style="line-height:48px;">&nbsp;{{workName}}</span>
    </v-btn>
    <div
      v-if="isShowLogout"
      class="logout-button"
    >
      <v-btn
        @click="handleLogout"
      >
      {{$t("worknumber.logout")}}
      </v-btn>
    </div>
  </span>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';

export default {
  name: 'WorknumberButton',
  data() {
    return {
      isShowLogout: false,
    };
  },
  methods: {
    ...mapMutations({
      setWorknumberDialog: 'helper/SET_WORKNUMBER_DIALOG',
      setWorkNumber: 'helper/SET_WORK_NUMBER',
      setWorkName: 'helper/SET_WORK_NAME',
      addItem: 'basket/ADD_ITEMS',
    }),
    handleLogout() {
      this.setWorkNumber('');
      this.setWorkName('');
      this.addItem([]);
      this.setWorknumberDialog(true);
    },
  },
  computed: {
    ...mapState({
      workName: state => state.helper.workName,
    }),
  },
};
</script>
<style scoped>
.work-number{
  display: inline-block;
  position: relative;
  margin: 0 20px;
}
.logout-button{
  position: absolute;
  right: 0;
}
</style>
