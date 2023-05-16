<script setup lang="ts">
import { MessageElem } from 'icqq/lib/message/elements';
import { getBfaceUrl } from 'utils/common';

export interface Props {
  modelValue: MessageElem;
}

defineProps<Props>();
</script>

<template>
  <div
    v-if="modelValue.type === 'at'"
    class="text-blue"
    :aria-description="modelValue.qq"
  >
    {{ modelValue.text }}
  </div>
  <div v-if="modelValue.type === 'bface'" class="col-12">
    <q-img
      :alt="modelValue.text"
      :src="getBfaceUrl(modelValue)"
      width="150px"
    />
  </div>
  <div v-if="modelValue.type === 'dice'">Dice: {{ modelValue.id }}</div>
  <div v-if="modelValue.type === 'face'">
    <!-- TODO: Implement Lottie (https://github.com/Icalingua-plus-plus/Icalingua-plus-plus/blob/7d5e4103e76b61048173af7bfbd3e2db96695292/icalingua/src/renderer/components/LottieAnimation.vue) -->
    Face: {{ modelValue.id }}, {{ modelValue.text }}
  </div>
  <div v-if="modelValue.type === 'file'">
    File: {{ modelValue.name }}, {{ modelValue.fid }}, {{ modelValue.md5 }},
    {{ modelValue.size }}, {{ modelValue.duration }}
  </div>
  <div v-if="modelValue.type === 'flash'" class="col-12">
    <q-img
      :alt="modelValue.file"
      :src="modelValue.url"
      width="200px"
      referrerpolicy="no-referrer"
    >
      <div
        class="absolute-full flex flex-center"
        style="backdrop-filter: blur(16px)"
      >
        <q-icon name="bolt" size="100px" />
      </div>
    </q-img>
  </div>
  <div v-if="modelValue.type === 'image'" class="col-12">
    <q-img
      :alt="modelValue.file"
      :src="modelValue.url"
      width="200px"
      referrerpolicy="no-referrer"
    />
  </div>
  <div v-if="modelValue.type === 'json'">JSON: {{ modelValue.data }}</div>
  <div v-if="modelValue.type === 'location'">
    Location: {{ modelValue.address }}, {{ modelValue.lat }},
    {{ modelValue.lng }}, {{ modelValue.name }}, {{ modelValue.id }}
  </div>
  <div v-if="modelValue.type === 'mirai'">Mirai: {{ modelValue.data }}</div>
  <div v-if="modelValue.type === 'music'">
    Music: {{ modelValue.id }}, {{ modelValue.platform }},
    {{ modelValue.title }}, {{ modelValue.singer }}, {{ modelValue.jumpUrl }},
    {{ modelValue.musicUrl }}, {{ modelValue.preview }}
  </div>
  <div v-if="modelValue.type === 'node'">
    Forward: {{ modelValue.user_id }}, {{ modelValue.message }},
    {{ modelValue.nickname }}, {{ modelValue.time }}
  </div>
  <div v-if="modelValue.type === 'poke'">
    Poke: {{ modelValue.id }}, {{ modelValue.text }}
  </div>
  <div v-if="modelValue.type === 'quote'">
    Quote: {{ modelValue.user_id }}, {{ modelValue.time }},
    {{ modelValue.seq }}, {{ modelValue.rand }}, {{ modelValue.message }}
  </div>
  <div v-if="modelValue.type === 'record'">
    Record: {{ modelValue.file }}, {{ modelValue.url }}
  </div>
  <div v-if="modelValue.type === 'rps'">RPS: {{ modelValue.id }}</div>
  <div v-if="modelValue.type === 'sface'">
    SFace: {{ modelValue.id }}, {{ modelValue.text }}
  </div>
  <div v-if="modelValue.type === 'share'">
    Share: {{ modelValue.url }}, {{ modelValue.title }},
    {{ modelValue.content }}, {{ modelValue.image }}
  </div>
  <div v-if="modelValue.type === 'text'" style="white-space: pre-wrap">
    {{ modelValue.text }}
  </div>
  <div v-if="modelValue.type === 'video'">
    <!-- TODO: Get video URL -->
    Video: {{ modelValue.fid }}, {{ modelValue.md5 }}
  </div>
  <div v-if="modelValue.type === 'xml'">
    XML: {{ modelValue.data }}, {{ modelValue.id }}
  </div>
</template>

<style lang="scss" scoped></style>
