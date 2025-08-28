'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'

import { TermsOfService, PrivacyPolicy } from '@/components/layouts/Terms'

export function TabContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(0)

  const tabs = useMemo(
    () => [
      { title: '利用規約', content: <TermsOfService />, query: 'terms' },
      { title: 'プライバシーポリシー', content: <PrivacyPolicy />, query: 'privacy' },
    ],
    [],
  )

  const handleTabChange = (index: number) => {
    setActiveTab(index)
    const query = tabs[index].query
    router.push(`/terms?tab=${query}`)
  }

  useEffect(() => {
    const query = searchParams.get('tab')
    const index = tabs.findIndex((tab) => tab.query === query)
    setActiveTab(index)
  }, [searchParams, tabs])

  return (
    <div className='w-[360px] py-8 md:w-[700px]'>
      <section className='mb-8 border-b pt-8'>
        {tabs?.map((tab, index) => (
          <button
            className={`${activeTab === index ? 'border-b-2 border-gray-500 text-xl transition-all duration-300 ease-in-out' : 'text-xl text-gray-500'} px-4 py-2`}
            key={index}
            onClick={() => handleTabChange(index)}
          >
            {tab.title}
          </button>
        ))}
      </section>
      {tabs[activeTab].content}
    </div>
  )
}
