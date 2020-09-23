<template>
  <v-card flat>
    <v-row no-gutters>
      <v-col cols="12">
        <barcode-input :setFocus="setFocus"></barcode-input>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <basket-barcode-table></basket-barcode-table>
      </v-col>
    </v-row>
    <v-card-actions class="ma-0 pa-0">
      <v-spacer></v-spacer>
      <!-- <v-btn
        text
        rounded
        class="text-none"
        @click="reset"
        :disabled="!enableButtons"
        v-text="$t('basket.actions.reset')"
      ></v-btn> -->
      <v-btn
        style="width:200px;height:55px;font-size:20px;"
        rounded
        color="rgb(53,68,147)"
        class="text-none"
        @click="printPackageBarcode"
        :loading="isLoading"
      >{{$t('basket.actions.print')}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment';
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
} from 'vuex';
import BarcodeInput from '@/components/BarcodeInput.vue';
import BasketBarcodeTable from '@/components/table/BasketBarcodeTable.vue';

export default {
  name: 'ScanBarcodeCard',
  components: {
    BarcodeInput,
    BasketBarcodeTable,
  },
  data() {
    return {
      setFocus: null,
      count: localStorage.getItem("count") || 1,
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      items: state => state.basket.items,
      isConnected: state => state.helper.isConnected,
      workNumber: state => state.helper.workNumber,
      workName: state => state.helper.workName,
      stationName: state => state.helper.stationName,
      customerName: state => state.helper.customerName,
      employeeId: state => state.helper.employeeId,
    }),
    ...mapGetters({
      enableButtons: 'basket/enableButtons',
      enableAdd: 'basket/enableAdd',
    }),
  },
  methods: {
    ...mapMutations({
      removeItem: 'basket/REMOVE_ITEM',
      setItemsNull: 'basket/SET_ITEMS_NULL',
      setError: 'basket/SET_ERROR',
    }),
    ...mapActions({
      setPackingBarcode: 'packing/SET_PACKING_BARCODE',
    }),
    mounted() {
      setInterval(() => {
        const hour = new Date().getHours();
        const getMinutes = new Date().getMinutes();
        const second = new Date().getSeconds();
        if (hour === 0 && getMinutes === 0 && second === 0) {
          this.count = 1;
        }
      },1000);
    },
    async reset() {
      if (await this.$root.$confirm.open('basket.confirmReset.title', 'basket.confirmReset.message')) {
        this.setItemsNull([]);
        this.setError(null);
        this.setFocus = true;
      }
    },
    async printPackageBarcode() {
      this.isLoading = true;
      this.setError(null);
      const { items } = this;
      console.log(items);
      const payload = {
        packagenumber: moment().format('YYYYMMDD')+this.stationName+this.addZero(this.count,3),
        packingdate: moment().format('YYYY-MM-DD:hh:mm:ss'),
        partnumber: items[0].partnumber,
        quantity: items[0].quantityActual,
        basketnumber: items[0].basketnumber,
        workNumber: this.employeeId,
        packedby: this.workName,
        productiondate: items[0].basketdate,
        siteName: this.customerName,
        workorder: items[0].workorder,
      };
      const result = await this.setPackingBarcode(payload);
      if (result.data.id) {
        const barcodedate = moment().format('YYYYMMDD')+this.stationName+this.addZero(this.count,3);
        const list = [
          {"var_partnumber": items[0].partnumber},
          {"var_qty": items[0].quantityActual},
          {"var_date": items[0].basketdate},
          {"var_packingdate": moment().format('YYYY-MM-DD')},
          {"var_packedby": this.employeeId},
          {"var_barcodedate": barcodedate},
          {"var_barcodepartdate": `${items[0].partnumber} ${items[0].quantityActual}`}
        ];
        console.log(list, 'list');
        this.count++;
        localStorage.setItem('count',this.count);
        zebraprintconnect.printTemplateFile("zhaohua.prn", JSON.stringify(list),() => {
          console.log('success');
          // this.setItemsNull([]);
          // this.setFocus = true;
        }, function() {
            console.log('failed')
        });
      }
      this.isLoading = false;
    },
    addZero(num, n) {
      var len = num.toString().length;
      while(len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
  },
};
</script>
