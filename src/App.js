import React, { useState } from 'react';
import jsPDF from 'jspdf';
import logo from './image/LOGO.png'; 
import paid from './image/paid.png'; 
import stamp from './image/seal.png';
import 'jspdf-autotable';
import './App.css';
import termsPage1 from './image/terms1.png';
import termsPage2 from './image/terms2.png';
import headerimg from './image/header.png';
import docheader from './image/header2.png';


const ResidentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    modeOfPayment: 'Cash',
    amount: '',
    dateOfPayment: '',
    overstandingDues: '',
    sharing: 'Single',
    rentMonth: 'Ongoing',
    receiptType: 'Rent', 
    tenure:'',
    roomNo: "",
    fatherName: "",
    age: "",
    address: "",
    contactNo: "",
    dateOfAdmission: "",
    agreementPeriod: "",
    occupation:"",
    otherDetails:"",
    recommendedBy: "",
    advanceDeposit: "",
    guardianNo: "",
    healthIssues: "No",
    healthDetails: "",
    paymentDate: "",
    photos: [],
    aadhaars: [],
    proofFiles: [],
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
  
    if (["photos", "aadhaars", "proofFiles"].includes(name)) {
      const newFiles = [];
  
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          newFiles.push({ data: reader.result, type: file.type });
  
          if (newFiles.length === files.length) {
            setFormData((prev) => ({
              ...prev,
              [name]: newFiles,
            }));
          }
        };
      });
    }
  };
  

  const calculateEndDate = () => {
    if (!formData.dateOfAdmission || !formData.agreementPeriod) return "N/A";
    let startDate = new Date(formData.dateOfAdmission);
    startDate.setMonth(startDate.getMonth() + parseInt(formData.agreementPeriod, 10));
    return startDate.toISOString().split("T")[0];
  };

  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.addImage(logo, 'PNG', 200, 35, 200, 150);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('#26  PEERLESS COLONY ,NEAR GARDEN CITY COLLEGE ,BHATTRAHALLI , KR PURAM 560049', 70, 180);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 0, 0);
  
    const title = formData.receiptType === 'Rent' ? 'RENT PAYMENT RECEIPT' : 'DEPOSIT PAYMENT RECEIPT';
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xCoordinate = (pageWidth - textWidth) / 2;
    doc.text(title, xCoordinate, 210);
  
    const tableData = formData.receiptType === 'Rent'
      ? [
          ['Resident Name:', formData.name],
          ['Room No:', formData.roomNumber],
          ['Mode of Payment:', formData.modeOfPayment],
          ['Rent Amount:', formData.amount],
          ['Date of Payment:', formData.dateOfPayment],
          ['Overstanding Dues:', formData.overstandingDues],
          ['Sharing:', formData.sharing],
          ['Rent Month:', formData.rentMonth],
        ]
      : [
          ['Resident Name:', formData.name],
          ['Room No:', formData.roomNumber],
          ['Mode of Payment:', formData.modeOfPayment],
          ['Deposit Amount:', formData.amount],
          ['Date of Payment:', formData.dateOfPayment],
          ['Agreement Tenure: ',formData.tenure]
        ];
  
    doc.autoTable({
      body: tableData,
      startY: 250, 
      styles: {
        fontSize: 24,
        halign: 'left',
        valign: 'middle',
        fillColor: null,
        textColor: 0,
        lineWidth: 0.9,
        lineColor: 0,
      },
      theme: 'plain',
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 250 },
        1: { cellWidth: 'auto', overflow: 'linebreak' },
      },
    });
  
    doc.addImage(paid, 'JPG', 300, doc.autoTable.previous.finalY + 50, 120, 70);
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    if (formData.receiptType === "Rent") {
      doc.addImage(stamp, 'PNG', 130, 550, 180, 150);
    } else if (formData.receiptType === "Deposit") {
      doc.addImage(stamp, 'PNG', 100, 500, 200, 170);
    }
    
  
    const fileName = `${formData.name}_${formData.dateOfPayment}_${formData.receiptType}Receipt.pdf`;
    doc.save(fileName);
  };

  const generateAgreementPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    
    doc.addImage(headerimg, "PNG", 0, 0, pageWidth, 70);

    doc.setFontSize(12);
    doc.text("ROOM NO:", 150, 70);
    doc.text(formData.roomNo, 180, 70);
  
    doc.text("SHARING:", 150, 75);
    doc.text(formData.sharing, 180, 75);
  
    doc.text("PHOTO:", 20, 80);
 

    if (formData.photos.length > 0) {
      let x = 20;
      let y = 83;
    
      formData.photos.forEach((photo, index) => {
        doc.addImage(photo.data, "JPEG", x, y, 50, 50);
        x += 60;
    
        if ((index + 1) % 3 === 0) {
          x = 30;
          y += 80;
        }
      });
    } else {
      doc.text("No photos uploaded.", 30, 90);
    }
  
    doc.text("DATE OF ADMISSION:", 20, 140);
    doc.text(formData.dateOfAdmission, 70, 140);
  
    doc.text("AGREEMENT PERIOD:", 20, 145);
    doc.text(formData.agreementPeriod, 70, 145);
    doc.text("END DATE:", 20, 150);
    doc.text(calculateEndDate(), 70, 150);
    let studentType = formData.occupation === "Other" ? `Other - ${formData.otherDetails}` : formData.occupation;
  
    let healthStatus = formData.healthIssues === "Yes" ? `Yes - ${formData.healthDetails}` : "No";
  
    doc.autoTable({
      startY: 160,
      body: [
        ["NAME (BLOCK LETTERS)", formData.name],
        ["FATHER NAME", formData.fatherName],
        ["AGE", formData.age],
        ["PERMANENT RESIDENTIAL ADDRESS", formData.address],
        ["CONTACT NUMBER", formData.contactNo],
        ["STUDENT / EMPLOYEE / OTHER", studentType],
        ["RECOMMENDED BY", formData.recommendedBy],
        ["ADVANCE (DEPOSIT)", formData.advanceDeposit],
        ["GUARDIAN NUMBER", formData.guardianNo],
        ["HEALTH ISSUES", healthStatus],
      ],
      styles: {
        fillColor: null,
        halign: "left",
        valign: "middle",
        fontSize: 10,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      theme: "grid",
      columnStyles: {
        0: { fontStyle: "bold", cellWidth: 70 },
        1: { cellWidth: "auto", overflow: "linebreak" },
      },
    });
  
    const signatureY = doc.autoTable.previous.finalY + 30;
    doc.text("Signature of Manager/Security", 20, signatureY);
    doc.text("Signature of Resident", 150, signatureY);
  
    doc.text("Payment Date:", 20, signatureY + 20);
    doc.text(formData.paymentDate, 50, signatureY + 20);

    doc.addPage();
    doc.addImage(termsPage1, "PNG", 0, 0, pageWidth, pageHeight);

    doc.addPage();
    doc.addImage(termsPage2, "PNG", 0, 0, pageWidth, pageHeight);

// AADHAAR DOCUMENTS
if (formData.aadhaars.length > 0) {
  formData.aadhaars.forEach((aadhaar, index) => {
    doc.addPage();
    doc.addImage(docheader, "PNG", 0, 0, pageWidth, 60);
    doc.setFontSize(20);
    doc.text("Aadhaar Documents", 75, 65);

    // Draw Aadhaar image (fixed height 100)
    doc.addImage(aadhaar.data, "JPEG", 30, 100, 150, 100);
  });
}
// PROOF DOCUMENTS
if (formData.proofFiles.length > 0) {
  formData.proofFiles.forEach((file, index) => {
    doc.addPage();
    doc.addImage(docheader, "PNG", 0, 0, pageWidth, 60);
    doc.setFontSize(20);
    doc.text("Proof Documents", 75, 65);

    if (file.type === "application/pdf") {
      doc.text(`PDF file ${index + 1} uploaded.`, 30, 150);
    } else {
      // Draw Proof image (fixed height 100)
      doc.addImage(file.data, "JPEG", 30, 100, 150, 150);
    }
  });
}

    doc.save("Rental_Agreement.pdf");
  };
  

  
  return (
    <div className="container">

 
      <div className="form">
        <h2 className="heading">Generate PDF</h2>
        <form onSubmit={(e) => { 
  e.preventDefault();
  if (formData.receiptType === "Agreement") {
    generateAgreementPDF();
  } else {
    generatePDF();
  }
}}>
{formData.receiptType !=="Agreement" && (
            <>
          <label className="label">
            Receipt Type:
            <select name="receiptType" value={formData.receiptType} onChange={handleChange} required className="input">
              <option value="Rent">Rent</option>
              <option value="Deposit">Deposit</option>
              <option value="Agreement">Agreement</option>
            </select>
          </label>
          <label className="label">
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input" />
          </label>
          <label className="label">
            Room Number:
            <input type="number" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required className="input" min="0" />
          </label>
          <label className="label">
            Mode of Payment:
            <select name="modeOfPayment" value={formData.modeOfPayment} onChange={handleChange} required className="input">
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </label>
          <label className="label">
            {formData.receiptType === 'Rent' ? 'Rent Amount:' : 'Deposit Amount:'}
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="input"
              min="0"
            />
          </label>
          <label className="label">
            Date of Payment:
            <input type="date" name="dateOfPayment" value={formData.dateOfPayment} onChange={handleChange} required className="input" />
          </label>
          {formData.receiptType === 'Deposit' &&(
            <>
            <label className="label">
            Agreement Tenure:
            <input type="text" name="tenure" value={formData.tenure} onChange={handleChange} required className="input" />
          </label></>
          )}
          {formData.receiptType === 'Rent' && (
            <>
              <label className="label">
                Overstanding Dues:
                <input
                  type="number"
                  name="overstandingDues"
                  value={formData.overstandingDues}
                  onChange={handleChange}
                  required
                  className="input"
                  min="0"
                />
              </label>
              <label className="label">
                Sharing:
                <select name="sharing" value={formData.sharing} onChange={handleChange} required className="input">
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Triple">Triple</option>
                </select>
              </label>
              <label className="label">
                Rent Month:
                <select name="rentMonth" value={formData.rentMonth} onChange={handleChange} required className="input">
                  <option value="Ongoing">Ongoing</option>
                  <option value="Previous">Previous</option>
                </select>
              </label>
            </>
          )}

          </>)}
          {formData.receiptType ==="Agreement" && (
            <>
            <label className="label">
            Receipt Type:
            <select name="receiptType" value={formData.receiptType} onChange={handleChange} required className="input">
              <option value="Rent">Rent</option>
              <option value="Deposit">Deposit</option>
              <option value="Agreement">Agreement</option>
            </select>
          </label>
            <div>


      
      <label className='label'>Room No.: <input type="text" name="roomNo" onChange={handleChange} required className='input' /></label>
      <label className='label'>Sharing Type: <input type="text" name="sharing" onChange={handleChange}  required className='input' /></label>
      <label className='label'>Name: <input type="text" name="name" onChange={handleChange}  required className='input' /></label>
      <label className='label'>Father's Name: <input type="text" name="fatherName" onChange={handleChange}  required className='input' /></label>
      <label className='label'>Age: <input type="text" name="age" onChange={handleChange}  required className='input' /></label>
      <label className='label'>Permanent Residential Address:<input type="text" name="address" onChange={handleChange} required className='input'  /></label>
      <label className='label'>Contact No.: <input type="text" name="contactNo" onChange={handleChange}  required className='input' /></label>
      <label className='label'>Date of Admission: <input type="date" name="dateOfAdmission" value={formData.dateOfAdmission} onChange={handleChange} required className='input'  /></label>
      <label className='label'>Agreement Period (Months): <input type="number" name="agreementPeriod" value={formData.agreementPeriod} onChange={handleChange}  required className='input' /></label>
      <label className='label'>End Date: <input type="text" value={calculateEndDate()} disabled className='input'/></label>

      <label className='label'>Payment Date: <input type="date" name="paymentDate" value={formData.paymentDate} onChange={handleChange} required className='input' ></input></label>

      <label className='label'>Occupation:</label>
<label className='radio-btn'>
  <input type="radio" name="occupation" value="Student"  checked={formData.occupation === "Student"} onChange={(e) => setFormData({ ...formData, occupation: e.target.value })} /> Student
</label>
<label className='radio-btn' >
  <input type="radio" name="occupation" value="Employee"  checked={formData.occupation === "Employee"} onChange={(e) => setFormData({ ...formData, occupation: e.target.value })} /> Employee
</label>
<label className='radio-btn' >
  <input type="radio" name="occupation" value="Other"  checked={formData.occupation === "Other"} onChange={(e) => setFormData({ ...formData, occupation: e.target.value })} /> Other
</label>
{formData.occupation === "Other" && (
  <input type="text" name="otherDetails" value={formData.otherDetails} onChange={handleChange}  required className='input' placeholder="Specify Other" />
)}
      

      <label className='label'>Recommended By: <input type="text" name="recommendedBy" onChange={handleChange} required className='input'  /></label>
      <label className='label'>Advance (Deposit): <input type="number" name="advanceDeposit" onChange={handleChange} required className='input'  /></label>
      <label className='label'>Guardian No.: <input type="text" name="guardianNo" onChange={handleChange} required className='input'  /></label>
      <label className='label'>Health Issues:</label>
<label className='radio-btn'>
  <input type="radio" name="healthIssues" value="Yes" checked={formData.healthIssues === "Yes"} onChange={handleChange}   className='radio' /> Yes
</label>
<label className='radio-btn'>
  <input type="radio" name="healthIssues" value="No" checked={formData.healthIssues === "No"} onChange={handleChange}   className='radio' /> No
</label>
{formData.healthIssues === "Yes" && (
  <input type="text" name="healthDetails" value={formData.healthDetails} onChange={handleChange}  required className='input' placeholder="Specify Health Issue" />
)}

<label  className='label'>Upload Passport Photos</label>
<input
  type="file"
  name="photos"
  accept="image/*"
  multiple
  onChange={handleFileChange}
  className='input'
/>

<label className='label'>Upload Aadhaar Card(s)</label>
<input
  type="file"
  name="aadhaars"
  accept="image/*"
  multiple
  onChange={handleFileChange}
  className='input'
/>

<label className='label'>Upload Proof Document(s)</label>
<input
  type="file"
  name="proofFiles"
  accept="image/*,application/pdf"
  multiple
  onChange={handleFileChange}
  className='input'
/>

  </div>
            </>
          )}
          
          <button type="submit" className="button">Generate PDF</button>
        </form>
      </div>
    </div>
  );
};

export default ResidentForm;
