import IconOverview from '~/assets/images/icon-nav-overview.svg?component'
import IconTransactions from '~/assets/images/icon-nav-transactions.svg?component'
import IconBudgets from '~/assets/images/icon-nav-budgets.svg?component'
import IconPots from '~/assets/images/icon-nav-pots.svg?component'
import IconRecurringBills from '~/assets/images/icon-nav-recurring-bills.svg?component'
import type { FunctionalComponent } from 'vue'

type NavigationItem = { link: string; label: string; icon: FunctionalComponent }

export const navigationItems = computed<NavigationItem[]>(() => [
  {
    link: '/',
    label: 'Overview',
    icon: IconOverview,
  },
  {
    link: '/transactions',
    label: 'Transactions',
    icon: IconTransactions,
  },
  {
    link: '/budgets',
    label: 'Budgets',
    icon: IconBudgets,
  },
  {
    link: '/pots',
    label: 'Pots',
    icon: IconPots,
  },
  {
    link: '/recurring-bills',
    label: 'Recurring bills',
    icon: IconRecurringBills,
  },
])
