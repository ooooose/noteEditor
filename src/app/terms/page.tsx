'use client'

import { useState } from 'react'

import MainLayout from '@/components/layouts/Layout/MainLayout'
import { TermsOfService, PrivacyPolicy } from '@/components/layouts/Terms'

export default function Terms() {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = [
    { title: '利用規約', content: <TermsOfService /> },
    { title: 'プライバシーポリシー', content: <PrivacyPolicy /> },
  ]

  return (
    <MainLayout>
      <div className='w-[700px] py-8'>
        <section className='mb-8 border-b-2 py-2 pt-8'>
          {tabs.map((tab, index) => (
            <button
              className={`${activeTab === index ? 'text-xl' : 'text-xl text-gray-500'} mr-4`}
              key={index}
              onClick={() => setActiveTab(index)}
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
