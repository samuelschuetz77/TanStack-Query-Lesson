import { useQuery } from '@tanstack/react-query';
import { fetchEmployees, fetchEmployee } from './api';
import { useState } from 'react';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
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
// setSelectedId(employee.id). It saves the clicked employee's id into state.
  const emplist = data.filter(e=> e.name.toLowerCase()
  .includes(search.toLowerCase()))
  .map((employee) => 
  (<li key={employee.id} onClick={() => setSelectedId(employee.id)}>{employee.name} : {employee.role}</li>)) 
  
  return (
    <main>
      <h1>Employee Manager</h1>
      <input value={search} onChange={e => setSearch(e.target.value)} /> 
     

      <ul>
        {emplist}
      </ul>
      {selectedId === null ? <p>Pick Someone</p> : isPending2 ? <p>Loading...</p> : isError2 ? <p>{error2.message}</p>  :  <p>{empl.name}, {empl.role}, {empl.department}</p>}
    </main>
  )
}

