<template>
  <div>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          show-size
          label="Select Image"
          accept="image/*"
          @change="selectImage"
        ></v-file-input>
      </v-col>
      <v-col cols="4" class="pl-2">
        <v-btn color="success" dark small @click="upload">
          Upload
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div v-if="progress">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>
    <div v-if="previewImage">
      <div>
        <img class="preview my-3" :src="previewImage" alt="" />
      </div>
    </div>
    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>
    <v-card v-if="imageInfos.length > 0" class="mx-auto">
      <v-list>
        <v-subheader>List of Images</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(image, index) in imageInfos" :key="index">
            <a :href="image.url">{{ image.name }}</a>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
  
  }
};
</script>
