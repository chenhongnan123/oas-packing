<template>
  <v-dialog
    attach
    persistent
    scrollable
    v-model="dialog"
    max-width="800px"
  >
    <v-card>
      <v-card-title primary-title>
        <span v-text="$t('history.title')"></span>
        <v-spacer></v-spacer>
        <v-icon
          @click="setHistoryDialog(false)"
          v-text="'$vuetify.icons.close'"
        ></v-icon>
      </v-card-title>
      <v-card-text>
        <history-table></history-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import HistoryTable from '@/components/table/HistoryTable.vue';

export default {
  name: 'AppHistory',
  components: {
    HistoryTable,
  },
  computed: {
    ...mapState({
      historyDialog: state => state.helper.historyDialog,
    }),
    dialog: {
      get() {
        return this.firstUpdate || this.historyDialog;
      },
      set(val) {
        this.setHistoryDialog(val);
      },
    },
  },
  methods: {
    ...mapMutations({
      setHistoryDialog: 'helper/SET_HISTORY_DIALOG',
    }),
  },
};
</script>
