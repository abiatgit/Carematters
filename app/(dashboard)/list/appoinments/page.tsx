import React from 'react'
import {appointments}from '@/lib/mockData'
import { DataTable } from './data-table'
import { columns } from './columns'

const getData=()=>{
  return appointments
}
export default function Page() {
  const data=getData()
  return (
    <div>
      Appoinments
      <DataTable data={data} columns={columns}></DataTable>
    </div>
  )
}
