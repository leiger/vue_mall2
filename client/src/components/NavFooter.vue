<template>
  <footer>
    <div class="footerLeft">
      <dl>
        <dt>SUPPORT</dt>
        <dd>
          <router-link to="/faq">Faq</router-link>
        </dd>
        <dd>
          <router-link to="/contact">Contact Me</router-link>
        </dd>
      </dl>
      <dl>
        <dt>ABOUT THIS</dt>
        <dd>
          <router-link to="/about">About</router-link>
        </dd>
      </dl>
      <dl>
        <dt>FOLLOW ME</dt>
        <dd>
          <a @click="openLink('github')">
            <Icon type="logo-github" size="14"/>Github
          </a>
        </dd>
        <dd>
          <a @click="openLink('ins')">
            <Icon type="logo-instagram" size="14"/>Instagram
          </a>
        </dd>
        <dd>
          <a @click="openLink('blog')">
            <Icon type="ios-bookmarks" size="14"/>Blog
          </a>
        </dd>
      </dl>
    </div>
    <div class="footerRight">2018 &copy; Design & Create by leiger</div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    openLink(src) {
      if (src === "github") {
        window.open(`https://github.com/leiger/`, "_blank");
      } else if (src === "ins") {
        window.open(`https://www.instagram.com/leiger_/`, "_blank");
      } else {
        window.open(`https://leiger.me`, "_blank");
      }
    }
  }
};
</script>

<style scoped>
footer {
  background-color: #212121;
  color: #b0b0b0;
  display: flex;
  justify-content: space-between;
  padding: 30px;
}
.footerLeft {
  display: flex;
  flex-direction: row;
}
.footerLeft dt {
  font-size: 14px;
  text-transform: uppercase;
  line-height: 40px;
  font-weight: 600;
  padding-right: 80px;
}
.footerLeft dd {
  line-height: 32px;
}
.footerLeft a {
  color: #b0b0b0;
}
.footerLeft a:hover {
  color: #fff;
}
i {
  padding-right: 10px;
  vertical-align: unset;
}

.footerRight {
  color: #b0b0b0;
  font-size: 13px;
  line-height: 136px;
  letter-spacing: 1px;
}
</style>


