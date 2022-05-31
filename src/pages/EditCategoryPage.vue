<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container>
      <q-page padding class="row justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card class="bg-white text-black">
              <div class="row">
                <v-card-section class="text-blue-grey-14 q-pa-md">
                  <div class="text-h4">Edit Category</div>
                </v-card-section>
                <div class="col-12 col-xs-12 q-pt-md">
                <div class="q-pa-md">

                  <q-form
                    @submit="addCategory"
                    class="q-gutter-md"
                  >
                    <q-input
                      filled
                      v-model="name"
                      label="Category Name"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Input your Category Name' ]"
                    />


                    <div>
                      <q-btn label="Submit" type="submit" color="primary"/>
                      <q-btn label="Cancel" class="q-ml-sm" to="/categories" type="button" color="negative"/>
                    </div>
                  </q-form>
                </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script>
import { api } from 'src/boot/axios'

export default {
  data () {
    return {
      name: null,
    }
  },
  created () {
    this.getCategoryID()
  },
  methods: {
    addCategory() {
      console.log(this.name)
      api.put(`categories/${this.$route.params.id}`, {name: this.name})
        .then(res => {
          this.$q.notify({
            message: res.data.message,
            color: 'positive',
            icon: 'done',
            position: 'top',
          })
          this.$router.push('/categories')
        })
        .catch(err => {
          this.$q.notify({
            message: err.response.data.message? err.response.data.message : 'Category update failed',
            color: 'negative',
            icon: 'error',
            position: 'top',
          })
        })
    },
    getCategoryID() {
      api.get(`/categories/${this.$route.params.id}`)
        .then(res => {
          this.name = res.data.category.name
        })
        .catch(err => {
        })
    },
  }
}
</script>

<style scoped>

</style>
