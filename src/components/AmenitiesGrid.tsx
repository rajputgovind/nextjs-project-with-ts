'use client'

export default function Component() {
  const amenities = [
    {
      title: '4th Storey - The Courtyard',
      items: [
        'Courtyard Dining',
        'Festival Lawn',
        'Courtyard Lounge',
        'Fitness Courtyard',
        'Courtyard Garden',
        'Farm-to-Fork Garden',
      ],
    },
    {
      title: '6-7th Storey - TMW Study',
      items: ['Reading Alcove', 'Working Lounge'],
    },
    {
      title: '9-10th Storey - Outdoor Living Room',
      items: ['Breakout Pod', 'The Living Room', 'Plug and Play'],
    },
    {
      title: '11th Storey - Do-It-All Deck',
      items: ['Executive Lounge'],
    },
    {
      title: '12th Storey - Social Garden',
      items: ['TMW Social Club', 'Social Lounge', 'Social Blooms'],
    },
    {
      title: '13th Storey - The Bar Lounge',
      items: ['Plug and Work'],
    },
    {
      title: '15-16th Storey - Sky Pool',
      items: ['Lazy Deck', 'Sky Jacuzzi', 'Outdoor Shower'],
    },
    {
      title: '17th Storey - Wellness Terrace',
      items: ['Wellness Deck'],
    },
    {
      title: '18-19th Storey - Sky Bar',
      items: ['All-day Bar', 'Cocktail Bar'],
    },
    {
      title: '20th Storey - Sky Lounge',
      items: ['Panorama'],
    },
    {
      title: 'Roof - TMW Haven',
      items: [
        'Sky Pavilion',
        'Sky Lounge',
        'Sky Deck',
        'Outdoor Shower',
        'Infinity Sky Pool',
        'Sky Gym',
      ],
    },
  ]

  return (
    <div className="container py-8 md:max-w-4xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenities.map((amenity, index) => (
          <div key={index} className="border border-[#A3A0B7] rounded-t-lg overflow-hidden">
            <div className="bg-[#A50062] text-white p-4 font-semibold text-[16px]">
              {amenity.title}
            </div>
            <ul className="p-4 space-y-2">
              {amenity.items.map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-[#EC008C] mr-2  w-[6px] mb-0">•</span>
                  <span className="text-[#000000] text-[16px] font-semibold leading-4">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}