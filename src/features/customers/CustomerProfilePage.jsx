import { ContactRound } from 'lucide-react'
import { useParams } from 'react-router-dom'
import PagePlaceholder from '../../components/ui/PagePlaceholder'

function CustomerProfilePage() {
  const { id } = useParams()

  return (
    <PagePlaceholder
      title="Customer Profile"
      description="Detailed customer information and analysis will appear here."
    >
      <div className="flex items-center gap-3 text-slate-500">
        <ContactRound aria-hidden="true" size={22} />
        <p className="text-sm">Profile placeholder for customer reference: {id}</p>
      </div>
    </PagePlaceholder>
  )
}

export default CustomerProfilePage
