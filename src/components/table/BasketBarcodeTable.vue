<template>
  <v-data-table
    :headers="headers"
    :items="items"
    fixed-header
    height="calc(100vh - 262px)"
    hide-default-footer
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
    <template #header.quantityActual="{ header }">
      <span v-text="$t(header.text)"></span>
    </template>
    <template #header.actions="{ header }">
      <span v-text="$t(header.text)"></span>
    </template>
    <template #item.barcode="{ item }">
      <!-- <app-barcode
        v-if="$vuetify.breakpoint.smAndUp"
        :value="item.barcode"
      ></app-barcode> -->
      <span
        v-text="item.barcode"
      ></span>
    </template>
    <template #item.partnumber="{ item }">
      <span v-text="item.partnumber"></span>
    </template>
    <template #item.quantityActual="{ item }">
      <v-edit-dialog :return-value.sync="item.quantityActual" persistent>
        <v-icon
          small
          color="rgb(53,68,147)"
        >
          mdi-pencil
        </v-icon>
        {{ item.quantityActual }}
        <template #input>
          <v-text-field
            single-line
            type="number"
            v-model="item.quantityActual"
          ></v-text-field>
        </template>
      </v-edit-dialog>
    </template>
    <template #item.actions="{ item }">
      <v-icon
        color="error"
        @click="deleteItem(item)"
        v-text="'$vuetify.icons.delete'"
      ></v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
// import AppBarcode from '@/components/base/AppBarcode.vue';

export default {
  name: 'BasketBarcodeTable',
  components: {
    // AppBarcode,
  },
  data() {
    return {
      headers: [
        {
          text: 'basket.table.barcode',
          value: 'basketnumber',
          width: '40%',
          sortable: false,
          align: 'left'
        },
        {
          text: 'basket.table.partNumber',
          value: 'partnumber',
          width: '30%',
          sortable: false,
          align: 'left'
        },
        {
          text: 'basket.table.quantity',
          value: 'quantity',
          width: '15%',
          sortable: false,
          align: 'left'
        },
        {
          text: 'basket.table.quantityactual',
          value: 'quantityActual',
          width: '15%',
          sortable: false,
          align: 'left'
        },
        // {
        //   text: 'basket.table.actions',
        //   value: 'actions',
        //   width: '15%',
        //   sortable: false,
        // },
      ],
    };
  },
  computed: {
    ...mapState({
      items: state => state.basket.items,
    }),
  },
  methods: {
    ...mapMutations({
      removeItem: 'basket/REMOVE_ITEM',
    }),
    async deleteItem(item) {
      if (await this.$root.$confirm.open(
        'basket.confirmDelete.title',
        'basket.confirmDelete.message',
        { barcode: item.basketbarcode },
      )) {
        const index = this.items.indexOf(item);
        this.removeItem(index);
      }
    },
    saveQuantity(item) {
      console.log(item, 'item');
    },
  },
};
</script>
