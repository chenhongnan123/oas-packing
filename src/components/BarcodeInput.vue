<template>
  <v-text-field
    rounded
    outlined
    autofocus
    type="text"
    ref="barcodeInput"
    v-model="barcode"
    id="barcode"
    :error-messages="error"
    @keyup.enter="submitScan"
    @click:append="submitScan"
    :label="$t('basket.input')"
    append-icon="$vuetify.icons.scan"
  ></v-text-field>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'BarcodeInput',
  props: {
    setFocus: {
      type: Boolean,
    },
  },
  watch: {
    setFocus(val) {
      if (val) {
        this.$refs.barcodeInput.focus();
      }
    },
  },
  data() {
    return {
      barcode: null,
    };
  },
  computed: {
    ...mapState({
      items: state => state.basket.items,
      error: state => state.basket.error,
    }),
  },
  methods: {
    ...mapMutations({
      setError: 'basket/SET_ERROR',
    }),
    ...mapActions({
      confirmBasket: 'basket/CONFIRM_BASKET',
    }),
    async submitScan() {
      if (this.barcode) {
        const existingBarcode = this.items.find(item => item.barcode === this.barcode);
        if (!existingBarcode) {
          this.setError(null);
          await this.confirmBasket(this.barcode);
        } else {
          this.setError(this.$i18n.t('basket.errors.duplicateInput', { barcode: this.barcode }));
        }
        this.barcode = null;
      } else {
        this.setError(this.$i18n.t('basket.errors.emptyInput'));
      }
    },
  },
};
</script>
