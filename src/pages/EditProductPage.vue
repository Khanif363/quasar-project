<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container>
      <q-page padding class="row justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card class="bg-white text-black">
              <div class="row">
                <v-card-section class="text-blue-grey-14 q-pa-md">
                  <div class="text-h4">Edit Product</div>
                </v-card-section>
                <div class="col-12 col-xs-12 q-pt-md">
                <div class="q-pa-md">

                  <q-form
                    @submit="editProduct"
                    class="q-gutter-md"
                  >
                    <q-input
                      filled
                      v-model="data.name"
                      label="Product Name"
                      lazy-rules
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
                      emit-value
                      v-model="data.quantity"
                      label="Quantity"
                      lazy-rules
                    />

                    <q-input
                      filled
                      v-model="data.price"
                      label="Price"
                      lazy-rules
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
        name: 'null',
        category_id: 'null',
        quantity: 'null',
        price: 'null',
      },
      categories: [],
    }
  },
  created () {
    this.getProductID()
    this.getCategory()
  },
  methods: {
    getProductID() {
      api.get(`/products/${this.$route.params.id}`)
      .then(res => {
        this.data = res.data.product
        console.log(this.data)
      })
      .catch(err => {
      })
    },
    editProduct() {
      api.put(`products/${this.$route.params.id}`, this.data)
        .then(res => {
          this.$q.notify({
            message: res.data.message,
            color: 'positive',
            icon: 'done',
            position: 'top',
          })
          this.$router.push('/products')
        })
        .catch(err => {
          this.$q.notify({
            message: err.response.data.message? err.response.data.message : 'Product update failed',
            color: 'negative',
            icon: 'error',
            position: 'top',
          })
        })
    },
    getCategory () {
      this.loading = true
      api.get('categories')
        .then(response => {
          this.categories = response.data.categories
          console.log(this.categories)
        })
        .catch(error => {
          this.$q.notify({
            color: 'negative',
            message: error.response.data.message? error.response.data.message : 'Category Not Loaded',
            icon: 'error',
            position: 'top',
          })
        })
    },
  }
}
</script>

<style scoped>

</style>
