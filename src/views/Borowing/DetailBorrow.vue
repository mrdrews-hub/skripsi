<template>
  <v-row justify="center">
    <v-col cols="auto">
      <v-dialog
        v-model="detailDialog"
        persistent
        transition="dialog-bottom-transition"
        max-width="800"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">Detail Peminjaman</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form readonly>
              <v-row>
                <v-col cols="10" class="mb-2">
                    <v-text-field
                      v-model="form.id_transaksi"
                      label="ID_TRANSASKI"
                    ></v-text-field>
                    <canvas id="QRCode"></canvas>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="form.tgl_pinjam"
                    label="Tanggal Pinjam"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="form.tgl_kembali"
                    label="Tanggal Kembali"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    :value="`${Math.abs(selisihHari(Date.now(), form.tgl_kembali))} Hari`"
                    :error="selisihHari(Date.now(), form.tgl_kembali) < 0"
                    :success="selisihHari(Date.now(), form.tgl_kembali) >= 0"
                    label="Keterlambatan"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    :value="Rupiah(form.denda)"
                    label="Denda"
                  ></v-text-field>
                </v-col>
              </v-row>
                <v-divider class="my-2"></v-divider>
              <v-row>
                <v-col cols="12"> Informasi Peminjam</v-col>
                <v-divider></v-divider>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.Member.member_id"
                    label="ID MEMBER"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.Member.nama"
                    label="Nama"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="form.Member.kelas"
                    label="Kelas"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
              <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Judul Buku
          </th>
          <th class="text-left">
            Author
          </th>
          <th class="text-left">
            Penerbit
          </th>
          <th class="text-left">
            Tahun
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in form.Borrowings"
          :key="item.BookId"
        >
          <td>{{ item.Book.title }}</td>
          <td>{{ item.Book.author }}</td>
          <td>{{ item.Book.penerbit }}</td>
          <td>{{ item.Book.years }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              rounded
              @click="close"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
import { defineComponent, onMounted, onUnmounted, ref } from '@vue/composition-api'
import QRCode from 'qrcode'
import { Rupiah, selisihHari } from '@/utils'
import axios from 'axios'

export default {
  props: {
    detailDialog: Boolean,
    loading: Boolean,
    data: {
      type: Object,
      default(rawProps) {
        return { message: [] }
      },
    },
  },
  setup(props, ctx) {
    const transaksi = props.data
    const form = ref()

    const getDetails = async () => {
      try {
        const response = await axios.get(`borrow/detail/${transaksi.id_transaksi}`)
        if (response.data.error) {
          alert('server error')
        } else {
          form.value = response.data
        }
      } catch (error) {
        console.log(error.toString())
      }
    }

    onMounted(async () => {
      await getDetails()
      QRCode.toCanvas(document.getElementById('QRCode'), transaksi.id_transaksi, function(err) {
        if (err) console.log(err.toString());
        console.log('QR Mounted');
      })
    })
    const close = () => {
      ctx.emit('close')
    }

    // const Rupiah = (money) => {
    //   return new Intl.NumberFormat('id-ID', {
    //     style: 'currency',
    //     currency: 'IDR',
    //     minimumFractionDigits: 0
    //   }).format(money)
    // }
    

    return {
        props,
        form,
        close,
        Rupiah,
        selisihHari
    }
    },
}
</script>
<style scoped>
#QRCode {
  position: absolute;
  right: 5%;
  top: 5%;
}
</style>