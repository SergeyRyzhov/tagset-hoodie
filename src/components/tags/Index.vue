<template>
<div>
   <!---->
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
