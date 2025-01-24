import IconOverview from '~/assets/images/icon-nav-overview.svg?component'
import IconTransactions from '~/assets/images/icon-nav-transactions.svg?component'
import IconBudgets from '~/assets/images/icon-nav-budgets.svg?component'
import IconPots from '~/assets/images/icon-nav-pots.svg?component'
import IconRecurringBills from '~/assets/images/icon-nav-recurring-bills.svg?component'

export const navigationItems = computed(() => [
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
