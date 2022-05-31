<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>
          <q-btn
            flat
            dense
            round
            icon="logout"
            aria-label="Logout"
            @click="logOut"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menus Dashboard
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { route } from 'quasar/wrappers'

const linksList = [
  {
    title: 'Home',
    caption: 'Home Page',
    icon: 'home',
    route: { name: 'home' }
  },
  {
    title: 'Products',
    caption: 'Product List',
    icon: 'inventory',
    route: { name: 'products' }
  },
  {
    title: 'Categories',
    caption: 'Category List',
    icon: 'category',
    route: { name: 'categories' }
  }

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksList,
      $q: useQuasar()
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    logOut () {
      this.$q.localStorage.remove('token')
      this.$router.push('/login')
      this.$q.notify({
        color: 'positive',
        textColor: 'white',
        message: 'Logout Success',
        icon: 'done_all',
        position: 'top',
      })
    }
  },


  // setup () {
  //   const $q = useQuasar()
  //   const leftDrawerOpen = ref(false)
  //   const logOut = () => {
  //     this.localStorage.getItem.remove('token')
  //     // this.$router.push({ name: 'login' })
  //     this.$q.notify({
  //       color: 'positive',
  //       textColor: 'white',
  //       message: 'Logout Success',
  //       icon: 'done_all',
  //       position: 'top',
  //     })
  //   }

  //   return {
  //     essentialLinks: linksList,
  //     logOut,
  //     leftDrawerOpen,
  //     toggleLeftDrawer () {
  //       leftDrawerOpen.value = !leftDrawerOpen.value
  //     }
  //   }
  // }
})
</script>
