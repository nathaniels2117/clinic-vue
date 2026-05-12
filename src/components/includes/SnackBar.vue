<template>
  <!-- Pop up dialog box for success and error messages -->
  <v-dialog transition="dialog-bottom-transition" max-width="280px" v-model="snackbar">
    <template v-slot:default="dialog">
      <v-card class="pa-4 rounded-lg text-center">

        <!-- Icon -->
        <v-card-title class="justify-center">
          <v-icon style="font-size: 80px" :class="colors">
            {{ icon }}
          </v-icon>
        </v-card-title>

        <!-- Message -->
        <v-card-text>
          <div class="text-h7 font-weight-bold purple--text">
            {{ message }}
          </div>
        </v-card-text>

        <!-- Close button -->
        <v-card-actions class="justify-center">
          <v-btn class="clinic-btn" @click="dialog.value = false">
            CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'Snackbar',
  data: () => ({
    snackbar: false,
    message: '',
    color: 'orange',
    colors: 'xblue',
    icon: 'mdi-information-outline',
  }),
  watch: {
    showSnackBar() {
      return this.$store.getters.showSnackBar;
    }
  },
  computed: {
    showSnackBar() {
      return this.Snackbar();
    }
  },
  methods: {
    Snackbar() {
      this.message = this.$store.state.snackbar.message;
      this.snackbar = this.$store.state.snackbar.show;
      this.color = this.$store.state.snackbar.color;
      this.colors = this.$store.state.snackbar.colors;
      this.icon = this.$store.state.snackbar.icon;
      this.$store.state.snackbar.show = false;
    }
  }
}
</script>

<style scoped>
.clinic-btn {
  background: linear-gradient(90deg, #6A1B9A, #9C27B0);
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.xblue {
  color: #6a11cb; /* clinic purple */
}
.xgreen {
  color: #4caf50;
}
.xred {
  color: #f44336;
}
.xyellow {
  color: #ffeb3b;
}
</style>
