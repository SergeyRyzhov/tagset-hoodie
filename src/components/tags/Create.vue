<template>
  <div>
    <h1>New tag form</h1>

    <div>
      <form @submit.prevent="save(form)">
        <input v-model="form.title" />
        <!-- <textarea v-model="form.tags"></textarea> -->
        <b-button :variant="'primary'" type="submit"> Create</b-button>
      </form>
    </div>

  </div>
</template>

<script>
  import Logger from "../../core/logger.js";
  const logger = Logger.getLogger("tags.create.component");

  import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
  } from "vuex";

  function defaultForm() {
    return {
      title: "",
      rate: 10
    };
  }
  export default {
    data() {
      return {
        form: defaultForm()
      };
    },
    computed: {
      ...mapState({}),
      ...mapGetters({})
    },
    methods: {
      ...mapActions({
        saveToDb: "tags/addOrUpdate" //,
        //removeLink: "links/remove"
      }),
      ...mapMutations({}),
      save(form) {
        logger.debug(form);
        this.saveToDb(form);
        this.$set(this, "form", defaultForm());
      }
    }
  };
</script>