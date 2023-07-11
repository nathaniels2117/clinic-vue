<template>
    <v-container style="max-width: 95%; position: relative;">
        <v-row>
            <v-col cols="12">
                <v-card :loading="loading">
                    <template slot="progress">
                        <v-progress-linear
                            color="deep-purple"
                            height="10"
                            indeterminate
                        ></v-progress-linear>
                    </template>
                    <v-card-text>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Branch',
        data: () => ({
            loading: false
        }),
        created(){
            this.$store.state.header = true;
            this.$store.state.footer = true;
        },
        mounted(){
            this.$store.state.title = "Branch Information";
        },
        methods: {

        }
    }
</script>

<style scoped>
</style>