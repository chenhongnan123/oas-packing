<template>
  <!-- <v-select
    :items="languages"
    v-model="currentLanguage"
    append-icon=""
    single-line
    item-text="text"
    item-value="value"
    dense
    hide-details
    prepend-inner-icon="$vuetify.icons.translate"
  ></v-select> -->
  <v-menu>
    <template #activator="{ on }">
      <v-icon
        icon
        small
        v-on="on"
        class="mr-4"
        v-text="'$vuetify.icons.translate'"
      ></v-icon>
    </template>
    <v-card>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in languages"
            :key="i"
            @click="setLang(item.value)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { setLocale } from '@/utils/helper';

export default {
  name: 'LanguageMenu',
  data() {
    return {
      languages: [
        {
          value: 'en',
          text: 'English',
        },
        {
          value: 'zh-cn',
          text: '中文',
        },
      ],
    };
  },
  computed: {
    currentLanguage: {
      get() {
        return this.$i18n.locale;
      },
      set(val) {
        this.$i18n.locale = val;
        setLocale(val);
      },
    },
  },
  methods: {
    setLang(val) {
      this.$i18n.locale = val;
      setLocale(val);
    },
  },
};
</script>
