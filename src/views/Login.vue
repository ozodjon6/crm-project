<template>
  <form class="card auth-card" @click.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'HomeBookkeeping' | localize}}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">{{'Email' | localize}}</label>
        <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
            >{{'FieldNotEmpty' | localize}}
        </small>
        <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'EnterValidEmail' | localize}}
        </small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required">
          Ввидите пароль
        </small>
        <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength">
          Пароль дольжент быт {{$v.password.$params.minLength.min}}. Сейчас он {{password.length}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength } from 'vuelidate/lib/validators'
import message from "@/utils/message";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "Login",
  metaInfo() {
    return {
      title: this.$title('Login')
    }
  },
  data: () => ({
    email: '',
    password: '',
    loading: true
  }),
  mounted() {
    if (message[this.$route.query.message]) {
      this.$message(localizeFilter(message[this.$route.query.message]))
    }
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(8)},
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData);
        await this.$router.push('/');
        this.loading = false
      } catch (e) {}
    }
  },
}
</script>

<style scoped>

</style>