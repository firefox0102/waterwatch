<template>
  <footer class="app__footer">
    <div class="icon-group">
      <i class="fa fa-facebook icon-group__facebook"></i>
      <i class="fa fa-twitter icon-group__twitter"></i>
      <i class="fa fa-instagram icon-group__instagram"></i>
      <i class="fa fa-vimeo icon-group__vimeo"></i>
      <i class="fa fa-youtube-play icon-group__youtube"></i>
    </div>
    <div class="footer-info">
      <div class="footer-info__text">
        Copyright
        <i class="fa fa-copyright" aria-hidden="true"></i>
        2017 Chattahoochee Riverkeeper | All Rights Reserved
      </div>
      <div class="footer-info__text">
        Phone (404) 352-9828 |
        <span class="footer-info__text--underline footer-info__text--active">info@chattachoochee.org</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>

<style lang="scss" scoped>
@import "../scss/colors";

.icon-group {
  display: flex;

  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  width: 161px;

  &__facebook {
    @extend %font-awesome-icon;
    width: 12px;
  }

  &__twitter {
    @extend %font-awesome-icon;
    width: 19px;
  }

  &__instagram {
    @extend %font-awesome-icon;
    width: 18px;
  }

  &__vimeo {
    @extend %font-awesome-icon;
    width: 20px;
  }

  &__youtube {
    @extend %font-awesome-icon;
    width: 20px;
  }
}

%font-awesome-icon {
  height: 20px;

  color: #fff;
  font-family: FontAwesome;
  font-size: 20px;
  line-height: 20px;
}

.footer-info {
  height: 48px;

  color: #fff;
  text-align: center;

  &__text {
    font-family: Roboto;
    font-size: 14px;
    line-height: 24px;

    &--underline {
      @extend .footer-info__text;
      text-decoration: underline;
    }

    &--active {
      color: $color-nww-green;
    }
  }
}
</style>
