<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="categories"
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
            @click="editCategory(props.row.id)"
            >
            </q-btn>
            <!-- Add space between -->
            <q-btn
            icon="delete"
            size="small"
            color="negative"
            @click="deleteCategory(props.row.id)"
            >
            </q-btn>
          </div>
        </q-td>
      </template>

      <template v-slot:top>
        <q-btn color="primary" :disable="loading" to="add-category" label="Add Category" class=""></q-btn>
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
      categories: [],
      columns: [
        { name: 'id', field: 'id', align: 'center', label: 'id', sortable: true },
        { name: 'name', field: 'name', align: 'center', label: 'name', sortable: true },
        { name: 'action', field: '', align: 'center', label: 'action', sortable: true },
      ],
      loading: false,
    }
  },
  created () {
    this.getCategory()
  },
  methods: {
    getCategory () {
      this.loading = true
      api.get('categories')
        .then(response => {
          this.categories = response.data.categories
          this.loading = false
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

    editCategory(id) {
      this.$router.push({ path: `/edit-category/${id}` })
    },

    deleteCategory(id) {
      api.delete(`categories/${id}`)
        .then(response => {
          this.getCategory()
          this.$q.notify({
            color: 'positive',
            message: response.data.message,
            icon: 'check',
            position: 'top',
          })
        })
        .catch(error => {
          this.$q.notify({
            color: 'negative',
            message: error.response.data.message? error.response.data.message : 'Category Not Deleted',
            icon: 'error',
            position: 'top',
          })
        })
    },
  },
}
</script>
