<template>
  <v-data-table
    :headers="headers"
    :items="items"
    fixed-header
  >
    <template #header.basketnumber="{ header }">
      <span v-text="$t(header.text)"></span>
    </template>
    <template #header.partnumber="{ header }">
      <span v-text="$t(header.text)"></span>
    </template>
    <template #header.quantity="{ header }">
      <span v-text="$t(header.text)"></span>
    </template>
    <template #header.actions="{ header }">
      <span v-text="$t(header.text)"></span>
    </template>
    <template #item.barcode="{ item }">
      <app-barcode
        v-if="$vuetify.breakpoint.smAndUp"
        :value="item.barcode"
      ></app-barcode>
      <span
        v-else
        v-text="item.barcode"
      ></span>
    </template>
    <template #item.actions="{ item }">
      <v-icon
        color="success"
        @click="printItem(item)"
        v-text="'$vuetify.icons.print'"
      ></v-icon>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment';
import { mapState, mapMutations } from 'vuex';
import AppBarcode from '@/components/base/AppBarcode.vue';

export default {
  name: 'HistoryTable',
  components: {
    AppBarcode,
  },
  data() {
    return {
      headers: [
        {
          text: 'packing.table.barcode',
          value: 'basketnumber',
          width: '40%',
          sortable: false,
        },
        {
          text: 'packing.table.part',
          value: 'partnumber',
          width: '30%',
          sortable: false,
        },
        {
          text: 'packing.table.quantity',
          value: 'quantity',
          width: '15%',
          sortable: false,
        },
        {
          text: 'packing.table.actions',
          value: 'actions',
          width: '15%',
          sortable: false,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      items: state => state.packing.recentBarcodes,
      workNumber: state => state.helper.workNumber,
      employeeId: state => state.helper.employeeId,
    }),
  },
  methods: {
    ...mapMutations({
      printBarcode: 'packing/PRINT_BARCODE',
    }),
    async printItem(item) {
      const list = [
        { var_partnumber: item.partnumber },
        { var_qty: item.quantity },
        { var_date: item.productiondate },
        { var_packingdate: moment().format('YYYY-MM-DD') },
        { var_packedby: this.employeeId },
        { var_barcodedate: item.packagenumber },
        { var_barcodepartdate: `${item.partnumber} ${item.quantity}`},
      ];
      zebraprintconnect.printTemplateFile('zhaohua.prn', JSON.stringify(list), () => {
        console.log('success');
      }, () => {
        console.log('failed');
      });
    },
  },
};
</script>
