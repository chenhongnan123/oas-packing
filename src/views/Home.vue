<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <scan-barcode-card></scan-barcode-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ScanBarcodeCard from '@/components/ScanBarcodeCard.vue';

export default {
  name: 'Home',
  components: {
    ScanBarcodeCard,
  },
};
</script>
