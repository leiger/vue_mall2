<template>
  <footer>
    <div class="footerLeft">
      <dl>
        <dt>FOLLOW ME</dt>
        <dd>
          <a>
            <Icon type="logo-github" size="14"/>Github
          </a>
        </dd>
        <dd>
          <a>
            <Icon type="logo-instagram" size="14"/>Instagram
          </a>
        </dd>
      </dl>
    </div>
    <div class="footerRight">
      2018 &copy; Design & Create by leiger
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
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
.footerLeft dt{
  font-size: 14px;
  text-transform: uppercase;
    line-height: 40px;
    font-weight: 600;
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
  font-size: 14px;
  line-height: 104px;
}
</style>


