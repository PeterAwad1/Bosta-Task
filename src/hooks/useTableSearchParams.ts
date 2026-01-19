import { useSearchParams } from 'react-router-dom';

const useTableSearchParams = () => {
  const [searchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get('pageNumber')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const searchValue = searchParams.get('searchValue') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const isActive = searchParams.get('isActive') || '';
  const dialogPage = Number(searchParams.get('dialogPage')) || 1;
  const dialogPageSize = Number(searchParams.get('dialogPageSize')) || 10;

  return {
    dialogPage,
    dialogPageSize,
    pageNumber,
    pageSize,
    searchValue,
    date,
    from,
    to,
    isActive,
    status: searchParams.get('status') || '',
  };
};

export default useTableSearchParams;
