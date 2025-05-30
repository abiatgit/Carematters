import { DialogHeader } from '@/components/ui/dialog'
import {DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import React from 'react'

const CreateStaffForm = () => {
  return (
  
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>

  )
}

export default CreateStaffForm
