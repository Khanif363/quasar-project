<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="products"
      :columns="columns"
      row-key="name"
    >

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div>
            <q-btn
            icon="edit"
            size="small"
            color="teal"
            class="q-mr-sm"
            @click="editProduct(props.row.id)"
            >
            </q-btn>
            <!-- Add space between -->
            <q-btn
            icon="delete"
            size="small"
            color="negative"
            @click="deleteProduct(props.row.id)"
            >
            </q-btn>
          </div>
        </q-td>
      </template>

      <template v-slot:top>
        <q-btn color="primary" :disable="loading" label="Add Product" to="add-product"></q-btn>
        <q-space></q-space>
        <div>
        <q-form
          @submit="getProducts"
          class="q-gutter-xs"
        >

        <q-input outlined v-model="search" dense placeholder="Search">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn label="Go" type="submit" color="primary"/>
        </q-form>
        </div>

      </template>
      <template v-slot:bottom>
        <div class="q-pt-xs text-purple q-pl-md">
          <strong>
            Total Price: <br>
            Rp {{ this.totalprice.toLocaleString() }}
          </strong>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { api } from 'boot/axios'

export default {
  name: 'ProductPage',
  data () {
    return {
      products: [],
      columns: [
        { name: 'id', field: 'id', align: 'center', label: 'id', sortable: true },
        { name: 'name', field: 'name', align: 'center', label: 'name', sortable: true },
        { name: 'category', field: (val) => val.category?.name, align: 'center', label: 'category', sortable: true },
        { name: 'quantity', field: 'quantity', align: 'center', label: 'quantity', sortable: true },
        // Fromat currency IDR
        { name: 'price', field: (val) => val.price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }), align: 'center', label: 'price', sortable: true },
        { name: 'action', field: '', align: 'center', label: 'action', sortable: true },
      ],
      loading: false,
      category: '',
      totalprice: 0,
      search: '',

    }
  },
  mounted () {
    this.getProducts()
  },
  methods: {
    getProducts () {
      this.loading = true
      api.get('products', {
        params: {
          keyword: this.search
        }
      })
        .then(response => {
          this.products = response.data.products
          const total = response.data.totalprice
          this.totalprice = total
          this.loading = false
        })
        .catch(error => {
          this.$q.notify({
            icon: 'error',
            color: 'negative',
            message: error.response.data.message? error.response.data.message : 'Product Not Loaded',
            position: 'top',
          })
          this.loading = false
        })
    },


    editProduct(id) {
      this.$router.push({ path: `/edit-product/${id}` })
    },

    deleteProduct(id) {
      api.delete(`products/${id}`)
        .then(response => {
          this.getProducts()
          this.$q.notify({
            icon: 'done',
            color: 'positive',
            message: response.data.message,
            position: 'top',
          })
        })
        .catch(error => {
          this.$q.notify({
            icon: 'error',
            color: 'negative',
            message: error.response.data.message? error.response.data.message : 'Product Not Deleted',
            position: 'top',
          })
        })
    },
  },
}
</script>

