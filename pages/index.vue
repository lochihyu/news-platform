<template>
  <div>
    <q-carousel
      swipeable
      animated
      thumbnails
      infinite
      autoplay
      transition-prev="jump-right"
      transition-next="jump-left"
      v-model="slide"
      :height="$q.screen.lt.lg ? '600px' : '800px'"
      class="carousel"
    >
      <q-carousel-slide
        v-for="(headline, index) in breakingNews.headlines"
        :key="headline.id"
        :name="index"
        :img-src="headline.banner"
        class="image-mask text-white"
      >
        <div class="headline absolute-full q-pa-lg row carousel-info">
          <div class="col-xs-12 col-sm-10 col-md-5 row self-center q-pa-lg">
            <div class="carousel-label q-pa-xs row">
              <q-spinner-grid
                color="cyan"
                size="1.5em"
                class="q-mx-sm self-center"
              />
              <div class="text-subtitle1 text-weight-bold self-center">
                即時快訊
              </div>
            </div>

            <div class="col-12 row text-caption q-mt-md">
              <div class="text-red q-mr-sm">{{ headline.tags[0] }}</div>
              <div class="text-white">
                {{ $dayjs(headline.publish_time).fromNow() }}
              </div>
            </div>

            <BannerTitle
              :title="headline.title"
              class="headline-title text-h4"
            />

            <div class="col-12 q-mb-md text-subtitle1 description">
              {{ headline.description }}
            </div>

            <div class="col-12 text-caption text-white">
              <span v-for="tag in headline.tags" class="q-mr-sm"
                >#{{ tag }}</span
              >
            </div>

            <div class="col-12 q-my-lg">
              <q-btn
                unelevated
                rounded
                :to="`/news/${headline.group_path}/${headline.path}`"
                color="white"
                class="text-black"
                label="閱讀文章"
                icon-right="arrow_right_alt"
              />
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <GroupSection
      v-for="(groupInfo, groupPath, index) in breakingNews.groups"
      :key="groupPath"
      :group="groupInfo"
    />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

definePageMeta({
  layout: "default",
});

const breakingNews = await loadBreakingNews();
const slide = ref(0);

//console.log(breakingNews.groups);

useSeoMeta({
  title: "",
  ogTitle: "",
  description:
    "",
  ogDescription:
    "",
  keywords: [
    "",
  ].join(","),
});

async function loadBreakingNews() {
  // Loading groups for menu item
  const { data, error } = await useAsyncData(() =>
    $fetch(config.public.apiBaseUrl + "/apis/v1/breaking_news")
  );

  return data.value;
}
</script>
