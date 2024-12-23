'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

import MainLayout from '@/components/layouts/Layout/MainLayout'
import { TermsOfService, PrivacyPolicy } from '@/components/layouts/Terms'

export default function Terms() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(0)
  const tabs = [
    { title: '利用規約', content: <TermsOfService />, query: 'terms' },
    { title: 'プライバシーポリシー', content: <PrivacyPolicy />, query: 'privacy' },
  ]

  const handleTabChange = (index: number) => {
    setActiveTab(index)
    const query = tabs[index].query
    router.push(`/terms?tab=${query}`)
  }

  useEffect(() => {
    const query = searchParams.get('tab')
    const index = tabs.findIndex((tab) => tab.query === query)
    setActiveTab(index)
  }, [searchParams])

  return (
    <MainLayout>
      <div className='w-[700px] py-8'>
        <section className='mb-8 border-b pt-8'>
          {tabs?.map((tab, index) => (
            <button
              className={`${activeTab === index ? 'border-b-2 border-gray-500 text-xl' : 'text-xl text-gray-500'} px-4 py-2`}
              key={index}
              onClick={() => handleTabChange(index)}
            >
              {tab.title}
            </button>
          ))}
        </section>
        {tabs[activeTab].content}
      </div>
    </MainLayout>
  )
}
