<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container>
      <q-page padding class="row justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card class="bg-white text-black">
              <div class="row">
                <!-- <div class="col-md-6 col-xs-12">
                  <div class="row q-pt-md q-pb-md bg-teal-5">
                    <div class="col-md-8 offset-2 col-xs-8">
                      <q-img spinner-color="white" placeholder-src="/img/form.png" src="/img/form.png">
                      </q-img>
                    </div>
                  </div>
                </div> -->
                <v-card-section class="text-blue-grey-14 q-pa-md">
                  <div class="text-h4">Add Category</div>
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
  methods: {
    addCategory() {
      console.log(this.name)
      api.post('categories', {name: this.name})
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
            message: err.response.data.message? err.response.data.message : 'Category not added',
            color: 'negative',
            icon: 'error',
            position: 'top',
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
