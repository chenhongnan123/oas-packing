<template>
  <v-dialog
    persistent
    v-model="dialog"
    max-width="400px"
  >
    <v-card>
      <v-card-title primary-title>
        <span v-text="$t('worknumber.title')"></span>
        <settings-button></settings-button>
      </v-card-title>
      <v-card-text>
        <v-text-field
          ref="workNumber"
          @input="handleWorkNumberInput"
          @keyup.enter="update"
          autofocus
          type="password"
          v-model="wn"
          id="workNumber"
          :label="$t('worknumber.workNumber')"
          prepend-icon="$vuetify.icons.card"
          :rules="[value =>
          !!value || $t('worknumber.workNumber') + ' ' + $t('settings.form.required')]"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          rounded
          color="rgb(53,68,147)"
          class="text-none"
          @click="update"
          :loading="isLoading"
          :disabled="!workNumber"
        >{{$t('worknumber.login')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import SettingsButton from '@/components/header/SettingsButton.vue';

export default {
  name: 'AppPartnumber',
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    SettingsButton,
  },
  computed: {
    ...mapState({
      worknumberDialog: state => state.helper.worknumberDialog,
      workNumber: state => state.helper.workNumber,
      employeeList: state => state.helper.employeeList,
    }),
    dialog: {
      get() {
        return this.worknumberDialog;
      },
      set(val) {
        this.setWorknumberDialog(val);
      },
    },
    wn: {
      get() {
        return this.workNumber
      },
      set(val) {
        this.setWorkNumber(val);
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.$refs.workNumber.focus();
    },100);
  },
  methods: {
    ...mapActions({
      // recordWorkNumber: 'helper/RECORD_WORK_NUMBER',
      getEmployeeList: 'helper/GET_EMPLOYEELIST',
    }),
    ...mapMutations({
      setWorknumberDialog: 'helper/SET_WORKNUMBER_DIALOG',
      setWorkNumber: 'helper/SET_WORK_NUMBER',
      setWorkName: 'helper/SET_WORK_NAME',
      setEmployeeId: 'helper/SET_EMPLOYEEID',
    }),
    handleWorkNumberInput() {
      if (document.querySelector('.v-card .v-messages__wrapper span')) {
        document.querySelector('.v-card .v-messages__wrapper span').innerText = ''
      }
    },
    async update() {
      this.isLoading = true;
      const employeeList = await this.getEmployeeList();
      const workNameArr = employeeList.filter(i => i.cardnumber === this.workNumber);
      if (workNameArr.length > 0) {
        this.setEmployeeId(workNameArr[0].employeeid);
        this.setWorkName(workNameArr[0].employeename);
        this.setWorknumberDialog(false);
        document.querySelector('#barcode').focus();
        // this.recordWorkNumber();
      } else {
        document.querySelector('.v-card .v-messages__wrapper').innerHTML = `<span style="color:red">${this.$t('worknumber.ErrorWorkNumber')}</span>`;
      }
      this.isLoading = false;
    },
  },
};
</script>
