<template>
  <barcode
    :value="value"
    :options="{ height: 35 }"
  ></barcode>
</template>

<script>
export default {
  name: 'AppBarcode',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
