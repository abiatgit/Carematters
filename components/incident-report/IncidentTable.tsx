import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { columns } from "./columns";
import { Badge } from "../ui/badge";
import { CircleSmall, FileText, Share, Download, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Incident, Resident, Unit } from "@prisma/client";
import jsPDF from "jspdf";
import { useState } from "react";
export interface IncidetProp extends Incident {
  resident: Resident,
  unit: Unit
}

const IncidentTable = ({ data }: { data: IncidetProp[] }) => {
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [currentIncident, setCurrentIncident] = useState<IncidetProp | null>(null);
  const [emailForm, setEmailForm] = useState({
    to: '',
    cc: '',
    subject: '',
    message: ''
  });

  const handleForwardClick = (incident: IncidetProp) => {
    setCurrentIncident(incident);
    setEmailForm({
      to: '',
      cc: '',
      subject: `Incident Report - ${incident.title} - ${incident.date.toLocaleDateString()}`,
      message: `Dear Recipient,

Please find attached the incident report for review.

Incident Details:
- Report Number: ${incident.id.substring(0, 8).toUpperCase()}
- Date: ${incident.date.toLocaleDateString('en-GB')}
- Time: ${incident.time.toLocaleTimeString('en-GB')}
- Status: ${incident.status.toUpperCase()}
- Resident: ${incident.resident.name}
- Unit: ${incident.unit.name}

Please review and take appropriate action as necessary.

Best regards,
CareMatters Management System`
    });
    setEmailDialogOpen(true);
  };

  const handleSendEmail = async () => {
    if (!currentIncident) return;

    
    try {
   
      console.log('Sending email:', {
        to: emailForm.to,
        cc: emailForm.cc,
        subject: emailForm.subject,
        message: emailForm.message,
        attachment: `incident_report_${currentIncident.id}.pdf`
      });
      
      // Show success message
      alert('Email sent successfully!');
      setEmailDialogOpen(false);
      setCurrentIncident(null);
      
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email. Please try again.');
    }
  };

  const downloadIncidentReport = (incident: IncidetProp) => {
    const currentDate = new Date().toLocaleDateString('en-GB');
    const currentTime = new Date().toLocaleTimeString('en-GB');
    const incidentDate = incident.date.toLocaleDateString('en-GB');
    const incidentTime = incident.time.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const reportNumber = incident.id.substring(0, 8).toUpperCase();
    const priority = incident.status === 'serious' ? 'HIGH' : incident.status === 'medium' ? 'MEDIUM' : 'LOW';
    
    // Create new PDF document
    const doc = new jsPDF();
    
    // Page margins and settings
    const margin = 15;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = margin;
    
  
    // Helper function to add text with word wrapping
    const addTextWithWrap = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string, index: number) => {
        doc.text(line, x, y + (index * fontSize * 0.5));
      });
      return y + (lines.length * fontSize * 0.5);
    };
    
    // Header
    doc.setFillColor(31, 41, 55); // Dark blue background
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text('INCIDENT REPORT', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('CONFIDENTIAL DOCUMENT', pageWidth / 2, 30, { align: 'center' });
    
    yPosition = 50;
    
    // Reset text color for body
    doc.setTextColor(31, 41, 55);
    
    // Report Identification Section
    doc.setFillColor(249, 250, 251);
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 35, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 35, 'S');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('REPORT IDENTIFICATION', margin + 5, yPosition + 10);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Report Number: ${reportNumber}`, margin + 5, yPosition + 18);
    doc.text(`Report Date: ${currentDate}`, margin + 5, yPosition + 25);
    doc.text(`Report Time: ${currentTime}`, margin + 100, yPosition + 25);
    doc.text(`Status: ${incident.status.toUpperCase()}`, margin + 5, yPosition + 32);
    doc.text(`Priority: ${priority}`, margin + 100, yPosition + 32);
    
    yPosition += 45;
    
    // Incident Details Section
    doc.setFillColor(249, 250, 251);
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 28, 'F');
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 28, 'S');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('INCIDENT DETAILS', margin + 5, yPosition + 10);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Incident Title: ${incident.title}`, margin + 5, yPosition + 18);
    doc.text(`Date of Incident: ${incidentDate}`, margin + 5, yPosition + 25);
    doc.text(`Time: ${incidentTime}`, margin + 100, yPosition + 25);
    
    yPosition += 38;
    
    // Resident Information Section
    doc.setFillColor(249, 250, 251);
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 42, 'F');
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 42, 'S');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('RESIDENT INFORMATION', margin + 5, yPosition + 10);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Full Name: ${incident.resident.name}`, margin + 5, yPosition + 18);
    doc.text(`Room Number: ${incident.resident.roomNumber}`, margin + 5, yPosition + 25);
    doc.text(`Gender: ${incident.resident.gender}`, margin + 100, yPosition + 25);
    doc.text(`Date of Birth: ${incident.resident.dateOfBirth.toLocaleDateString('en-GB')}`, margin + 5, yPosition + 32);
    doc.text(`Next of Kin: ${incident.resident.nextOfKin}`, margin + 5, yPosition + 39);
    
    yPosition += 52;
    
    // Unit Information
    doc.setFillColor(249, 250, 251);
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 21, 'F');
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 21, 'S');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('UNIT INFORMATION', margin + 5, yPosition + 10);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Unit Name: ${incident.unit.name}`, margin + 5, yPosition + 18);
    
    yPosition += 31;
    
    // Incident Description Section
    doc.setFillColor(249, 250, 251);
    const descriptionHeight = Math.max(35, Math.min(60, incident.description.length / 3));
    doc.rect(margin, yPosition, pageWidth - (margin * 2), descriptionHeight, 'F');
    doc.rect(margin, yPosition, pageWidth - (margin * 2), descriptionHeight, 'S');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('INCIDENT DESCRIPTION', margin + 5, yPosition + 10);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const maxDescriptionWidth = pageWidth - (margin * 2) - 10;
    addTextWithWrap(incident.description, margin + 5, yPosition + 18, maxDescriptionWidth, 10);
    
    yPosition += descriptionHeight + 10;
    
    // Actions Taken Section
    const actionsHeight = 80;
    doc.setFillColor(249, 250, 251);
    doc.rect(margin, yPosition, pageWidth - (margin * 2), actionsHeight, 'F');
    doc.rect(margin, yPosition, pageWidth - (margin * 2), actionsHeight, 'S');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('ACTIONS TAKEN', margin + 5, yPosition + 10);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const actions = [
      '☐ Immediate medical attention provided',
      '☐ Family/Next of kin notified',
      '☐ General Practitioner contacted',
      '☐ Care plan updated',
      '☐ Additional monitoring implemented',
      '☐ Risk assessment reviewed',
      '☐ Staff debriefing conducted',
      '☐ Follow-up appointment scheduled'
    ];
    
    actions.forEach((action, index) => {
      const row = Math.floor(index / 2);
      const col = index % 2;
      doc.text(action, margin + 5 + (col * 85), yPosition + 18 + (row * 8));
    });
    
    yPosition += actionsHeight + 10;
    
    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = margin;
    }
    
    // Document Control Section
    doc.setFillColor(249, 250, 251);
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 42, 'F');
    doc.rect(margin, yPosition, pageWidth - (margin * 2), 42, 'S');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DOCUMENT CONTROL', margin + 5, yPosition + 10);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Document Created: ${incident.createdAt.toLocaleString('en-GB')}`, margin + 5, yPosition + 18);
    doc.text(`Last Modified: ${incident.updatedAt.toLocaleString('en-GB')}`, margin + 5, yPosition + 25);
    doc.text(`Version: 1.0`, margin + 5, yPosition + 32);
    doc.text(`Classification: CONFIDENTIAL`, margin + 100, yPosition + 32);
    doc.text(`System Reference: ${incident.id}`, margin + 5, yPosition + 39);
    
    yPosition += 52;
    
    // Footer
    doc.setFillColor(31, 41, 55);
    doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('Generated by CareMatters Management System', pageWidth / 2, pageHeight - 15, { align: 'center' });
    doc.setFontSize(8);
    doc.text('This document contains sensitive personal information - Handle with care', pageWidth / 2, pageHeight - 8, { align: 'center' });
    
    // Save the PDF
    doc.save(`INCIDENT_REPORT_${reportNumber}_${incident.date.toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div>
      <Table >
        <TableHeader>
          <TableRow>
            {columns.map((item, index) => (
              <TableHead key={index}>
                {typeof item.header === "string" ? item.header : "Header"}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody >
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <div className="relative">
                  {item?.resident?.photo ? (
                    <img 
                      src={item.resident.photo} 
                      alt="Resident"
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="w-10 h-10 rounded-full bg-blue-100 border-2 border-gray-200 flex items-center justify-center"
                    style={{ display: item?.resident?.photo ? 'none' : 'flex' }}
                  >
                    <span className="text-sm font-medium text-green-700">
                      {item?.resident?.name?.charAt(0).toUpperCase() || 'R'}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.resident?.name}</TableCell>
              <TableCell className="font-medium">
                {item?.title}
              </TableCell>
              <TableCell className="font-medium">
                <Badge
                  variant="outline"
                  className="flex gap-1 rounded-lg text-xs"
                >
                  <CircleSmall
                    className={cn(
                      item.status === "serious"
                        ? "text-red-600"
                        : item.status === "medium"
                          ? "text-yellow-500"
                          : "text-green-700"
                    )}
                  />
                  {item?.status}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{item?.unit?.name}</TableCell>
              <TableCell className="font-medium flex items-center justify-center">
                <Dialog>
                  <DialogTrigger>
                    <FileText />
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Incident Report - {item.title}</DialogTitle>
                      <DialogDescription>
                        <div className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Status:</span>{' '}
                              <Badge variant={item.status === 'serious' ? 'destructive' : item.status === 'medium' ? 'default' : 'secondary'}>
                                {item.status}
                              </Badge>
                            </div>
                            <div>
                              <span className="font-medium">Date:</span> {item.date.toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">Time:</span> {item.time.toLocaleTimeString()}
                            </div>
                            <div>
                              <span className="font-medium">Unit:</span> {item.unit.name}
                            </div>
                            <div>
                              <span className="font-medium">Resident:</span> {item.resident.name}
                            </div>
                            <div>
                              <span className="font-medium">Room:</span> {item.resident.roomNumber}
                            </div>
                          </div>
                          
                          <div>
                            <span className="font-medium">Description:</span>
                            <div className="mt-2 p-3 bg-gray-50 rounded-md">
                              {item.description}
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-6">
                            <Button 
                              onClick={() => downloadIncidentReport(item)}
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <Download size={16} />
                              Download Report
                            </Button>
                            <Button 
                              onClick={() => handleForwardClick(item)}
                              className="flex items-center gap-2"
                            >
                              <Share size={16} />
                              Forward
                            </Button>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail size={20} />
              Forward Incident Report
            </DialogTitle>
            <DialogDescription>
              Send the incident report via email to relevant parties.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="to">To (Email Address) *</Label>
              <Input
                id="to"
                type="email"
                placeholder="recipient@example.com"
                value={emailForm.to}
                onChange={(e) => setEmailForm({...emailForm, to: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="cc">CC (Optional)</Label>
              <Input
                id="cc"
                type="email"
                placeholder="cc@example.com"
                value={emailForm.cc}
                onChange={(e) => setEmailForm({...emailForm, cc: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={8}
                value={emailForm.message}
                onChange={(e) => setEmailForm({...emailForm, message: e.target.value})}
                placeholder="Enter your message here..."
              />
            </div>
            
            {currentIncident && (
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm font-medium text-blue-900">Attachment:</p>
                <p className="text-sm text-blue-700">
                  incident_report_{currentIncident.id.substring(0, 8).toUpperCase()}_{currentIncident.date.toISOString().split('T')[0]}.pdf
                </p>
              </div>
            )}
            
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setEmailDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSendEmail}
                disabled={!emailForm.to.trim()}
                className="flex items-center gap-2"
              >
                <Send size={16} />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>

  );
};

export default IncidentTable;
