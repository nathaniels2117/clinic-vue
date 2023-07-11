<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
  >
  </v-data-table>
</template>

<script>

  export default {
    name: 'DataTable',
    data: () => ({
        loading: false
    }),
    props: {
        headers: {
            type: Object,
            default: () => {}
        },
        items: {
            type: Object,
            default: () => {}
        }
        // datasetIdKey: {
        //     type: String,
        //     default: 'label'
        // },
        // width: {
        //     type: Number,
        //     default: 400
        // },
        // height: {
        //     type: Number,
        //     default: 400
        // },
        // cssClasses: {
        //     default: '',
        //     type: String
        // },
        // styles: {
        //     type: Object,
        //     default: () => {}
        // },
        // plugins: {
        //     type: Object,
        //     default: () => {}
        // }
    },
    created(){
    },
    mounted(){
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>