'use client'

import React, { useState, useRef, useEffect } from 'react'
import search from '../../public/Search-button.svg'
import Image from 'next/image'
// import { Search, X, Home, DollarSign, LayoutGrid, ArrowUpDown, SlidersHorizontal, ChevronDown } from 'lucide-react'
import cross from '../../public/cross.svg'
interface RecentSearch {
  id: string
  text: string
}

const recentSearches: RecentSearch[] = [
  { id: '1', text: 'Orchard Road' },
  { id: '2', text: 'ION Orchard' },
  { id: '3', text: 'Emerald Hill Road' },
  { id: '4', text: 'Plaza Singapura' },


]

export default function SearchBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showAllTags, setShowAllTags] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchFocus = () => {
    setIsDropdownOpen(true)
  }

  const handleSearchSelect = (search: RecentSearch) => {
    if (!selectedTags.includes(search.text)) {
      setSelectedTags([...selectedTags, search.text])
    }
    setSearchValue('')
    inputRef.current?.focus()
  }

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const visibleTags = showAllTags ? selectedTags : selectedTags.slice(0, 4)
  const hiddenTagsCount = selectedTags.length - visibleTags.length

  return (
    <div className="sticky top-0  w-full max-w-4xl mx-auto" ref={containerRef}>
      <div className="bg-white rounded-2xl shadow-lg relative">
        <div className="py-4">
          <div className="relative flex flex-col sm:flex-row items-center min-h-[40px]">
            <div className="flex-1 flex flex-wrap items-center gap-2 w-full sm:w-auto mb-4 sm:mb-0 px-4">
              <div className="flex flex-wrap gap-2 w-full">
                {visibleTags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center bg-gray-100 text-sm px-3 py-1 rounded-full ${
                      index % 2 === 0 ? 'sm:mr-2' : ''
                    }`}
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-gray-400 hover:text-gray-600"
                    >
                      {/* <X size={14} /> */}
                      <Image src={cross} alt='' width={10} height={10}/>
                    </button>
                  </span>
                ))}
                {hiddenTagsCount > 0 && (
                  <button
                    onClick={() => setShowAllTags(!showAllTags)}
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showAllTags ? 'Show less' : `+${hiddenTagsCount} more`}
                    
                    < p  className={`ml-1 transform ${showAllTags ? 'rotate-180' : ''}`} >|</p>
                  </button>
                )}
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder={selectedTags.length === 0 ? "Search location" : ""}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={handleSearchFocus}
                className="flex-1 min-w-[120px] outline-none w-full sm:w-auto"
              />
            </div>
            <div className="absolute right-0">
         
              <button className="">
                {/* <Search size={20} /> */}
                <Image src={search} alt='' />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-4 pb-4 overflow-x-auto whitespace-nowrap">
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            {/* <DollarSign size={16} className="mr-2" /> */}
            <span className="hidden sm:inline">Select Price Range</span>
            <span className="sm:hidden">Price</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            {/* <Home size={16} className="mr-2" /> */}
            <span className="hidden sm:inline">Select Property Type</span>
            <span className="sm:hidden">Type</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            {/* <LayoutGrid size={16} className="mr-2" /> */}
            <span className="hidden sm:inline">Select Amenities</span>
            <span className="sm:hidden">Amenities</span>
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors">
            {/* <ArrowUpDown size={16} className="mr-2" /> */}
            <span className="hidden sm:inline">Sort</span>
            <span className="sm:hidden">Sort</span>
          </button>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg z-40 max-h-64 custom-scrollbar">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Recent searches</h3>
            <ul className="space-y-1">
              {recentSearches.map((search) => (
                <li
                  key={search.id}
                  className="flex items-center justify-between px-2 py-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => handleSearchSelect(search)}
                >
                  <div className="flex items-center">
                    {/* <Search size={16} className="text-gray-400 mr-2" /> */}
                    <span className="text-sm">{search.text}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle remove from recent searches
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {/* <X size={16} /> */}

                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}