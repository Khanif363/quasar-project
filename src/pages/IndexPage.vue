<template>
  <q-page class="flex flex-center">
    <h2 class="text-blue"><strong>WELCOME TO DASHBOARD</strong></h2>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  created () {
    this.alert('Welcome to Dashboard')
  },
  methods: {
    alert (message) {
     this.$q.notify({
        color: 'positive',
        message: message,
        icon: 'home',
        position: 'top',
      })
    }
  },
})
</script>
