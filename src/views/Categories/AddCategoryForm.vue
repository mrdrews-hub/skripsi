<template>
  <v-row justify="center">

    <v-col cols="auto">
      <v-dialog
        v-model="tambahDialog"
        persistent
        transition="dialog-bottom-transition"
        max-width="800"
      >
        <v-card
          :disabled="loading"
          :loading="loading">
          <v-card-title>
            <span class="text-h5">Add Category</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <!-- Kangge daftar -->
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.categories"
                    label="Category"
                    :error-messages="v$.categories.$error ? v$.categories.$errors[0].$message : null"
                    filled
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="form.info"
                    filled
                    name="input-7-4"
                    label="Information(optional)"
                    placeholder="Informasi tambahan"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="flex justify-end">
            <v-btn
              color="error"
              elevation="3"
              rounded
              @click="close"
            >
              Close
            </v-btn>
            <v-btn
              color="primary"
              elevation="3"
              rounded
              @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import {
  defineComponent, reactive, computed, onMounted, ref,
} from '@vue/composition-api'
import useValidate from '@vuelidate/core'
import { required, maxLength, helpers } from '@vuelidate/validators'
import Swal from 'sweetalert2'
import axios from 'axios'

export default defineComponent({
  props: {
    tambahDialog: Boolean,
    loading: Boolean,
  },

  setup(props, ctx) {
    const form = reactive({
      categories: '',
      info: '',
    })
    const validator = computed(() => {
      return {
        categories: {
          required: helpers.withMessage('Tidak Boleh Kosong!', required),
        },
      }
    })
    const v$ = useValidate(validator, form)

    onMounted(() => {
      v$.value.$validate()
      console.log('mounted ?');
    })

    const save = async () => {
      if (v$.value.$error) {
        await Swal.fire({
          icon: 'warning',
          title: 'validasi error',
          text: 'Silahkan Perbaiki dulu form yang berwarna merah 😉',
        })
      } else {
        ctx.emit('save', form)
      }
    }

    const close = () => {
      ctx.emit('close')
    }

    return {
    //   loading,
      form,
      save,
      close,
      v$,
    }
  },
})
</script>
