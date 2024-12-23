import MainLayout from '@/components/layouts/Layout/MainLayout'
import { TermsOfService } from '@/components/layouts/Terms/terms-of-service'

export default function Terms() {
  return (
    <MainLayout>
      <div className='w-[700px] py-8'>
        <section className='mb-8 border-b-2 py-2 pt-8'>
          <h2 className='text-2xl'>利用規約</h2>
        </section>
        <TermsOfService />
      </div>
    </MainLayout>
  )
}
