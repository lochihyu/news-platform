<template>
  <q-layout view="lHh lpR fff">
    <q-header elevated class="bg-white text-black" height-hint="64">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <router-link to="/">
          <q-img
            class="q-mx-md"
            src=""
            style="width: 128px; max-height: 64px"
            fit="contain"
          />
        </router-link>
        <q-tabs
          align="left"
          active-color="red-8"
          indicator-color="red-8"
          class="gt-sm"
        >
          <q-route-tab
            v-for="group in groups"
            :key="group.id"
            :to="'/' + group.path"
            :label="group.name"
            exact
          />
        </q-tabs>

        <q-space />

        <q-form @submit="onSearch">
          <q-input
            ref="searchInput"
            dense
            standout
            v-model="keywords"
            input-class="text-right"
            class="q-ml-md"
            placeholder="搜尋關鍵字"
          >
            <template v-slot:append>
              <q-icon
                v-if="keywords === ''"
                name="search"
                @click="searchInput.focus()"
              />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="keywords = ''"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      elevated
    >
      <q-list>
        <q-item
          v-for="group in groups"
          :key="group.id"
          :to="'/' + group.path"
          dense
          active-class="text-brown-5 bg-brown-1"
          class="q-my-sm"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar rounded color="brown-3" text-color="white">
              {{ group.name.charAt(0) }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ group.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <NuxtPage />
    </q-page-container>

    <!-- footer -->
    <q-footer>
      <q-card flat square class="bg-grey-10 text-white text-caption">
        <q-card-section>
          <div class="q-gutter-sm">
            <q-btn unelevated round icon="mdi-facebook" />
            <q-btn unelevated round icon="mdi-instagram" />
            <q-btn unelevated round icon="mdi-twitter" />
            <q-btn unelevated round icon="mdi-youtube" />
          </div>
          <q-separator dark spaced />
        </q-card-section>

        <q-card-section> </q-card-section>
      </q-card>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const router = useRouter();
const leftDrawerOpen = ref(false);
const keywords = ref("");
const searchInput = ref(null);
const groups = await loadGroups();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

async function loadGroups() {
  // Loading groups for menu item
  const { data, error } = await useAsyncData(() =>
    $fetch(config.public.apiBaseUrl + "/apis/v1/groups")
  );

  let groups = [{ id: 0, name: "即時快訊", path: "" }];

  groups.push(...data.value.groups);
  groups.push({ id: 999, name: "合作媒體", path: "collaborative" });

  return groups;
}

function onSearch() {
  searchInput.value.blur();
  let kw = keywords.value.trim();
  if (kw === "") {
    return;
  }

  router.push("/keywords/" + encodeURIComponent(kw));
}
</script>
