
import Header from './Header'
import BottomNav from '../common/BottomNav'

export default function AppLayout({
  children,
  activeTab = 'home',
  onNavigate,
  showHeader = true,
  showBottomNav = true,
}) {
  return (
    <div className="min-h-screen bg-[#E8E1D4]">

      <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-[#F7F2E8] pb-28 shadow-[0_10px_45px_rgba(0,0,0,0.10)]">

        {showHeader && <Header />}

        <main>
          {children}
        </main>

        {showBottomNav && (
          <BottomNav
            activeTab={activeTab}
            onNavigate={onNavigate}
          />
        )}

      </div>

    </div>
  )
}
