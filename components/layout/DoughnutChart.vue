<template>
  <div>
    <div class="chartCanvas">
      <Doughnut :data="data" :options="options" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import type { DoughnutChartData } from '~/@types/types'
import { toCurrency } from '~/utils/formatter'
ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  data: DoughnutChartData
}

defineProps<Props>()
const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.raw
          return toCurrency(label)
        },
      },
    },
  },
}
</script>
<style lang="scss">
.chartCanvas {
  position: relative;
  height: 15rem;

  @media screen and (max-width: 530px) {
    margin-top: 0;
  }
}
</style>
