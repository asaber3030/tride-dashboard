import AppLogo from "@/components/common/logo"
import routes from "@/lib/routes"

export const SidebarHeader = () => {
  return (
    <div className='mx-auto max-w-[100px] w-fit mb-4'>
      <AppLogo href={routes.home} width={40} height={40} />
    </div>
  )
}
