<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item v-for="member in members" :key="member.id" :name="member.fullName" :role="member.role"></user-item>
    </ul>
    <router-link to="/teams/t2">Go to t2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  components: {
    UserItem
  },
  inject: ['teams', 'users'],
  props: ['teamId'],
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods: {
    loadTeamMembers(teamId) {
      const selectedteam = this.teams.find(team => team.id == teamId);
      const members = selectedteam.members;
      const selectedMembers = []
      for (const member of members) {
        const selectedUser = this.users.find(user => user.id == member);
        selectedMembers.push(selectedUser);
      }
      this.teamName = selectedteam.name;
      this.members = selectedMembers;
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log("Before Route Update from Team Members");
    console.log(to, from)
    next();
  },
  created() {
    this.loadTeamMembers(this.teamId);
  },
  watch: {
    teamId(newRoute) {
      this.loadTeamMembers(newRoute);
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>