'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CloudArrowUp,
  PencilSimple,
  FileText,
  ChatCircle,
  ArrowRight,
} from '@phosphor-icons/react'

const actions = [
  {
    name: 'Upload Documents',
    description: 'Upload utility bills, invoices, or logs',
    href: '/data-entry/upload',
    icon: CloudArrowUp,
  },
  {
    name: 'Manual Entry',
    description: 'Add activity data manually',
    href: '/data-entry/manual',
    icon: PencilSimple,
  },
  {
    name: 'Generate Report',
    description: 'Create GHG inventory report',
    href: '/reports',
    icon: FileText,
  },
  {
    name: 'Ask AI',
    description: 'Query your emissions data',
    href: '/insights/chat',
    icon: ChatCircle,
  },
]

export function QuickActions() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="group flex flex-col p-3 rounded border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded bg-muted group-hover:bg-primary/10 transition-colors">
                  <action.icon className="w-4 h-4 text-primary" />
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm font-medium text-foreground">{action.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
