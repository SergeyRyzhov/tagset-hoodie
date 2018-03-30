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