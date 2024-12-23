'use client'
import React, { useState } from 'react'

const Page = () => {
    const [form,setForm]=useState([{name:'Ashoka',age:'27'}]);
    const addForm=()=>{
        setForm((item)=>{
            return [...item,{name:'',age:''}]
        })
    }

    const removeHandler=(id)=>{
        form.filter(item=>id!=item.id)
    }
  return (
    <div>
        {
            form.map((item,index)=>
                
                  <div key={index}> 
                    <input
                    placeholder='name'
                    value={item.name}
                    onChange={(e)=>hell}
                    />
                    <input
                    placeholder='age'
                    value={item.age}
                    onChange={(e)=>hell}
                    />
                    <button
                    className='bg-blue-500 p-2 m-2 text-white border-r-4'
                    onClick={()=>removeHandler(index)}
                    >delete</button>
                </div>
            
            )
        }
        <button onClick={addForm}
        className='bg-blue-500 p-2 m-2 text-white border-spacing-2'
        >add another field</button>
    </div>
  )
}

export default Page
