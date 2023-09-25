<template>
  <div class="comment-container">
    <div class="comment" v-for="item in comments">
      <div class="comment-info">
        <div class="avatar-container">
          <img :src="item.fromAvatar" alt="" class="avatar">
        </div>
        <div class="comment-info-right">
          <span class="name">{{item.fromName}}</span>
          <span class="date">{{item.date}}</span>
        </div>
      </div>
      <div class="comment-content">
        {{item.content}}
      </div>
      <div class="comment-handle">
        <span class="like" @click="likeClick(item)">
          <i class="iconfont icon-like"></i>
          <span>{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span>
        </span>
        <span class="reply" @click="showReply(item)">
          <i class="iconfont icon-comment"></i>
          <span>回复</span>
        </span>
      </div>
      <div class="comment-reply">
        <div class="comment-reply-container">
          <div class="reply-item" v-for="reply in item.reply">
            <div class="comment-reply-info">
              <div class="avatar-container">
                <img :src="reply.fromAvatar" alt="" class="avatar">
              </div>
              <div class="reply-info-right">
                <span class="name">{{reply.fromName}}</span>
                <span class="date">{{reply.date}}</span>
              </div>
           </div>
          <div class="reply-content">@{{reply.toName}} {{reply.content}}</div>
            <div class="comment-reply-bottom">
              <span class="reply" @click="showReply(item,reply)">
                <i class="iconfont icon-comment"></i>
                <span>回复</span>
               </span>
            </div>
         </div>
       </div>
       <transition name="fade">
         <div class="comment-write" v-if="showReplyId==item.id">
         <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入评论"
          autofocus
          v-model="replyContent">
         </el-input>
         <div class="write-btn">
            <el-button round @click="cancleReply">取消</el-button>
            <el-button type="success" round>发送</el-button>
         </div>
         </div>
       </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'Comment',
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showReplyId:'',
      replyContent:''
    }
  },
  methods: {
    // 点击喜欢
    likeClick(item) {
      if(item.isLike === null) {
        Vue.$set(item,"isLike",true);
        item.likeNum++;
      } else {
        if(item.isLike) {
          item.likeNum--;
        }else {
          item.likeNum++;
        }
        item.isLike =!item.isLike;
      }
    },
    //进行回复
    showReply(item,reply) {
      if(reply) {
        this.replyContent='@'+reply.fromName+" ";
      } else {
        this.replyContent='';
      }
      this.showReplyId=item.id;
    },
    //取消回复
    cancleReply() {
      this.showReplyId=' ';
    }
  }
} 
</script>
<style scoped>
.comment-container {
  margin: 1em;
}
.comment-info {
  display: flex;
  align-items:center;
}
.avatar-container {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
}
.avatar-container img {
  height: 100%;
  width: 100%;
}
.comment-info-right {
  display: flex;
  flex-direction: column;
  margin-left: 1em;
}
.name {
  font-size: 1.2em;
  font-weight: bold;
}
.date {
  font-size: 0.9em;
  color: #9fa3aa;
}
.comment-content {
  margin: 1em;
}
.comment-handle {
  margin-left: 1em;
  color: #b0b0b0;
}
.like {
  margin-right: 1em;
  cursor: pointer;
}
.reply {
  cursor: pointer;
}
.comment-reply {
  margin: 1em;
}
.comment-reply-container {
   padding: 0em 1em 0em 1em;
   border-left:1px solid #d9d9d9;
}
.reply-item {
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 1px dashed  #EBEEF5;
}
.comment-reply-info {
  display: flex;
  align-items:center;
}
.reply-info-right {
  display: flex;
  flex-direction: column;
  margin-left: 1em;
}
.reply-content {
  margin-top: 1em;
}
.comment-reply-bottom {
  margin-top: 0.5em;
  color: #b0b0b0; 
}
.reply:hover {
  color:#333;
}
.write-btn {
  margin-top: 1em;
  display: flex;
  justify-content:flex-end;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>