<template>
    <!-- Pop up dialog box for success and error messages -->
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="250px"
        v-model="snackbar"
      >
        <template v-slot:default="dialog">
          <v-card>
          
            <br>
            <br>
            <center>
            <v-icon style="font-size: 100px" x-large :class="colors">
              {{icon}}
            </v-icon>
          </center>
            <v-card-text>
              <div class="text-h7 text-center"> {{ message }}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-row>
          <v-col cols="3"></v-col>
          <v-col cols="6">
              <v-btn
                rounded
                block
                @click="dialog.value = false"
              >
              <span class="text-gradiant-link">Close</span>
            </v-btn>
          </v-col>
            <v-col cols="3"></v-col>
            </v-row>
            </v-card-actions>
            <br>
            <br>
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
        color:'orange',
        colors:'xblue',
        icon:'mdi-information-outline',
    }),
    watch: {
        showSnackBar(){
            return this.$store.getters.showSnackBar;
        }
    },
    computed: {
        showSnackBar(){
            return this.Snackbar();
        }
    },
    created(){
    },
    mounted(){
    },
    methods: {
        Snackbar(){
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
.text-gradiant-link{
      /* Fallback: Set a background color. */
    background-color: red;
    font-weight: bold;
    /* Create the gradient. */
    background-image: linear-gradient(to right, #f54001 , #efb923);
    
    /* Set the background size and repeat properties. */
    /* background-size: 100%; */
    background-repeat: repeat;

    /* Use the text as a mask for the background. */
    /* This will show the gradient as a text color rather than element bg. */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }  
  .container{
    max-width: 370px;
    min-width: 100px;
  }
  .xblue{
    color: orange
  }
  .xgreen{
    color: green
  }
  .xred{
    color: red
  }

  .xyellow{
    color: yellow
  }
  
</style>