import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const riskColors = {
  low: '#059669',
  medium: '#d97706',
  high: '#dc2626',
}

function RiskDistributionChart({ data }) {
  const totalCustomers = data.reduce((total, item) => total + item.value, 0)

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <h3 className="text-base font-semibold text-slate-900">Churn Risk Distribution</h3>
        <p className="mt-1 text-sm text-slate-500">Customer population grouped by displayed churn-risk category.</p>
      </div>

      <figure className="mt-4 h-72 w-full" aria-label="Customer churn risk distribution donut chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={68}
              outerRadius={96}
              paddingAngle={2}
              stroke="none"
              isAnimationActive={false}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={riskColors[entry.level]} />
              ))}
              <Label
                value={`${totalCustomers.toLocaleString()} total`}
                position="center"
                fill="#334155"
                className="text-sm font-semibold"
              />
            </Pie>
            <Tooltip
              formatter={(value) => [`${Number(value).toLocaleString()} customers`, 'Customers']}
              contentStyle={{ borderColor: '#e2e8f0', borderRadius: '0.5rem', fontSize: '0.875rem' }}
            />
            <Legend verticalAlign="bottom" iconType="circle" iconSize={9} />
          </PieChart>
        </ResponsiveContainer>
        <figcaption className="sr-only">
          Low risk: 4,800 customers. Medium risk: 1,351 customers. High risk: 892 customers.
        </figcaption>
      </figure>
    </section>
  )
}

export default RiskDistributionChart
