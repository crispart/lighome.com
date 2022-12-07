<template>
  <div class="about">
    <!-- видео -->
    <div class="about__texture">
      <!-- плеер -->
      <video
        autoplay
        class="about__texture__image"
        loop
        muted
        playsinline
        poster="@/assets/img/about-poster.jpg"
        src="@/assets/video/about.mp4"
      >
        Sorry, your browser doesn't support embedded videos.
      </video>
      <!-- обложка -->
      <div class="about__texture__label">
        <h1 class="about__texture__label__header">About</h1>
        <p class="about__texture__label__description">
          I create visual language for brands
        </p>
      </div>
    </div>
    <!-- профиль -->
    <div
      ref="contactForm"
      class="about__contact"
    >
      <!-- владелец -->
      <div class="about__contact__profile">
        <p class="about__contact__profile__header">
          My name is Anastasia Tyuleneva. My pseudonym is Ligreen&nbsp;Jade. Currently live in
          Bali&nbsp;&&nbsp;freelancing.
        </p>
        <p class="about__contact__profile__description">
          My main specialty is identity and materials for print. But I do graphic & video for social media and another
          platform. Graduated from the Institute of Business and Design. I also continue to develop my skill. Now I am
          studying with the leader of freelancing in graphic design — Alice Yakovleva.
        </p>
      </div>
      <!-- форма -->
      <form
        v-if="sentStatus !== FormState.SENT"
        class="about__contact__form"
        @submit.prevent="submitForm"
      >
        <label class="about__contact__form__item">
          <span class="about__contact__form__item__label">Name *</span>
          <input
            v-model="formModel.name"
            :disabled="sentStatus === FormState.SENDING"
            autofocus
            class="about__contact__form__item__input"
            name="name"
            placeholder="Your name..."
            required
            type="text"
          >
        </label>
        <label class="about__contact__form__item">
          <span class="about__contact__form__item__label">Email address *</span>
          <input
            v-model="formModel.email"
            :disabled="sentStatus === FormState.SENDING"
            class="about__contact__form__item__input"
            name="email"
            placeholder="Your email address..."
            required
            type="email"
          >
        </label>
        <label class="about__contact__form__item">
          <span class="about__contact__form__item__label">Message</span>
          <textarea
            v-model="formModel.message"
            :disabled="sentStatus === FormState.SENDING"
            class="about__contact__form__item__input"
            name="message"
            placeholder="Your message..."
            rows="5"
          ></textarea>
        </label>
        <button
          :disabled="sentStatus === FormState.SENDING"
          class="about__contact__form__submit"
          type="submit"
        >
          {{ sentStatus === FormState.SENDING ? 'Sending...' : 'Send' }}
        </button>
      </form>
      <!-- заглушка -->
      <p
        v-if="sentStatus === FormState.SENT"
        class="about__contact__stub"
      >
        Thank you!
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from '@vue/reactivity';
import { useHead } from '@vueuse/head';
import FormState from '@/constants/enum/FormState';
import FormModel from '@/models/classes/FormModel';
import { useRoute } from '#app';
import { get } from '@vueuse/core';

useHead({ title: 'About | Anastasia Tyuleneva' });

const route = useRoute();

// обработка полей формы

const sentStatus = ref<FormState>(FormState.IDLE);
const formModel: FormModel = reactive(new FormModel('', ''));

const submitForm = async (): Promise<void> => {
  sentStatus.value = FormState.SENDING;
  await $fetch('https://stats.baron-pro.ru/api/mail-sender.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(formModel),
  });
  sentStatus.value = FormState.SENT;
};

// скролл к форме по кнопке "заказать дизайн"

const contactForm = ref<HTMLElement | null>(null);

if (route.query.focus === 'form') {
  setTimeout(() => (get(contactForm)?.scrollIntoView()), 1000);
}
</script>

<style lang="scss" scoped>
@use "@/assets/sass/fragments/palette";
@use "@/assets/sass/fragments/mq";

.about {
  display: flex;
  flex-direction: column;

  &__texture {
    position: relative;
    height: calc(80vh - 160px);
    min-height: 240px;
    max-height: 480px;
    // фикс отображения видео в сафари
    width: 100%;
    background-image: url("@/assets/img/about-poster.jpg");
    background-size: cover;
    background-position: center;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -webkit-perspective: 1000;
    // /фикс отображения видео в сафари

    &__image {
      height: 100%;
      width: 100%;
      object-fit: cover;
      // фикс отображения видео в сафари
      background-image: url("@/assets/img/about-poster.jpg");
      background-size: cover;
      background-position: center;
      -webkit-transform-style: preserve-3d;
      -webkit-backface-visibility: hidden;
      -webkit-transform: translate3d(0, 0, 0);
      -webkit-perspective: 1000;
      // /фикс отображения видео в сафари
    }

    &__label {
      position: absolute;
      display: flex;
      flex-direction: column;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      &__header {
        margin: 0 0 20px 0;
        font-size: 48px;
        color: palette.$text-primary-lighten;
      }

      &__description {
        margin: 0;
        font-size: 22px;
        color: palette.$text-secondary;
      }
    }
  }

  &__contact {
    display: flex;
    padding: 0 4%;
    max-width: 1400px;

    @media screen and (max-width: mq.$phone) { flex-direction: column; }

    @media screen and (max-width: mq.$tablet) { margin: 60px auto 0 auto; }

    @media screen and (min-width: mq.$tablet) { margin: 80px auto 0 auto; }

    &__profile {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;

      @media screen and (max-width: mq.$phone) { margin-bottom: 60px; }

      @media screen and (min-width: mq.$phone) { padding: 0 4% 0 0; }

      @media screen and (min-width: mq.$tablet) { padding: 0 4%; }

      &__header {
        margin: 0 0 20px 0;
        font-weight: 700;
        color: palette.$text-primary;
      }

      &__description {
        margin: 0;
        color: palette.$text-primary-lighten;
      }
    }

    &__form {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;

      @media screen and (min-width: mq.$phone) { padding: 0 0 0 4%; }

      @media screen and (min-width: mq.$tablet) { padding: 0 4%; }

      &__item {
        display: flex;
        flex-direction: column;

        &__label {
          margin-bottom: 10px;
          color: palette.$text-primary;
        }

        &__input {
          min-height: 42px;
          margin-bottom: 30px;
          padding: 10px;
          border: none;
          border-radius: 3px;
          color: palette.$text-primary;
          background-color: palette.$app-primary-darken;
        }
      }

      &__submit {
        height: 40px;
        width: fit-content;
        cursor: pointer;
        padding: 0 25px;
        border-radius: 20px;
        color: #ffffff;
        background-color: #111111;
        text-transform: uppercase;
        border: none;
      }
    }

    &__stub {
      flex-grow: 1;
      flex-basis: 0;
      margin: 0;
      padding: 0 4%;
    }
  }
}
</style>
