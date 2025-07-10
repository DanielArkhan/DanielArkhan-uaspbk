<template>
  <form @submit.prevent="submitForm">
    <label>Username</label>
    <input v-model="username" placeholder="Enter your ID" />

    <label>Pilih Nominal</label>
    <div class="card-group">
      <div
        v-for="option in packages"
        :key="option.name"
        class="card-option"
        :class="{ selected: packageName === option.name }"
        @click="packageName = option.name"
      >
        {{ option.name }}
        <div v-if="packageName === option.name" class="price-tag">
          Harga: Rp {{ option.price.toLocaleString() }}
        </div>
      </div>
    </div>

    <label>Metode Pembayaran</label>

    <div v-for="category in paymentCategories" :key="category.name">
      <h4 class="category-title">{{ category.name }}</h4>
      <div class="card-group">
        <div
          v-for="method in category.methods"
          :key="method.name"
          class="card-option"
          :class="{ selected: paymentMethod === method.name }"
          @click="paymentMethod = method.name"
        >
          {{ method.name }}
          <div v-if="paymentMethod === method.name" class="price-tag">
            {{ method.detail }}
          </div>
        </div>
      </div>
    </div>

    <button type="submit">Bayar Sekarang</button>
      <div v-if="progress > 0" class="progress-container">
        <div class="progress-bar" :style="{ width: progress + '%' }">
        </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { gameMap } from '../gameMap.js' // pastikan file ini ada

const emit = defineEmits(['success'])
const props = defineProps(['game'])
const router = useRouter()
const route = useRoute() // 👈 ini tambahan

const username = ref('')
const packageName = ref('')
const paymentMethod = ref('')
const isSubmitting = ref(false)
const progress = ref(0)

const packages = [
  { name: '60 Crystals', price: 10000 },
  { name: '300 + 30 Crystals', price: 55000 },
  { name: '6480 + 1600 Crystals', price: 1080000 }
]

const paymentCategories = [
  {
    name: 'E-Wallet',
    methods: [
      { name: 'QRIS', detail: 'Bayar via QR Code' },
      { name: 'OVO', detail: 'Bayar dengan OVO' },
      { name: 'GoPay', detail: 'Bayar dengan GoPay' },
      { name: 'DANA', detail: 'Bayar dengan DANA' },
      { name: 'ShopeePay', detail: 'Bayar dengan ShopeePay' },
      { name: 'LinkAja', detail: 'Bayar dengan LinkAja' }
    ]
  },
  {
    name: 'Mobile Banking',
    methods: [
      { name: 'BCA Mobile', detail: 'Transfer via BCA Mobile' },
      { name: 'BNI Mobile', detail: 'Transfer via BNI Mobile' },
      { name: 'BRImo', detail: 'Transfer via BRImo' },
      { name: 'BSI Mobile', detail: 'Transfer via BSI Mobile' },
      { name: 'Livin', detail: 'Transfer via Livin by Mandiri' }
    ]
  },
  {
    name: 'Ritel',
    methods: [
      { name: 'Indomaret', detail: 'Bayar di Indomaret' },
      { name: 'Alfamart', detail: 'Bayar di Alfamart' }
    ]
  }
]

async function submitForm() {
  if (!username.value || !packageName.value || !paymentMethod.value) {
    alert('Lengkapi semua data!')
    return
  }

  const selectedPackage = packages.find(p => p.name === packageName.value)

  // ✅ Pastikan dapat slug game dari route
  const gameSlug = route.params.game
  console.log('Slug dari URL:', gameSlug) // debug

  const gameNameMap = {
    genshin: 'Genshin Impact',
    ml: 'Mobile Legends',
    hsr: 'Honkai Star Rail',
    pubg: 'PUBG Mobile',
    ff: 'Free Fire'
  }

  const gameName = gameNameMap[gameSlug?.toLowerCase()] || 'Unknown Game'
  const gameId = gameMap[gameName] || '000000'

  console.log('Nama game yang akan dikirim:', gameName)

  const orderData = {
    username: username.value,
    packageName: packageName.value,
    price: selectedPackage ? selectedPackage.price : null,
    paymentMethod: paymentMethod.value,
    status: 'pending',
    date: new Date().toISOString(),
    game: gameName,    // ✅ simpan nama game
    gameId: gameId     // ✅ simpan ID game
  }

  try {
    const res = await axios.post('http://localhost:3000/orders', orderData)
    const newOrder = res.data
    emit('success', newOrder)

    // ✅ Redirect ke halaman pembayaran
    window.location.href = `/payment/${newOrder.id}`

    // Reset form
    username.value = ''
    packageName.value = ''
    paymentMethod.value = ''
  } catch (error) {
    console.error(error)
    alert('Terjadi kesalahan saat mengirim pesanan.')
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.card-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.card-option {
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.card-option:hover {
  background-color: #f9f9f9;
}

.card-option.selected {
  border: 2px solid #4d3eff;
  background-color: #f0f0ff;
}

.price-tag {
  margin-top: 8px;
  font-size: 14px;
  color: #4d3eff;
  font-weight: 600;
}

button {
  background-color: #4d3eff;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
}

.category-title {
  margin: 16px 0 8px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.progress-container {
  height: 12px;
  width: 100%;
  background-color: #eee;
  border-radius: 8px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #4d3eff;
  transition: width 0.4s ease;
}

</style>