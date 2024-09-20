import React from 'react'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from './ui/table'
import { Badge } from './ui/badge'

const allAppliedJobs = [1,2,3,4,5,6,7,8];
function AppliedJobTable() {
  return (
    <div>
        <Table>
            <TableCaption>A list of your applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Staus</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJobs.length <= 0 ?<span>You haven't applied any job yet.</span> : allAppliedJobs.map((index, appliedJob) => (
                        <TableRow key={index}>
                            <TableCell>18-09-2024</TableCell>
                            <TableCell>Softwere Engineer</TableCell>
                            <TableCell>Google</TableCell>
                            <TableCell className="text-right"><Badge className="bg-green-400">Selected.</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>      
    </div>
  )
}

export default AppliedJobTable
