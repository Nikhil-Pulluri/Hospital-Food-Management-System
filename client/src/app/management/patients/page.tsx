'use client'

import { useState, useEffect } from 'react'
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

const PatientDialog = ({ open, setOpen, editingPatient, onSave }: { open: boolean; setOpen: (open: boolean) => void; editingPatient: Patient | null; onSave: (patient: Patient) => void }) => {
  const [formData, setFormData] = useState<Partial<Patient>>({})

  useEffect(() => {
    if (editingPatient) {
      setFormData(editingPatient)
    } else {
      setFormData({})
    }
  }, [editingPatient])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'age' ? parseInt(value) || '' : value, // Convert age to a number
    }))
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/patients`, {
        method: editingPatient ? 'PUT' : 'POST', // Use PUT for editing, POST for adding
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Sending the form data to the backend
      })

      if (!response.ok) {
        throw new Error('Failed to save patient data')
      }

      // Handle success (e.g., close dialog, reset form)
      setOpen(false)
      setFormData({}) // Reset form after saving
    } catch (error) {
      console.error(error)
      // Handle error (e.g., show error message)
    }
  }

  return (
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
              <Input id="name" placeholder="Enter patient name" value={formData.name || ''} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" min="1" max="120" placeholder="Enter age" value={formData.age || ''} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <select id="gender" value={formData.gender || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange(e)} className="px-3 py-2 border rounded">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" type="tel" placeholder="Enter contact number" value={formData.contact || ''} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="emergency">Emergency Contact</Label>
              <Input id="emergency" type="tel" placeholder="Enter emergency contact number" value={formData.emergency || ''} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input id="roomNumber" placeholder="Enter room number" value={formData.roomNumber || ''} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bedNumber">Bed Number</Label>
              <Input id="bedNumber" placeholder="Enter bed number" value={formData.bedNumber || ''} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="floor">Floor</Label>
              <Input id="floor" placeholder="Enter floor" value={formData.floor || ''} onChange={handleInputChange} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Input
              id="allergies"
              placeholder="Enter allergies (comma separated)"
              value={formData.allergies?.join(', ') || ''}
              onChange={(e) => {
                const allergies = e.target.value.split(',').map((item) => item.trim())
                setFormData((prev) => ({ ...prev, allergies }))
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="disease">Disease</Label>
            <Input id="disease" placeholder="Enter disease" value={formData.disease || ''} onChange={handleInputChange} />
          </div>
          <Button onClick={handleSave}>{editingPatient ? 'Save Changes' : 'Add Patient'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// const ExpandedRow = ({ patient }: { patient: Patient }) => (
//   <TableRow>
//     <TableCell colSpan={8}>
//       <div className="p-4">
//         <Tabs defaultValue="details">
//           <TabsList>
//             <TabsTrigger value="details">Additional Details</TabsTrigger>
//             <TabsTrigger value="diet">Diet Plans</TabsTrigger>
//           </TabsList>
//           <TabsContent value="details" className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>Emergency Contact</Label>
//                 <div className="mt-1">{patient.emergency}</div>
//               </div>
//               <div>
//                 <Label>Floor</Label>
//                 <div className="mt-1">{patient.floor}</div>
//               </div>
//               <div>
//                 <Label>Allergies</Label>
//                 <div className="mt-1">
//                   {patient.allergies.map((allergy, index) => (
//                     <span key={index} className="inline-block bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm mr-2">
//                       {allergy}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </TabsContent>
//           <TabsContent value="diet" className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold">Diet Plans</h3>
//               <Button size="sm">
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Diet Plan
//               </Button>
//             </div>
//             {patient.dietChart.length === 0 ? (
//               <div className="text-center py-8 text-muted-foreground">No diet plans added yet</div>
//             ) : (
//               <div className="space-y-4">{/* Diet plans will be listed here */}</div>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </TableCell>
//   </TableRow>
// )

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
              <div className="space-y-4">
                {patient.dietChart.map((diet, index) => (
                  <div key={diet.id} className="p-4 border border-muted rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-bold">Morning</Label>
                        <div>{diet.morning}</div>
                      </div>
                      <div>
                        <Label className="font-bold">Evening</Label>
                        <div>{diet.evening}</div>
                      </div>
                      <div>
                        <Label className="font-bold">Night</Label>
                        <div>{diet.night}</div>
                      </div>
                      {diet.notes && (
                        <div className="col-span-2">
                          <Label className="font-bold">Notes</Label>
                          <div>{diet.notes}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
  const [patients, setPatients] = useState<Patient[]>([])

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

  useEffect(() => {
    // Fetch patients from the backend
    fetch(`${backendUrl}/patients`)
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error(error))
  }, [])

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

  const handleSave = (patient: Patient) => {
    if (patient.id) {
      // Update patient
      fetch(`/patients/${patient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      })
        .then(() => {
          setPatients((prev) => prev.map((p) => (p.id === patient.id ? patient : p)))
        })
        .catch((error) => console.error(error))
    } else {
      // Add new patient
      fetch('/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      })
        .then((response) => response.json())
        .then((data) => setPatients((prev) => [...prev, data]))
        .catch((error) => console.error(error))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Patient Management</h1>
        <PatientDialog open={open} setOpen={setOpen} editingPatient={editingPatient} onSave={handleSave} />
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
