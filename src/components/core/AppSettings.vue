<template>
  <v-dialog
    attach
    persistent
    v-model="dialog"
    max-width="400px"
  >
    <v-card>
      <v-card-title primary-title>
        <span v-text="$t('settings.title')"></span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          type="text"
          v-model="ip"
          id="serverIp"
          :label="$t('settings.form.serverIp')"
          prepend-icon="$vuetify.icons.server"
          :rules="[value =>
          !!value || $t('settings.form.serverIp') + $t('settings.form.required')]"
        ></v-text-field>
        <v-text-field
          type="text"
          v-model="cName"
          id="cName"
          :label="$t('settings.form.customerName')"
          prepend-icon="$vuetify.icons.customer"
          :rules="[value =>
          !!value || $t('settings.form.customerName') + $t('settings.form.required')]"
        ></v-text-field>
        <v-text-field
          type="text"
          v-model="cId"
          id="customerId"
          :label="$t('settings.form.customerId')"
          prepend-icon="$vuetify.icons.customer"
          :rules="[value =>
          !!value || $t('settings.form.customerId') + $t('settings.form.required')]"
        ></v-text-field>
        <v-text-field
          type="text"
          v-model="uId"
          id="userId"
          :label="$t('settings.form.userId')"
          prepend-icon="$vuetify.icons.userid"
          :rules="[value =>
          !!value || $t('settings.form.userId') + $t('settings.form.required')]"
        ></v-text-field>
        <v-text-field
          type="text"
          v-model="sName"
          id="stationName"
          :label="$t('settings.form.stationName')"
          prepend-icon="$vuetify.icons.station"
          :rules="[value =>
          !!value || $t('settings.form.stationName') + $t('settings.form.required')]"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          rounded
          color="rgb(53,68,147)"
          class="text-none"
          @click="update"
          v-text="$t('settings.actions.update')"
          :disabled="!(ip && cId && uId && cName && sName)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'AppSettings',
  created() {
    const flag = !this.areSettingsAvailable();
    this.setFirstUpdate(flag);
  },
  computed: {
    ...mapState({
      serverIp: state => state.helper.serverIp,
      customerId: state => state.helper.customerId,
      userId: state => state.helper.userId,
      customerName: state => state.helper.customerName,
      stationName: state => state.helper.stationName,
      settingsDialog: state => state.helper.settingsDialog,
      firstUpdate: state => state.helper.firstUpdate,
    }),
    ip: {
      get() {
        return this.serverIp;
      },
      set(val) {
        this.setServerIp(val);
      },
    },
    cId: {
      get() {
        return this.customerId;
      },
      set(val) {
        this.setCustomerId(val);
      },
    },
    uId: {
      get() {
        return this.userId;
      },
      set(val) {
        this.setUserId(val);
      },
    },
    cName: {
      get() {
        return this.customerName;
      },
      set(val) {
        this.setCustomerName(val);
      },
    },
    sName: {
      get() {
        return this.stationName;
      },
      set(val) {
        this.setStationName(val);
      },
    },
    dialog: {
      get() {
        return this.firstUpdate || this.settingsDialog;
      },
      set(val) {
        this.setSettingsDialog(val);
      },
    },
  },
  methods: {
    ...mapMutations({
      setServerIp: 'helper/SET_SERVER_IP',
      setCustomerId: 'helper/SET_CUSTOMER_ID',
      setUserId: 'helper/SET_USER_ID',
      setCustomerName: 'helper/SET_CUSTOMER_NAME',
      setStationName: 'helper/SET_STATION_NAME',
      setSettingsDialog: 'helper/SET_SETTINGS_DIALOG',
      setFirstUpdate: 'helper/SET_FIRST_UPDATE',
    }),
    update() {
      localStorage.setItem('serverIp', this.serverIp);
      localStorage.setItem('customerId', this.customerId);
      localStorage.setItem('userId', this.userId);
      localStorage.setItem('customerName', this.customerName);
      localStorage.setItem('stationName', this.stationName);
      this.setSettingsDialog(false);
      this.setFirstUpdate(false);
    },
    areSettingsAvailable() {
      const serverIp = localStorage.getItem('serverIp');
      const customerId = localStorage.getItem('customerId');
      const userId = localStorage.getItem('userId');
      const customerName = localStorage.getItem('customerName');
      const stationName = localStorage.getItem('stationName');
      return !!(serverIp && customerId && userId && customerName && stationName);
    },
  },
};
</script>
