'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ChevronDown, ChevronRight, PlusCircle, ClipboardList } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

interface PantryStaff {
  id: string
  name: string
  contact: string
  location: string
  tasks: PantryTask[]
}

interface PantryTask {
  id: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  assignedAt: Date
  pantryStaffId: string
  dietChart?: {
    id: string
    patientId: string
    morning: string
    evening: string
    night: string
    notes?: string
    patient: {
      name: string
      roomNumber: string
    }
    mealStatus: {
      morning: 'pending' | 'in-progress' | 'completed'
      evening: 'pending' | 'in-progress' | 'completed'
      night: 'pending' | 'in-progress' | 'completed'
    }
  }
}

export default function PantryStaffPage() {
  const [open, setOpen] = useState(false)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [assignTaskOpen, setAssignTaskOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<PantryStaff | null>(null)

  // Mock data - replace with actual data fetching
  const [staffMembers] = useState<PantryStaff[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      contact: '+1234554090',
      location: 'Main Kitchen',
      tasks: [
        {
          id: '1',
          description: 'Prepare breakfast for Room 201',
          status: 'in-progress',
          assignedAt: new Date(),
          pantryStaffId: '1',
          dietChart: {
            id: '1',
            patientId: '1',
            morning: 'Oatmeal with fruits, whole grain toast',
            evening: 'Grilled chicken with vegetables',
            night: 'Soup with bread',
            mealStatus: {
              morning: 'in-progress',
              evening: 'pending',
              night: 'completed',
            },
            patient: {
              name: 'John Doe',
              roomNumber: '201',
            },
          },
        },
        {
          id: '2',
          description: 'Prepare breakfast for Room 301',
          status: 'in-progress',
          assignedAt: new Date(),
          pantryStaffId: '1',
          dietChart: {
            id: '1',
            patientId: '1',
            morning: 'Oatmeal with fruits, whole grain toast',
            evening: 'Grilled chicken with vegetables',
            night: 'Soup with bread',
            mealStatus: {
              morning: 'in-progress',
              evening: 'pending',
              night: 'completed',
            },
            patient: {
              name: 'John Doe',
              roomNumber: '01',
            },
          },
        },
      ],
    },

    {
      id: '2',
      name: 'Sarah Johnson',
      contact: '+1234567890',
      location: 'Main Kitchen',
      tasks: [
        {
          id: '2',
          description: 'Prepare breakfast for Room 201',
          status: 'in-progress',
          assignedAt: new Date(),
          pantryStaffId: '1',
          dietChart: {
            id: '2',
            patientId: '2',
            morning: 'Oatmeal with fruits, whole grain toast',
            evening: 'Grilled chicken with vegetables',
            night: 'Soup with bread',
            mealStatus: {
              morning: 'in-progress',
              evening: 'pending',
              night: 'completed',
            },
            patient: {
              name: 'John Doe',
              roomNumber: '201',
            },
          },
        },
      ],
    },
  ])

  const toggleRow = (staffId: string) => {
    const newExpandedRows = new Set(expandedRows)
    if (expandedRows.has(staffId)) {
      newExpandedRows.delete(staffId)
    } else {
      newExpandedRows.add(staffId)
    }
    setExpandedRows(newExpandedRows)
  }

  const getStatusBadge = (status: 'pending' | 'in-progress' | 'completed') => {
    const variants: Record<'pending' | 'in-progress' | 'completed', 'secondary' | 'destructive' | 'default'> = {
      pending: 'secondary',
      'in-progress': 'destructive',
      completed: 'default',
    }
    return <Badge variant={variants[status]}>{status}</Badge>
  }

  const handleAssignTask = (staff: PantryStaff) => {
    setSelectedStaff(staff)
    setAssignTaskOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Pantry Staff Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <input
                  id="name"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter staff name"
                />
              </div>
              <Button onClick={() => setOpen(false)}>Add Staff Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Active Tasks</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffMembers.map((staff, index) => (
            <React.Fragment key={staff.id}>
              {/* Use staff.id for the main row */}
              <TableRow>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => toggleRow(staff.id)}>
                    {expandedRows.has(staff.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.location}</TableCell>
                <TableCell>{staff.contact}</TableCell>
                <TableCell>{staff.tasks.length} tasks</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleAssignTask(staff)}>
                    <ClipboardList className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              {expandedRows.has(staff.id) && (
                <TableRow key={`expanded-${staff.id}`}>
                  <TableCell colSpan={6}>
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Assigned Tasks</h3>
                      </div>
                      <div className="space-y-4">
                        {staff.tasks.map((task) => (
                          <div key={task.id} className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{task.description}</h4>
                                {task.dietChart && (
                                  <p className="text-sm text-muted-foreground">
                                    Patient: {task.dietChart.patient.name} (Room {task.dietChart.patient.roomNumber})
                                  </p>
                                )}
                              </div>
                              {getStatusBadge(task.status)}
                            </div>
                            {task.dietChart && (
                              <div className="grid grid-cols-3 gap-4 mt-2">
                                <div>
                                  <Label className="text-sm">Morning</Label>
                                  <p className="text-sm mt-1">{task.dietChart.morning}</p>
                                  {getStatusBadge(task.dietChart.mealStatus.morning)}
                                </div>
                                <div>
                                  <Label className="text-sm">Evening</Label>
                                  <p className="text-sm mt-1">{task.dietChart.evening}</p>
                                  {getStatusBadge(task.dietChart.mealStatus.evening)}
                                </div>
                                <div>
                                  <Label className="text-sm">Night</Label>
                                  <p className="text-sm mt-1">{task.dietChart.night}</p>
                                  {getStatusBadge(task.dietChart.mealStatus.night)}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        {staff.tasks.length === 0 && <div className="text-center py-8 text-muted-foreground">No tasks assigned</div>}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      <Dialog open={assignTaskOpen} onOpenChange={setAssignTaskOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Task to {selectedStaff?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Diet Chart</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a diet chart" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">John Doe - Room 201 (Morning)</SelectItem>
                  <SelectItem value="2">Jane Smith - Room 302 (Evening)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Additional Instructions</Label>
              <Textarea placeholder="Enter any additional instructions for the task" />
            </div>
            <Button onClick={() => setAssignTaskOpen(false)}>Assign Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
