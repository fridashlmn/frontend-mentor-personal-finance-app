<template>
  <div class="pagination">
    <vue-awesome-paginate
      :total-items="totalItems"
      :items-per-page="itemsPerPage"
      :max-pages-shown="viewport.isGreaterOrEquals('tablet') ? 5 : 2"
      v-model="currentPage"
      active-page-class="active"
      @click="onClickHandler"
    >
      <template #prev-button>
        <div class="d-flex align-items-center">
          <IconCaretLeft class="ms-3 me-4" />
          <span v-if="viewport.isGreaterOrEquals('tablet')" class="fs-4">
            Prev
          </span>
        </div>
      </template>
      <template #next-button>
        <div class="d-flex align-items-center">
          <span v-if="viewport.isGreaterOrEquals('tablet')" class="fs-4 ms-3">
            Next
          </span>
          <IconCaretRight class="ms-4" />
        </div>
      </template>
    </vue-awesome-paginate>
  </div>
</template>
<script setup lang="ts">
import IconCaretRight from '~/assets/images/icon-caret-right.svg?component'
import IconCaretLeft from '~/assets/images/icon-caret-left.svg?component'
import { ref } from 'vue'
import { VueAwesomePaginate } from 'vue-awesome-paginate'
// eslint-disable-next-line no-undef
const viewport = useViewport()

interface Props {
  totalItems: number
  itemsPerPage: number
  maxPagesShown: number
}
defineProps<Props>()

const currentPage = ref(1)
const displayCurrentPage = defineModel()

const onClickHandler = (page: number) => {
  currentPage.value = page
  displayCurrentPage.value = page
  scrollToTop()
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
<style lang="scss">
@import 'assets/css/variables';
.pagination .pagination-container {
  column-gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
}

.pagination .paginate-buttons {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: $white;
  border: 1px solid $beige-500;
  color: black;
}

.pagination .back-button,
.pagination .next-button {
  height: 2.5rem;
  width: 5.875rem;

  @media screen and (max-width: 530px) {
    width: 3rem;
  }
}

.pagination .paginate-buttons:hover {
  background-color: $grey-500;
  border: 1px solid $grey-500;
  color: $white;
}

.pagination .active {
  background-color: $grey-900;
  border: 1px solid $grey-900;
  color: $white;
}

.pagination .active:hover {
  background-color: $grey-900;
  border: 1px solid $grey-900;
  color: $white;
}

.pagination .back-button:active,
.pagination .next-button:active {
  background-color: $grey-900;
  border: 1px solid $grey-900;
  color: $white;
}
</style>
