import { AreaChart } from '@tremor/react';

const chartdata = [
  {
    date: 'Jan 22',
    DailyProfit: 2890,
    'ReferralProfit': 2338,
  },
  {
    date: 'Feb 22',
    DailyProfit: 2756,
    'ReferralProfit': 2103,
  },
  {
    date: 'Mar 22',
    DailyProfit: 3322,
    'ReferralProfit': 2194,
  },
  {
    date: 'Apr 22',
    DailyProfit: 3470,
    'ReferralProfit': 2108,
  },
  {
    date: 'May 22',
    DailyProfit: 3475,
    'ReferralProfit': 1812,
  },
  {
    date: 'Jun 22',
    DailyProfit: 3129,
    'ReferralProfit': 1726,
  },
  {
    date: 'Jul 22',
    DailyProfit: 3490,
    'ReferralProfit': 1982,
  },
  {
    date: 'Aug 22',
    DailyProfit: 2903,
    'ReferralProfit': 2012,
  },
  {
    date: 'Sep 22',
    DailyProfit: 2643,
    'ReferralProfit': 2342,
  },
  {
    date: 'Oct 22',
    DailyProfit: 2837,
    'ReferralProfit': 2473,
  },
  {
    date: 'Nov 22',
    DailyProfit: 2954,
    'ReferralProfit': 3848,
  },
  {
    date: 'Dec 22',
    DailyProfit: 3239,
    'ReferralProfit': 3736,
  },
];

const valueFormatter = function (number: number | bigint) {
  return '$ ' + new Intl.NumberFormat('us').format(number).toString();
};

export default function Chart() {
  return (
    <>
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Total Daily Profit</h3>
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">$34,567</p>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
        categories={['DailyProfit', 'ReferralProfit']}
        colors={['indigo', 'cyan']}
        valueFormatter={valueFormatter}
      />
    </>
  );
}