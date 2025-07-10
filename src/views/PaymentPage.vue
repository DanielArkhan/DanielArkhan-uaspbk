<template>
  <div class="payment-page">
    <h2>Konfirmasi Pembayaran</h2>
    
    <div v-if="order">
      <p><b>Username:</b> {{ order.username }}</p>
      <p><b>Game:</b> {{ order.game || '-' }}</p>
      <p><b>Paket:</b> {{ order.packageName }}</p>
      <p><b>Metode Pembayaran:</b> {{ order.paymentMethod }}</p>
      <p><b>Status:</b> 
        <span :class="order.status">{{ order.status }}</span>
      </p>

      <!-- PROGRESS BAR -->
      <div class="progress-container">
        <div
          class="progress-bar"
          :style="{ width: order.status === 'completed' ? '100%' : '50%' }"
        >
          {{ order.status === 'completed' ? '100%' : '50%' }}
        </div>
      </div>

      <!-- BUTTON ATAU NOTIF -->
      <button
        v-if="order.status === 'pending'"
        @click="confirmPayment"
      >
        Bayar Sekarang
      </button>
      <p v-else>✅ Pembayaran berhasil! Terima kasih telah melakukan top-up.</p>
    </div>

    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const order = ref(null)

onMounted(async () => {
  const res = await fetch(`http://localhost:3000/orders/${route.params.orderId}`)
  order.value = await res.json()
})

async function confirmPayment() {
  const updatedOrder = { ...order.value, status: 'completed' }

  await fetch(`http://localhost:3000/orders/${route.params.orderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedOrder)
  })

  // Update data lokal agar halaman langsung merefleksikan status baru
  order.value.status = 'completed'
}
</script>

<style scoped>
.payment-page {
  max-width: 500px;
  margin: auto;
  padding: 24px;
  border: 2px solid #ccc;
  border-radius: 12px;
  background: #fdfdfd;
  text-align: center;
}

button {
  background-color: #22c55e;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 16px;
}

.progress-container {
  background: #eee;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  margin: 16px 0;
}

.progress-bar {
  height: 100%;
  background-color: #4d3eff;
  color: white;
  text-align: center;
  line-height: 24px;
  font-weight: bold;
  transition: width 0.5s ease-in-out;
}

.completed {
  color: green;
  font-weight: bold;
}

.pending {
  color: orange;
  font-weight: bold;
}
</style>
