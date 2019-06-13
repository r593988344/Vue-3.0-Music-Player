<template>
    <div class="m-header red-bc-color">
      <svg class="icon icon-voice" aria-hidden="true">
        <use xlink:href="#icon-yuyin"></use>
      </svg>
      <form action="">
        <svg class="icon icon-search" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <input class="search-input" type="text" placeholder="请输入要搜索的歌曲">
      </form>
      <img src="~common/image/music.svg" alt="" style="width: 30px;height: 30px;">
    </div>
</template>

<script>
export default {
  name: 'musicHeader'
}
</script>

<style lang="scss" scoped>
.m-header{
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  img{
    z-index: 999;
  }
  form{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    position: relative;
    .search-input{
      border: 0px solid #000;
      border-radius: 20px;
      font-size: 70%;
      width: 100%;
      height: 30px;
      display: inline-block;
      padding-left: 50px;
      background-color: #ca564c;
    }
    .search-input::placeholder{
      color: #e2e2e2;
    }
  }

  .icon-voice{
    width: 10%;
    color: #ffffff;
    float: left;
  }
  .icon-playing{
    float: right;
    width: 10%;
    color: #ffffff;
  }
  .icon-search{
    position: absolute;
    left: 15px;
    color: #e2e2e2;
    font-weight: bolder;
  }
}
</style>
