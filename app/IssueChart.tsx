'use client';
import { Status } from '@prisma/client';
import { Card } from '@radix-ui/themes';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

interface Props {
  status: statusCount;
}

type statusCount = {
  open: number;
  inProgress: number;
  closed: number;
};

const IssueChart = ({ status: { closed, open, inProgress } }: Props) => {
  const data: {
    label: string;
    value: number;
  }[] = [
    { label: 'Open', value: open },
    { label: 'In-progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='label' />
          <YAxis />
          <Bar
            dataKey='value'
            barSize={60}
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
