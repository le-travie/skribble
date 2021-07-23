<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="#236AB9" dark>
        <v-toolbar-title>Skribble Notes</v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <label class="mr-4">filter by:</label>
        <v-col cols="6" sm="3" md="2">
          <v-select
            solo-inverted
            dense
            :items="filters"
            v-model="searchBy"
            class="mt-7"
          >
          </v-select>
        </v-col>

        <v-col cols="12" sm="3" md="2">
          <v-text-field
            class="mt-7 ml-3"
            dense
            solo-inverted
            v-model="search"
            append-icon="mdi-magnify"
            @keydown="searchNotes()"
          ></v-text-field>
        </v-col> -->
      </v-app-bar>

      <v-main>
        <scribbler />
      </v-main>
      <v-footer app>
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} -
          <strong>Kingston, Bryan &amp; Niles</strong>
        </v-col>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Scribbler from "./components/Scribbler.vue";

export default {
  name: "App",

  components: {
    Scribbler,
  },

  data: () => ({
    search: "",
    searchBy: "ID",
    filters: ["ID", "Title", "Content"],
  }),

  methods: {
    searchNotes() {
      console.log(this.searchBy);
    },
  },
};
</script>
