<template>
  <div>
    <h1>New topic form</h1>

    <div>
      <form @submit.prevent="save(form)">
        <input v-model="form.title" />
        <textarea v-model="form.tags"></textarea>
        <b-button :variant="'primary'" type="submit"> Create</b-button>
      </form>
    </div>

  </div>
</template>

<script>
import Logger from "../../core/logger.js";
const logger = Logger.getLogger("topic.create.component");

import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

function defaultForm() {
  return {
    title: "",
    tags: "",
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
      saveToDb: "topics/addOrUpdate",
      saveLinksToDb: "links/addOrUpdate",
      saveTagsToDb: "tags/addOrUpdate"
    }),
    ...mapMutations({}),
    save(form) {
      logger.debug("form data", form);
      if (!form.title) {
        return;
      }

      var formTags = (form.tags || "")
        .split(" ")
        .filter(t => t.indexOf("#") == 0)
        .map(x => {
          return {
            title: x.substring(1)
          };
        });
      logger.debug("form tags", formTags);
      Promise.all([
        this.saveToDb({
          title: form.title,
          rate: 10
        }),
        this.saveTagsToDb(formTags)
      ]).then(
        function(args) {
          let topic = args[0];
          let tags = args[1];
          logger.debug("DB results", topic);
          logger.debug("DB results", tags);

          this.$set(this, "form", defaultForm());
        }.bind(this)
      );
    }
  }
};
</script>