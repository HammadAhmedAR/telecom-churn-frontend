import { Target } from 'lucide-react'
import PagePlaceholder from '../../components/ui/PagePlaceholder'

function RetentionPage() {
  return (
    <PagePlaceholder
      title="Retention Actions"
      description="Recommended retention actions and follow-up workflows will appear here."
    >
      <div className="flex items-center gap-3 text-slate-500">
        <Target aria-hidden="true" size={22} />
        <p className="text-sm">Retention tools will be added in a later stage.</p>
      </div>
    </PagePlaceholder>
  )
}

export default RetentionPage
