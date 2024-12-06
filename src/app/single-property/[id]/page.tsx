'use client'
import PropertyShowcase from '@/components/PropertyShowcase'
import { useParams } from 'next/navigation';
import React from 'react'


const Page = () => {
  const { id } = useParams();
  
  if (typeof id !== 'string') {
    return <div>Error: Invalid property ID</div>;
  }
  return (
    <div>
        <PropertyShowcase id={id}/>
    </div>
  )
}

export default Page