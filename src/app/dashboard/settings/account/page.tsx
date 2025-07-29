import { AccountChangePasswordForm } from "../_components/change-password-form"
import { AccountChangePictureForm } from "../_components/change-picture-form"
import { AccountSettingsForm } from "../_components/personal-info-form"

export default function AccountSettingsPage() {
  return (
    <div className='space-y-8'>
      <AccountChangePictureForm />
      <AccountSettingsForm />
      <AccountChangePasswordForm />
    </div>
  )
}
