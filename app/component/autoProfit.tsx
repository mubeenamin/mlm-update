"use client"
import React, { useEffect } from 'react'
import cron from 'node-cron'
function AutoProfit() {
useEffect(() => {
    
    const task = cron.schedule('* * * * *', () => {
        fetch('/api/update_balance_gold_platinum'), {
            method: 'PUT',
        }
    });
    return () => task.stop();
},[]);

  return (
    <div></div>
  )
}

export default AutoProfit