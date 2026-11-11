// LESSON STAGE 2: Add employee API functions here.
// API base: http://localhost:3001
// GET /employees, GET /employees/:id, POST /employees,
// PUT /employees/:id, DELETE /employees/:id

export type Employee = {
  id: string
  name: string
  role: string
  department: string
}

export async function fetchEmployees(): Promise<Employee[]>{
    const res = await fetch('http://localhost:3001/employees')
    if (res.ok){
      return res.json()
    }

    else {
      const err = new Error("Failed to fetch employees")
      console.error(err);
      throw err;
    }
}

export async function fetchEmployee(id:string): Promise<Employee>{
  const res = await fetch(`http://localhost:3001/employees/${id}`)
  if (res.ok){
    return res.json()
  }

  else {
    const err = new Error("Failed to Fetch Employee")
     console.error(err);
     throw err;

     
     
     
     
    }
  } 
export async function createEmployee(emp: {name: string; role:string; department: string; }): Promise<Employee>{
  const res = await fetch('http://localhost:3001/employees', {method: 'POST', headers: {'Content-Type': 
    'application/json'
  }, body: JSON.stringify(emp) })
  
  if(res.ok){
    return res.json()
  }

  else {
    const error = new Error("Failed to get json")
    console.error({error});
    throw error;
  }


}

// TODO (step 6): updateEmployee(id, fields): PUT /employees/:id, returns the updated Employee.
export async function updateEmployee(id:string,
   fields: {name:string; role:string; department:string}):
   Promise<Employee>{
    const res = await fetch(`http://localhost:3001/employees/${id}` , {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(fields),
      
    })
    if (res.ok){
      return res.json()
    } 
    else{ 
      const err = new Error('Failed to update employee')
      console.error(err)
      throw err
    }
    }


export async function deleteEmployee(id:string):
Promise<void>{
 
const res = await fetch(`http://localhost:3001/employees/${id}` , {
      method: 'DELETE',
    })
    if (!res.ok){
      const err = new Error('Failed to delete employee')
      console.error(err)
      throw err
    }
 }

// TODO (step 7): deleteEmployee(id): DELETE /employees/:id. Check res.ok and throw on failure.
// Follow the same ok/else-throw pattern as the functions above.


