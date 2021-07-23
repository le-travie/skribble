<template>
  <v-dialog v-model="editDialog" max-width="550px">
    <v-card>
      <v-card-title class="text-h4"
        ><v-text-field v-model="title"></v-text-field
      ></v-card-title>
      <v-container fluid
        ><v-row>
          <v-col cols="12" md="12" alight-self="center">
            <v-textarea
              name="input-7-1"
              :value="notebody"
              hint="Write notes here"
            ></v-textarea>
          </v-col> </v-row
      ></v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="saveNote()"> Submit </v-btn>
        <v-btn color="red darken-1" text @click="dialog = false"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditNotes",
  data: () => ({
    editDialog: false,
  }),
};
</script>