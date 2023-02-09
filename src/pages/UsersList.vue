<template>
  <button @click="setInput">confirm</button>
  <button @click="saveChanges">Save Changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      changesSaved: false,
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("Before Route Enter from Users List");
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log("Before Route leave from UsersList");
    console.log(to, from)
    if (this.changesSaved) {
      next();
    } else {
      const userWantsToLeave = confirm("Are you sure? you got unsaved Changes");
      next(userWantsToLeave);
    }
  },
  inject: ['users'],
  methods: {
    // setInput() {
    //   //do something
    //   this.$router.push('/teams');
    // }
    saveChanges() {
      this.changesSaved = true;
    },
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>