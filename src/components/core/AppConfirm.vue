<template>
  <v-dialog
    attach
    v-model="dialog"
    max-width="400px"
    @keydown.esc="cancel"
  >
    <v-card>
      <v-card-title primary-title>
        <span v-text="$t(title)"></span>
      </v-card-title>
      <v-card-text>
        <span v-text="$t(message, args)"></span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          rounded
          class="text-none"
          @click.native="cancel"
          v-text="$t('confirm.cancel')"
        ></v-btn>
        <v-btn
          rounded
          color="rgb(53,68,147)"
          class="text-none"
          @click.native="agree"
          v-text="$t('confirm.agree')"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppConfirm',
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      args: null,
    };
  },
  methods: {
    open(title, message, args) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.args = args;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  },
};
</script>
