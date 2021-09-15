<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form>
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
                v-for="c in categories"
                :key="c.id"
                value="c.id"
              >{{c.title}}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Название</label>
          <span
              v-if="$v.title.$dirty && !$v.title.required"
              class="helper-text invalid"
          >Введите название категори</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="limit"
              :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Лимит</label>
          <span
              v-if="$v.limit.$dirty && !$v.limit.minValue"
              class="helper-text invalid"
          >Минимальная значения {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  name: "CategoryEdit",
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields()
  },
  watch: {
    current(value) {
      console.log(value)
    }
  },
  created() {
    const {id, title, limit} = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  destroyed() {
    if (this.select && this.select.destroyed) {
      this.select.destroyed()
    }
  }
}
</script>

<style scoped>

</style>