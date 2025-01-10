'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ChevronDown, ChevronRight, PlusCircle, Edit, Plus } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  contact: string
  emergency: string
  roomNumber: string
  bedNumber: string
  floor: string
  allergies: string[]
  disease: string
  dietChart: any[] // Replace with proper type when available
}

const PatientDialog = ({ open, setOpen, editingPatient }: { open: boolean; setOpen: (open: boolean) => void; editingPatient: Patient | null }) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        {editingPatient ? 'Edit Patient' : 'Add Patient'}
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{editingPatient ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Patient Name</Label>
            <Input id="name" placeholder="Enter patient name" defaultValue={editingPatient?.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" placeholder="Enter age" defaultValue={editingPatient?.age} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" placeholder="Enter gender" defaultValue={editingPatient?.gender} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact">Contact</Label>
            <Input id="contact" placeholder="Enter contact number" defaultValue={editingPatient?.contact} />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Input id="allergies" placeholder="Enter allergies (comma separated)" defaultValue={editingPatient?.allergies.join(', ')} />
        </div>
        <Button onClick={() => setOpen(false)}>{editingPatient ? 'Save Changes' : 'Add Patient'}</Button>
      </div>
    </DialogContent>
  </Dialog>
)

const ExpandedRow = ({ patient }: { patient: Patient }) => (
  <TableRow>
    <TableCell colSpan={8}>
      <div className="p-4">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Additional Details</TabsTrigger>
            <TabsTrigger value="diet">Diet Plans</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Emergency Contact</Label>
                <div className="mt-1">{patient.emergency}</div>
              </div>
              <div>
                <Label>Floor</Label>
                <div className="mt-1">{patient.floor}</div>
              </div>
              <div>
                <Label>Allergies</Label>
                <div className="mt-1">
                  {patient.allergies.map((allergy, index) => (
                    <span key={index} className="inline-block bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm mr-2">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="diet" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Diet Plans</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Diet Plan
              </Button>
            </div>
            {patient.dietChart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No diet plans added yet</div>
            ) : (
              <div className="space-y-4">{/* Diet plans will be listed here */}</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </TableCell>
  </TableRow>
)

export default function PatientsPage() {
  const [open, setOpen] = useState(false)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)

  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      contact: '+1234567890',
      emergency: '+1987654321',
      roomNumber: '201',
      bedNumber: 'A',
      floor: '2',
      allergies: ['Peanuts', 'Shellfish'],
      disease: 'Diabetes',
      dietChart: [],
    },
  ])

  const toggleRow = (patientId: string) => {
    setExpandedRows((prev) => {
      const updated = new Set(prev)
      updated.has(patientId) ? updated.delete(patientId) : updated.add(patientId)
      return updated
    })
  }

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient)
    setOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Management</h1>
        <PatientDialog open={open} setOpen={setOpen} editingPatient={editingPatient} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Bed</TableHead>
            <TableHead>Disease</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <React.Fragment key={patient.id}>
              <TableRow>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => toggleRow(patient.id)}>
                    {expandedRows.has(patient.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.roomNumber}</TableCell>
                <TableCell>{patient.bedNumber}</TableCell>
                <TableCell>{patient.disease}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(patient)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              {expandedRows.has(patient.id) && <ExpandedRow patient={patient} />}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
