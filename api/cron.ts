import cron from 'node-cron'

cron.schedule('*/30 * * * *', () => {
  fetch('/api/update_balance_gold_platinum'), {
    method: 'PUT',
  }
})

