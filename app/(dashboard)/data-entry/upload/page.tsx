'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { mockUploadedDocuments, sampleExtractedData } from '@/lib/data/mock-reports'
import { formatDate, formatFileSize, formatConfidence } from '@/lib/utils/formatters'
import {
  CloudArrowUp,
  FilePdf,
  FileXls,
  FileCsv,
  Image,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Trash,
  Check,
  X,
  Sparkle,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const statusConfig = {
  processing: { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted', label: 'Processing' },
  extracted: { icon: CheckCircle, color: 'text-warning', bg: 'bg-warning/10', label: 'Needs Review' },
  verified: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10', label: 'Verified' },
  error: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Error' },
}

const fileTypeIcons = {
  pdf: FilePdf,
  excel: FileXls,
  csv: FileCsv,
  image: Image,
}

export default function DocumentUploadPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<string | null>('doc-003')
  const [isExtracting, setIsExtracting] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Simulate upload
    setIsExtracting(true)
    setTimeout(() => setIsExtracting(false), 3000)
  }

  const selectedDocument = mockUploadedDocuments.find((d) => d.id === selectedDoc)

  return (
    <div className="min-h-screen">
      <Header
        title="Document Upload"
        description="Upload documents for AI-powered data extraction"
      />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div className="space-y-6">
            {/* Drop Zone */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    'border-2 border-dashed rounded p-8 text-center transition-colors',
                    isDragging ? 'border-primary bg-primary/5' : 'border-border',
                    isExtracting && 'pointer-events-none'
                  )}
                >
                  {isExtracting ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center">
                        <Sparkle className="w-12 h-12 text-primary animate-pulse" weight="fill" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Extracting Data...</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          AI is analyzing your document
                        </p>
                      </div>
                      <Progress value={66} className="w-48 mx-auto" />
                    </div>
                  ) : (
                    <>
                      <CloudArrowUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm font-medium text-foreground mb-1">
                        Drop files here or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        PDF, Excel, CSV, or images up to 10MB
                      </p>
                      <Button variant="outline" size="sm">
                        Browse Files
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Document List */}
            <Card className="border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Uploaded Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin">
                  {mockUploadedDocuments.map((doc) => {
                    const status = statusConfig[doc.status]
                    const StatusIcon = status.icon
                    const FileIcon = fileTypeIcons[doc.type]
                    const isSelected = selectedDoc === doc.id

                    return (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDoc(doc.id)}
                        className={cn(
                          'w-full flex items-center gap-3 p-3 rounded border text-left transition-colors',
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:bg-muted/50'
                        )}
                      >
                        <div className="p-1.5 rounded bg-muted">
                          <FileIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(doc.size)} - {formatDate(doc.uploadedAt, 'relative')}
                          </p>
                        </div>
                        <div className={cn('flex items-center gap-1 px-1.5 py-0.5 rounded', status.bg)}>
                          <StatusIcon className={cn('w-3 h-3', status.color)} weight="fill" />
                          <span className={cn('text-[10px] font-medium', status.color)}>
                            {status.label}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Extraction Preview */}
          <Card className="border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Extraction Preview</CardTitle>
                {selectedDocument && selectedDocument.status === 'extracted' && (
                  <Badge variant="secondary" className="text-xs">
                    Needs Review
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedDocument ? (
                <div className="space-y-4">
                  {/* Document Info */}
                  <div className="p-3 bg-muted rounded">
                    <p className="text-sm font-medium text-foreground">{selectedDocument.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Uploaded {formatDate(selectedDocument.uploadedAt, 'long')}
                    </p>
                  </div>

                  {selectedDocument.status === 'error' ? (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded">
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-destructive flex-shrink-0" weight="fill" />
                        <div>
                          <p className="text-sm font-medium text-destructive">Extraction Failed</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {selectedDocument.errorMessage}
                          </p>
                          <Button size="sm" variant="outline" className="mt-3">
                            Retry Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : selectedDocument.status === 'processing' ? (
                    <div className="p-8 text-center">
                      <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3 animate-pulse" />
                      <p className="text-sm text-muted-foreground">Processing document...</p>
                    </div>
                  ) : (
                    <>
                      {/* Extracted Fields */}
                      <div className="space-y-3">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Extracted Fields
                        </p>
                        {(selectedDocument.extractedData || sampleExtractedData).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-muted/50 border border-border rounded"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-muted-foreground">{item.field}</p>
                              <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
                              {item.suggestedCategory && (
                                <Badge variant="outline" className="text-[10px] mt-1">
                                  {item.suggestedCategory}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  'text-xs px-1.5 py-0.5 rounded',
                                  item.confidence >= 0.9
                                    ? 'bg-success/10 text-success'
                                    : item.confidence >= 0.7
                                      ? 'bg-warning/10 text-warning'
                                      : 'bg-muted text-muted-foreground'
                                )}
                              >
                                {Math.round(item.confidence * 100)}%
                              </span>
                              {item.isVerified ? (
                                <CheckCircle className="w-4 h-4 text-success" weight="fill" />
                              ) : (
                                <div className="flex items-center gap-1">
                                  <button className="p-1 hover:bg-success/10 rounded transition-colors">
                                    <Check className="w-4 h-4 text-success" />
                                  </button>
                                  <button className="p-1 hover:bg-destructive/10 rounded transition-colors">
                                    <X className="w-4 h-4 text-destructive" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-4 border-t border-border">
                        <Button className="flex-1">Approve & Import</Button>
                        <Button variant="outline">Edit Values</Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Eye className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Select a document to preview extracted data
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
