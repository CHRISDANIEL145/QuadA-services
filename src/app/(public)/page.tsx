import { getPublicCategories as getCategories } from '@/actions/public'
import { HouseScene } from '@/components/home/HouseScene'
import { CategoryDiscovery } from '@/components/home/CategoryDiscovery'
import { WhyABC ARONTONIO } from '@/components/home/WhyABC ARONTONIO'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ServiceAreaMap } from '@/components/home/ServiceAreaMap'
import { HeroCTA } from '@/components/home/HeroCTA'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-ground w-full overflow-x-clip">
      {/* 
        Emergency override to fix Hydration mismatch on the server. */}
      <HouseScene categories={categories} />
      <CategoryDiscovery categories={categories} />
      <WhyABC ARONTONIO />
      <HowItWorks />
      <ServiceAreaMap />
      <HeroCTA />
    </div>
  )
}