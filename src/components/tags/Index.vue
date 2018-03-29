<template>
<div>
    <div v-if="view">
      view
        <!-- <label>{{ tag.title }}</label>
        <b-button size="sm" @click="edit">            
            <i style="color:#dc354587;" v-html="octicons.pencil.toSVG()"></i> edit
        </b-button>
        <b-button size="sm" @click="remove">            
            <i style="color:#dc354587;" v-html="octicons.trashcan.toSVG()"></i> remove
        </b-button> -->
    </div>
    <div v-else>
      edit
        <!-- <b-form @submit="save" inline>
            <label for="title">Title</label>
            <b-input v-model="tag.title" id="title"/>
            <b-button size="sm" type="submit" variant="primary">         
                <i style="color:#dc354587;" v-html="octicons.database.toSVG()"></i> save
            </b-button>
        </b-form> -->
    </div>    
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import octicons from "octicons";

export default {
  name: "Tag",
  props: ["tag", "new"],
  data() {
    return {
      view: !!this.$route.params.id,
      octicons
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions([]),
    save() {
      // this.$store.dispatch("tags/updateOrAdd", this.tag).then(
      //   (() => {
      //     this.$set(this, "view", true);
      //     this.$emit("updated");
      //   }).bind(this)
      // );
    },
    remove() {
      // this.$store.dispatch("tags/remove", this.tag).then(
      //   (() => {
      //     this.$set(this, "view", true);
      //     this.$emit("removed");
      //   }).bind(this)
      // );
    },
    edit() {
      // this.$set(this, "view", false);
    }
  },
  created() {
    //this.$store.dispatch("tags/init");
  },
  mounted() {
    // if (this.new) {
    //   this.edit();
    // }
  }
};
</script>

<style scoped>

</style>
