<template>
  <h1 class="text-center">Añadir propiedad</h1>

  <form
    class="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 w-full border border-gray-800 dark:border-white"
  >
    <div>
      <div class="flex mb-2 gap-2 justify-content-end">
        <Button
          @click="active = 0"
          rounded
          label="1"
          class="w-2rem h-2rem p-0"
          :outlined="active !== 0"
        />
        <Button
          @click="active = 1"
          rounded
          label="2"
          class="w-2rem h-2rem p-0"
          :outlined="active !== 1"
        />
        <Button
          @click="active = 2"
          rounded
          label="3"
          class="w-2rem h-2rem p-0"
          :outlined="active !== 2"
        />
      </div>

      <TabView v-model:activeIndex="active">
        <TabPanel header="Header I">
          <div>
            <label for="name">Name</label>
            <InputText
              type="text"
              id="name"
              v-model="data.name"
              class="w-full"
            />
          </div>
          <div class="mt-4">
            <label for="description">Description</label>
            <Editor
              id="description"
              v-model="data.description"
              editorStyle="height: 320px"
            />
          </div>
        </TabPanel>
        <TabPanel header="Header II">
          <p class="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
            velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel header="Header III">
          <p class="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedita distinctio. Nam libero tempore, cum soluta nobis est
            eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>
      </TabView>
    </div>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import Editor from "primevue/editor";
import { fetchLanguages } from "../../../api/fetchLanguages.js";

definePageMeta({
  layout: "admin",
});

const data = reactive({
  name: "",
  description: "",
});

fetchLanguages();
</script>
