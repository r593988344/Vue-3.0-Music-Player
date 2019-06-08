<template>
    <div class="music-footer">
      <div class="tabs">
        <ul>
          <li>
            <router-link tag="div" class="home-tabs" to="/recommend">
              <div class="red-bg">
                <svg class="icon icon-tabs" aria-hidden="true">
                  <use xlink:href="#icon-faxian1"></use>
                </svg>
              </div>
              <span> 发现</span>
            </router-link>
          </li>
          <li>
            <router-link tag="div" class="home-tabs" to="/videos">
              <div class="red-bg">
                <svg class="icon icon-tabs" aria-hidden="true">
                  <use xlink:href="#icon-shipin"></use>
                </svg>
              </div>
              <span> 发现</span>
            </router-link>
          </li>
          <li>
            <router-link tag="div" class="home-tabs" to="/mine">
              <div class="red-bg">
                <svg class="icon icon-tabs" aria-hidden="true">
                  <use xlink:href="#icon-yinyue"></use>
                </svg>
              </div>
              <span> 我的</span>
            </router-link>
          </li>
          <li>
            <router-link tag="div" class="home-tabs" to="/friends">
              <div class="red-bg">
                <svg class="icon icon-tabs" aria-hidden="true">
                  <use xlink:href="#icon-pengyou"></use>
                </svg>
              </div>
              <span> 朋友</span>
            </router-link>
          </li>
          <li>
            <router-link tag="div" class="home-tabs" to="/account">
              <div class="red-bg">
                <svg class="icon icon-tabs" aria-hidden="true">
                  <use xlink:href="#icon-iconfuzhi"></use>
                </svg>
              </div>
              <span>账号</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'musicFooter'
}
</script>

<style lang="scss" scoped>
.music-footer{
  position: fixed;
  bottom: 0;
  height: 60px;
  background-color: #ffffff;
  .tabs{
    width: 100%;
    .home-tabs{
      width: 40px;
      height: 40px;
      margin: 0 auto;
      border-radius: 50%;

      .red-bg{
        height: 40px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &.router-link-active{
        background-color: #ca564c;
        .icon-tabs{
          color: #ffffff;
        }
        span{
          color: #ce513f;
        }
      }
    }
    ul{
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      li{
        float: left;
        width: 60px;
        height: 60px;
        font-size: 16px;
        display: flex;
        align-items: baseline;
        span{
          display: block;
          height: 10px;
          font-size: 12px;
        }
        .icon-tabs{
          font-size: 30px;
          color: #888888;
        }
      }
    }
  }
}
</style>
