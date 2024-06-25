import Image from 'next/image';
import Pagination from './components/Pagination';

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      itemsCount={100}
      pageSize={10}
      currentPage={parseInt(searchParams.page)}
    />
  );
}
