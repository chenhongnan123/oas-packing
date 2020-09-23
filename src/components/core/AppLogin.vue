<template>
  <v-dialog
    attach
    persistent
    v-model="dialog"
    max-width="400px"
  >
    <v-card>
      <v-card-title primary-title>
        <span v-text="$t('login.title')"></span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          type="text"
          id="username"
          :label="$t('login.form.username')"
          prepend-icon="$vuetify.icons.username"
        ></v-text-field>
        <v-text-field
          id="password"
          :label="$t('login.form.password')"
          @click:append="hidden = !hidden"
          prepend-icon="$vuetify.icons.password"
          :type="`${hidden ? 'password' : 'text'}`"
          :append-icon="`${hidden ? '$vuetify.icons.show' : '$vuetify.icons.hide' }`"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          rounded
          class="text-none"
          v-text="$t('login.actions.cancel')"
        ></v-btn>
        <v-btn
          rounded
          color="rgb(53,68,147)"
          class="text-none"
          v-text="$t('login.actions.login')"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppLogin',
  data() {
    return {
      dialog: false,
      hidden: true,
    };
  },
};
</script>
