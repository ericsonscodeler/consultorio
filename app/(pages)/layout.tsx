import { Header } from '../components/Header/index'
import { Sidebar } from '../components/Sidebar/index'

const PagesLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="d-flex flex-row">
      <Sidebar />
      <div className="d-flex flex-column w-100">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  )
}

export default PagesLayout
