<template>
  <div id="app">
    <div class="container px-3 max-w-md mx-auto">
    <!-- todo wrapper -->
    <div class="bg-white rounded shadow px-4 py-4" x-data="app()">
      <div class="title font-bold text-lg">Todo List</div>
      
      <div class="flex space-x-2  bg-white rounded-sm shadow-sm px-4 py-2 border border-gray-200 w-full mt-4">
        <input v-model="newItem" type="text" placeholder="Write a task" 
        class="w-full "
        @keydown.enter="addTask"
        >
        <button class="bg-green-500 px-2 py-1 rounded-md text-white font-semibold" @click="addTask">Add</button>
      </div>
      

      <!-- todo list -->
      <ul class="todo-list mt-4">
        <li v-for="item in items" :key="item._id" class="flex justify-between items-center mt-3" >
          <div class="flex items-center" :class="{'line-through': item.completed}">
            <input type="checkbox" name="" id="" v-model="item.completed" @click="completeTask(item)">
            <div class="capitalize ml-3 text-sm font-semibold" v-text="item.title"></div>
          </div>
          <div>
            <button @click="deleteTask(item._id)">
               <svg class=" w-4 h-4 text-gray-600 fill-current"  fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
          </div>
        </li>
      </ul>
    </div>

   
  </div>
     
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      items: [],
      newItem: ''
    }
  },
  methods: {
    async getTasks() {
      const response = await axios.get('api/tasks');
      this.items = response.data;
    },
    async addTask() {
      const response = await axios.post('api/tasks', {
        title: this.newItem
      });
      this.items.push(response.data);
      this.newItem = '';
    },
    async deleteTask(item) {
      const response = await axios.delete(`api/tasks/${item}`);
      if(response.status === 200) {
        this.items = this.items.filter(task => task._id !== item);
      }
    },
    async completeTask(item) {
     item.completed = !item.completed;
      await axios.patch(`api/tasks/${item._id}`, {
        completed: item.completed
      });
      
    }
  },
   mounted() {
   this.getTasks();
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
