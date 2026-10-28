import { useQuery } from '@tanstack/react-query';
import { fetchEmployees, fetchEmployee } from './api';
import { useState } from 'react';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const {data,isPending,isError, error}  = useQuery({
    queryKey: ['employees'],
    queryFn: () => fetchEmployees(),
    staleTime: 30_000
  })


   const { data: empl, isPending: isPending2, isError: isError2, error: error2 } = useQuery({
    queryKey: ['employees', selectedId],
    queryFn: () => fetchEmployee(selectedId!),
    staleTime: 10_000,
    enabled: selectedId !== null
  })
  if (isError) return(
    <p>{error.message}</p>
  )
    if (isPending) return(
    <p>pending....</p>

  )

  const emplist = data.map((employee) => (<li key = {employee.id}>{employee.name} : {employee.role}</li>))
  return (
    <main>
      <h1>Employee Manager</h1>
      <ul>
        {emplist}
      </ul>
    </main>
  )
}

