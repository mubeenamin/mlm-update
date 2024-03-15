"use client"
import React, { useEffect } from 'react'
import cron from 'node-cron'
import { Button } from '@/components/ui/button'
function AutoProfit() {
  const updateBalance = async () => {
    const res = await fetch('/api/update_balance_gold_platinum', {
      method: 'PUT'
    })
  
    if (res.ok) {
      alert('Balance updated successfully')
    } else {
      alert('Error updating balance')
    }
  }
 

  return (
    <div>
      <Button onClick={updateBalance}>Click to update</Button>
    </div>
  )
}

export default AutoProfit