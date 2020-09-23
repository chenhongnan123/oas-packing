import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify, {
  VApp,
  VContainer,
  VRow,
  VCol,
  VAppBar,
  VFooter,
  VToolbarTitle,
  VSpacer,
  VBtn,
  VIcon,
  VContent,
  VTextField,
  VDataTable,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VDialog,
  VEditDialog,
  VMenu,
  VList,
  VListItemGroup,
  VListItem,
  VListItemContent,
  VListItemTitle,
} from 'vuetify/lib';
import i18n from './i18n';

Vue.use(Vuetify, {
  components: {
    VApp,
    VContainer,
    VRow,
    VAppBar,
    VFooter,
    VToolbarTitle,
    VSpacer,
    VBtn,
    VIcon,
    VContent,
    VCol,
    VTextField,
    VDataTable,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VDialog,
    VEditDialog,
    VMenu,
    VList,
    VListItemGroup,
    VListItem,
    VListItemContent,
    VListItemTitle,
  },
});

export default new Vuetify({
  rtl: false,
  theme: {
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#354493',
        secondary: '#21C77C',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: '#21C77C',
        secondary: '#354493',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
    values: {
      history: 'mdi-history',
      translate: 'mdi-translate',
      settings: 'mdi-cog-outline',
      server: 'mdi-web',
      customer: 'mdi-face',
      scan: 'mdi-barcode-scan',
      show: 'mdi-eye',
      hide: 'mdi-eye-off',
      close: 'mdi-close',
      password: 'mdi-lock-outline',
      username: 'mdi-account-details',
      account: 'mdi-account-circle-outline',
      delete: 'mdi-close-circle-outline',
      darkMode: 'mdi-invert-colors',
      connected: 'mdi-cloud-outline',
      disconnected: 'mdi-cloud-off-outline',
      print: 'mdi-printer',
      card: 'mdi-card-account-details-outline',
      station: 'mdi-desktop-classic',
      userid: 'mdi-onepassword',
    },
  },
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
});
