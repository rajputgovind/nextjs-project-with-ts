import React from 'react'

interface ProcessCardProps {
  title: string
  description: string
  color: 'pink' | 'purple'
}

const ProcessCard: React.FC<ProcessCardProps> = ({ title, description, color }) => {
  const bgColor = color === 'pink' ? 'bg-[#EF2BA0]' : 'bg-[#1E184F]'
  
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md text-white`}>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  )
}

export default ProcessCard