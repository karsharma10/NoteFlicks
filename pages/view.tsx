import { useSearchParams } from 'next/navigation';

export default function View(): JSX.Element {
  const searchParams = useSearchParams()
  const search = searchParams.get('noteId')

  console.log(search)
  return (
    <div>
      <h1>View</h1>
    </div>
  );
}