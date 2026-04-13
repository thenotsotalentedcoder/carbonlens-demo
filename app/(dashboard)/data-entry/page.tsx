import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockUploadedDocuments } from '@/lib/data/mock-reports'
import { formatDate, formatFileSize } from '@/lib/utils/formatters'
import {
  CloudArrowUp,
  PencilSimple,
  FileText,
  FileCsv,
  FileXls,
  FilePdf,
  Image,
  ArrowRight,
  CheckCircle,
  Clock,
  Warning,
  XCircle,
} from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

const statusConfig = {
  processing: {
    icon: Clock,
    color: 'text-muted-foreground',
    bg: 'bg-muted',
    label: 'Processing',
  },
  extracted: {
    icon: CheckCircle,
    color: 'text-warning',
    bg: 'bg-warning/10',
    label: 'Needs Review',
  },
  verified: {
    icon: CheckCircle,
    color: 'text-success',
    bg: 'bg-success/10',
    label: 'Verified',
  },
  error: {
    icon: XCircle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    label: 'Error',
  },
}

const fileTypeIcons = {
  pdf: FilePdf,
  excel: FileXls,
  csv: FileCsv,
  image: Image,
}

export default function DataEntryPage() {
  const recentDocuments = mockUploadedDocuments.slice(0, 5)
  const pendingReview = mockUploadedDocuments.filter((d) => d.status === 'extracted').length
  const verified = mockUploadedDocuments.filter((d) => d.status === 'verified').length

  return (
    <div className="min-h-screen">
      <Header
        title="Data Entry"
        description="Upload documents or manually enter activity data"
      />

      <div className="p-6">
        {/* Entry Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Document Upload Card */}
          <Link href="/dashboard/data-entry/upload">
            <Card className="group border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <CloudArrowUp className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-foreground">Document Upload</h3>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Upload utility bills, fuel logs, invoices, or travel records. 
                      Our AI will automatically extract relevant data.
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1.5">
                        <FilePdf className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">PDF</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileXls className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Excel</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileCsv className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">CSV</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Image className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Images</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Manual Entry Card */}
          <Link href="/dashboard/data-entry/manual">
            <Card className="group border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <PencilSimple className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-foreground">Manual Entry</h3>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Enter activity data directly using structured forms. 
                      Includes unit conversion helpers and proxy data suggestions.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      <Badge variant="outline" className="text-xs">Fuel Consumption</Badge>
                      <Badge variant="outline" className="text-xs">Electricity</Badge>
                      <Badge variant="outline" className="text-xs">Travel</Badge>
                      <Badge variant="outline" className="text-xs">Waste</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-border">
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground">Total Documents</p>
              <p className="text-2xl font-semibold text-foreground mt-1">
                {mockUploadedDocuments.length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="text-2xl font-semibold text-warning mt-1">{pendingReview}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground">Verified</p>
              <p className="text-2xl font-semibold text-success mt-1">{verified}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="py-4">
              <p className="text-sm text-muted-foreground">Data Completeness</p>
              <p className="text-2xl font-semibold text-foreground mt-1">87%</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Documents */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium">Recent Documents</CardTitle>
              <Link
                href="/dashboard/data-entry/upload"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDocuments.map((doc) => {
                const status = statusConfig[doc.status]
                const StatusIcon = status.icon
                const FileIcon = fileTypeIcons[doc.type]

                return (
                  <div
                    key={doc.id}
                    className="flex items-center gap-4 p-3 rounded border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-2 rounded bg-muted">
                      <FileIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(doc.size)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(doc.uploadedAt, 'relative')}
                        </span>
                      </div>
                    </div>
                    <div className={cn('flex items-center gap-1.5 px-2 py-1 rounded', status.bg)}>
                      <StatusIcon className={cn('w-3.5 h-3.5', status.color)} weight="fill" />
                      <span className={cn('text-xs font-medium', status.color)}>{status.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
