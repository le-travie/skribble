<template>
  <v-container class="my-10">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="note in notes" :key="note.name">
        <v-card elevation="5" outlined shaped class="ma-6">
          <v-card-title>{{ note.id + " - " + note.name }}</v-card-title>
          <v-card-text>{{ note.description }}</v-card-text>
          <v-card-actions>
            <v-btn color="#7ad7f0" small @click.stop="viewNote(note)">
              <span>More...</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" icon @click="editNote(note)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn small icon @click="deleteNote(note.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <!-- Dialog for adding new notesv-->
    <v-dialog transition="dialog-bottom-transition" max-width="550px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          bottom
          fixed
          right
          class="mb-15"
          fab
          dark
          color="pink"
          v-bind="attrs"
          v-on="on"
          @click="addNote()"
        >
          <v-icon>mdi-note-plus</v-icon>
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-card-title class="text-h4"
            ><v-text-field
              v-model="title"
              counter="100"
              :rules="titleRules"
            ></v-text-field
          ></v-card-title>
          <v-container fluid
            ><v-row>
              <v-col cols="12" md="12" alight-self="center">
                <v-textarea
                  name="input-7-1"
                  v-model="notebody"
                  hint="Write notes here"
                  counter="500"
                  :rules="noteRules"
                ></v-textarea>
              </v-col> </v-row
          ></v-container>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="
                saveNote();
                dialog.value = false;
              "
            >
              Save
            </v-btn>
            <v-btn color="red darken-1" text @click="dialog.value = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <!-- View More Dialog -->
    <v-dialog v-model="dialog" max-width="550px">
      <v-card>
        <v-card-title class="text-h4">{{ title }}</v-card-title>
        <v-container fluid
          ><v-row>
            <v-col cols="12" md="12" alight-self="center">
              {{ notebody }}
            </v-col>
          </v-row></v-container
        >

        <v-card-actions>
          <label>Completed </label>
          <v-simple-checkbox v-model="checkbox" disabled></v-simple-checkbox>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" icon text @click="dialog = false">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog For Editing Notes -->
    <v-dialog v-model="editDialog" max-width="550px">
      <v-card>
        <v-card-title class="text-h4"
          ><v-text-field
            v-model="title"
            counter="100"
            :rules="titleRules"
          ></v-text-field
        ></v-card-title>
        <v-container fluid
          ><v-row>
            <v-col cols="12" md="12" alight-self="center">
              <v-textarea
                name="input-7-1"
                v-model="notebody"
                hint="Write notes here"
                counter="500"
                :rules="noteRules"
              ></v-textarea>
            </v-col> </v-row
        ></v-container>

        <v-card-actions>
          <v-checkbox v-model="checkbox" label="Completed"></v-checkbox>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="updateNote(id)">
            Submit
          </v-btn>
          <v-btn color="red darken-1" text @click="editDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Scribbler",
  data: () => ({
    dialog: false,
    editDialog: false,
    id: 0,
    title: String,
    notebody: String,
    titleRules: [(v) => v.length <= 100 || "Max 100 characters"],
    noteRules: [(v) => v.length <= 500 || "Max 500 characters"],
    checkbox: true,
    newNote: { name: "", description: "" },
    notes: [],
  }),

  methods: {
    viewNote(note) {
      this.id = note.id;
      this.title = note.name;
      this.notebody = note.description;
      this.checkbox = note.completed;
      this.dialog = true;
    },

    async editNote(note) {
      this.id = note.id;
      let noteToEdit = await this.fetchProject(this.id);
      this.title = noteToEdit.name;
      this.notebody = noteToEdit.description;
      this.checkbox = noteToEdit.completed;
      this.editDialog = true;
    },

    async updateNote(id) {
      const editedNote = {
        completed: this.checkbox,
        name: this.title,
        description: this.notebody,
      };

      try {
        const res = await fetch(`api/projects/${id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(editedNote),
        });

        const data = await res.json();

        // console.log(data);
        this.notes = this.notes.map((note) =>
          note.id === id
            ? {
                ...note,
                completed: data.completed,
                name: data.name,
                description: data.description,
              }
            : note
        );
      } catch (err) {
        alert("Something went wrong! Check data.");
        console.log(err);
      }

      this.editDialog = false;
    },

    addNote() {
      this.title = "New Note";
      this.notebody = " ";
    },

    async saveNote() {
      this.newNote.name = this.title;
      this.newNote.description = this.notebody;
      try {
        const res = await fetch("api/projects", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(this.newNote),
        });

        const data = await res.json();
        this.notes = [...this.notes, data];
      } catch (err) {
        alert("Error! Could not save note. Check your data and try again.");
        console.log(err);
      }
    },

    async deleteNote(id) {
      if (confirm("Are you sure?")) {
        const res = await fetch(`api/projects/${id}`, { method: "DELETE" });

        res.status === 204
          ? (this.notes = this.notes.filter((note) => note.id !== id))
          : alert("Error deleting the note.");
      }
    },

    async fetchProjects() {
      try {
        const res = await fetch("api/projects");
        const data = await res.json();
        return data;
      } catch (err) {
        alert("Error! Cannot communicate with DB or backend.");
        console.log(err);
      }
    },

    async fetchProject(id) {
      try {
        const res = await fetch(`api/projects/${id}`);
        const data = await res.json();
        return data;
      } catch (err) {
        alert(`There is no note with ID: ${id}`);
        console.log(err);
      }
    },
  },

  async created() {
    this.notes = await this.fetchProjects();
  },
};
</script>
