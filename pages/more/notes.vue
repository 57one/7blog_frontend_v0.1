<template>
	<div>
	  <Header></Header>
	  <div class="note-container">
	  	<el-row :gutter="20">
		  <el-col :span="16">
		  	<Note></Note>
		  </el-col>
		  <el-col :span="8">
		  	<HomeLeft></HomeLeft>
		  </el-col>
	    </el-row>
	  </div>
	</div>
</template>
<script>
import Header from '~/components/home/Header.vue'
import Note from '~/components/more/Note.vue'
import HomeLeft from '~/components/home/HomeLeft.vue'
export default {
	components: {
		Header,
		Note,
		HomeLeft
	}
}
</script>
<style scoped>
.note-container {
	margin: 5em;
}
</style>