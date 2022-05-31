<template>
  <q-layout class="bg-blue-grey-1" view="hHh Lpr lFf">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card flat class="bg-white text-black">
              <div class="row">
                <!-- <div class="col-md-6 col-xs-12">
                  <div class="row q-pt-md q-pb-md bg-teal-5">
                    <div class="col-md-8 offset-2 col-xs-8">
                      <q-img spinner-color="white" placeholder-src="/img/form.png" src="/img/form.png">
                      </q-img>
                    </div>
                  </div>
                </div> -->
                <v-card-section class="text-blue-grey-14 q-pa-md          ">
                  <div class="text-h4">Login</div>
                </v-card-section>
                <div class="col-12 col-xs-6 q-pt-md">
                <div class="q-pa-md">

                  <q-form
                    @submit="onSubmit"
                    class="q-gutter-md"
                  >
                    <q-input
                      filled
                      v-model="form.email"
                      label="Email"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Input your Email' ]"
                    />

                    <q-input
                      filled
                      type="password"
                      v-model="form.password"
                      label="Password"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Input your Password' ]"
                    />

                    <div>
                      <q-btn label="Login" type="submit" color="primary"/>
                      <q-btn label="Not Have account?" color="primary" flat class="q-ml-sm" to="/register" />
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
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'

export default {
  data () {
    return {
      form: {
        email: null,
        password: null,
      },
      $q: useQuasar(),
    }
  },

  methods: {
    onSubmit () {
      api.post('login', this.form)
      .then(res => {
        this.$q.notify({
          color: 'positive',
          textColor: 'white',
          message: res.data.message,
          icon: 'done_all',
          position: 'top',
        })
        this.$q.localStorage.set('token', res.data.token)
        this.$router.push('/')
      })
      .catch(err => {
        this.$q.notify({
          color: 'negative',
          textColor: 'white',
          message: err.response.data.message? err.response.data.message : 'Login Failed',
          icon: 'warning',
          position: 'top',
        })
        console.log(err)
      })
    }
  }
}
</script>
