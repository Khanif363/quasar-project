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
                  <div class="text-h4">Add Product</div>
                </v-card-section>
                <div class="col-12 col-xs-12 q-pt-md">
                <div class="q-pa-md">

                  <q-form
                    @submit="addProduct"
                    class="q-gutter-md"
                  >
                    <q-input
                      filled
                      v-model="data.name"
                      label="Product Name"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Input your Product Name' ]"
                    />

                    <q-select
                    filled
                    emit-value
                    map-options
                    clearable
                    v-model="data.category_id"
                    option-value="id"
                    option-label="name"
                    :options="categories"
                    label="Category"
                     />


                    <q-input
                      filled
                      v-model="data.quantity"
                      label="Quantity"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Input your Quantity' ]"
                    />

                    <q-input
                      filled
                      v-model="data.price"
                      label="Price"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Input your Price' ]"
                    />

                    <div>
                      <q-btn label="Submit" type="submit" color="primary"/>
                      <q-btn label="Cancel" class="q-ml-sm" to="/products" type="button" color="negative"/>
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
      data: {
        name: null,
        category_id: null,
        quantity: null,
        price: null,
      },
      categories: [],
    }
  },

  created () {
    this.getCategory()
  },

  methods: {
    addProduct() {
      console.log(this.data)
      // api.post('products', this.data)
      //   .then(res => {
      //     this.$q.notify({
      //       message: res.data.message,
      //       color: 'positive',
      //       icon: 'done',
      //       position: 'top',
      //     })
      //     this.$router.push('/products')
      //   })
      //   .catch(err => {
      //     this.$q.notify({
      //       message: err.response.data.message? err.response.data.message : 'Product not added',
      //       color: 'negative',
      //       icon: 'error',
      //       position: 'top',
      //     })
      //     console.log(err)
      //   })
    },

    getCategory () {
      this.loading = true
      api.get('categories')
        .then(response => {
          this.categories = response.data.categories
          this.loading = false
          console.log(this.categories)
        })
        .catch(error => {
          this.$q.notify({
            color: 'negative',
            message: error.response.data.message? error.response.data.message : 'Category Not Loaded',
            icon: 'error',
            position: 'top',
          })
          this.loading = false
        })
    },
  }
}
</script>

<style scoped>

</style>
