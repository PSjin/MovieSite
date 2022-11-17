<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div 
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink 
          v-bind:to="nav.href"
          active-class="active"
          :class="{active:isMatch(nav.path)}"
          class="nav-link">
          {{ nav.name }} 
        </RouterLink>
      </div>
    </div>
    <div 
      class="user"
      @click="toAbout">
      <img 
        :src="image" 
        :alt="name"/>
      <!-- <img 
        src="https" 
        alt="parkele"/> -->
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
import Logo from '~/components/Logo';

export default {
  components: {
    Logo
  },
  data(){
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/ //'/move'경로설정 ^시작하는 \문자표현
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ]),
    // image(){
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // }
    
    // ...mapState('move',[
    //   'movies',
    //   'loading',
    //   'message',
    //   'theMovie'
    // ])
  },
  methods: {
    isMatch(path){
      // this.image
      // this.name
      // this.movies
      // this.loading

      if(!path) return false
      console.log(this.$route, "헤더 메서드")
      return path.test(this.$route.fullPath)
    },
    toAbout(){
      console.log("!!!")
      this.$router.push('/about')
    }
  }
}
</script>



<style scoped lang="scss">
  header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo {
      margin-right: 40px;
    }
    .user {
      width: 40px;
      height: 40px;
      padding: 6px;
      border-radius: 50px;
      box-sizing: border-box;
      background-color: $gray-200;
      cursor:pointer;
      position:absolute;
      top:0;
      bottom:0;
      right:40px;
      margin:auto;
      transition: .4s;
      &:hover {
        background-color: darken($gray-200, 10%);
      }
      img {
        width: 100%;
      }
    }
    @include media-breakpoint-down(sm) {
      .nav {
        display: none;
      }
    }
  }
</style>


<!-- HelloWorld.vue===================== -->
<!-- <template>
  <h2 @click="$emit('click')">
    {{ msg }}
  </h2> 
  <img
    src="~assets/logo.png" 
    alt="HEROPY" />
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  emits: ['click']
}
</script>

<style scoped lang="scss">
  h2 {
    font-size: 22px;
    & + img {
      width: 120px;
    }
  }
</style> -->