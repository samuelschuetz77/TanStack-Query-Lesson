import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchEmployees, fetchEmployee, createEmployee, updateEmployee, deleteEmployee, Employee } from './api';
import { useState } from 'react';


export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [name, setName] = useState('')
  const [role,setRole] = useState('')
  const [department, setDepartment] = useState('')


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
  const queryClient = useQueryClient();

  
  const createMut = useMutation({
    mutationFn: (newEmp: { name: string; role:string; department:string; }) => {
      return createEmployee(newEmp);
    },
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['employees'] });  //invalidating marks it stale which triggers a refresh
    },
    onError: (error) => {
      console.error('Error adding new Employee', error);
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, fields }: { id: string; fields: { name: string; role: string; department: string } }) => {
      return updateEmployee(id, fields);
    },
    onSuccess: (updated) => {
      

      queryClient.setQueryData(['employees', updated.id], updated);
      queryClient.setQueryData<Employee[]>(['employees'], old => old?.map(e => e.id === updated.id ? updated : e ));
      
    },
    onError: (error) => {
      console.error('Error updating Employee', error);
    },
  });

  const deleteMut = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return deleteEmployee(id);
    },
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['employees'] })
      setSelectedId(null)
      
    },
    onError: (error) => {
      console.error('Error deleting Employee', error);
    },
  });




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
      
      <span>🔍</span>
      
       
      <br />
      <div>

        <input value={name} onChange={e => setName(e.target.value)} placeholder='Name'/>
        <input value={role} onChange={e => setRole(e.target.value)} placeholder='Role'/>
        <input value={department} onChange={e => setDepartment(e.target.value)} placeholder='Department'/>
        <button onClick={()=> createMut.mutate({name, role, department})}>Add </button>
        <button
          disabled={selectedId === null}
          onClick={() => updateMut.mutate({ id: selectedId!, fields: { name, role, department } })}
        >
          Update selected
        </button>
        <button
          disabled={selectedId === null}
          onClick={() => deleteMut.mutate({ id: selectedId! })}
        >
          Delete selected
        </button>

      </div>

      <ul>
        {emplist}
      </ul>
      {selectedId === null ? <p>Pick Someone</p> : isPending2 ? <p>Loading...</p> : isError2 ? <p>{error2.message}</p>  :  <p>{empl.name}, {empl.role}, {empl.department}</p>}
    </main>
  )
}

