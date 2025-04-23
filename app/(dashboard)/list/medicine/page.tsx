import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const medicines = [
  {
    name: "John Doe",
    photo: "https://e7.pngegg.com/pngimages/436/585/png-clipart-computer-icons-user-account-graphics-account-icon-vector-icons-silhouette.png",
    dob: "1950-06-10",
    medicine: "Paracetamol 500mg",
    time: "08:00 AM",
  },
  {
    name: "Jane Smith",
    photo: "https://e7.pngegg.com/pngimages/436/585/png-clipart-computer-icons-user-account-graphics-account-icon-vector-icons-silhouette.png",
    dob: "1945-03-22",
    medicine: "Amlodipine 10mg",
    time: "12:00 PM",
  },
  {
    name: "Michael Johnson",
    photo: "https://e7.pngegg.com/pngimages/436/585/png-clipart-computer-icons-user-account-graphics-account-icon-vector-icons-silhouette.png",
    dob: "1938-12-01",
    medicine: "Metformin 500mg",
    time: "06:00 PM",
  },
];

export default function MedicineDetailPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Medicine Details</h1>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Medicine</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines.map((resident, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Image
                    src={resident.photo}
                    alt={resident.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>{resident.name}</TableCell>
                <TableCell>{resident.dob}</TableCell>
                <TableCell>{resident.medicine}</TableCell>
                <TableCell>{resident.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
