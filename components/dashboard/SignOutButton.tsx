'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SignOutButtonProps {
  className?: string
  fullWidth?: boolean
}

export function SignOutButton({ className, fullWidth }: SignOutButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => signOut({ callbackUrl: '/' })}
      className={cn(fullWidth && 'w-full', className)}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Sign out
    </Button>
  )
}

