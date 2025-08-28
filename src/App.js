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
    vacatingDate: "",
    noticePeriod: "",
    depositCollected: "",
    deductions: "",
    refundable: "",
    noticeprd:"No",
    damage: "No",
    damageItem: "",
    damageAmount: "",

  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const toCaps = (value) => (value ? String(value).toUpperCase() : "");


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

//   const generateVacatingPDF = () => {
//     const doc = new jsPDF('p', 'pt', 'a4');

//     doc.addImage(logo, 'PNG', 200, 35, 200, 150);
//     doc.setFontSize(10);
//     doc.setTextColor(0, 0, 0);
//     doc.text('#26  PEERLESS COLONY ,NEAR GARDEN CITY COLLEGE ,BHATTRAHALLI , KR PURAM 560049', 70, 180);
//     doc.setFontSize(24);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(255, 0, 0);

//     const subtitle= '#SAHANA LADIES PG';
  
//     const title = 'Tenant Vacating Acknowledgment Form';
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const textWidth = doc.getTextWidth(title);
//     const xCoordinate = (pageWidth - textWidth) / 2;
//     doc.setFontSize(20);
//     doc.setTextColor(0, 0, 0);
//     doc.text(subtitle,200,200)
//     doc.setTextColor(255, 0, 0);
//     doc.setFontSize(24);
//     doc.text(title, xCoordinate, 230);

//     const tableData = 
//        [
//           ['RESIDENT NAME:', toCaps(formData.name)],
//           ['ROOM NO:', toCaps(formData.roomNumber)],
//           ['VACATING DATE', toCaps(formData.vacatingDate)],
//           ["NOTICE PERIOS (DAYS)", toCaps(formData.noticePeriod)],
//           ["DEPOSIT COLLECTED", `${formData.depositCollected}`],
//           ["DEDUCTIONS", `${formData.deductions || 0}`],
//           ["Refundable Amount", `${formData.refundable || 0}`],
//           ["NOTICE PERIOD SERVED",
//       formData.noticeprd === "Yes"
//         ? "Yes – Tenant has served notice period."
//         : "No – Tenant has NOT served notice period. As per terms, security deposit will NOT be refunded.",
//     ],          ["Any Damages", toCaps(formData.damage)],
//           // ["Refund Timeline", "Within 30 days from vacating date"],
//         ]

//         if (formData.damage === "Yes") {
//   tableData.push(["Damaged Item", toCaps(formData.damageItem)]);
//   tableData.push(["Damage Amount", `₹ ${formData.damageAmount}`]);
// }

        
//     doc.autoTable({
//       body: tableData,
//       startY: 250, 
//       styles: {
//         fontSize: 12,
//         halign: 'left',
//         valign: 'middle',
//         fillColor: null,
//         textColor: 0,
//         lineWidth: 0.5,
//         lineColor: 0,
//       },
//       theme: 'plain',
//       columnStyles: {
//         0: { fontStyle: 'bold', cellWidth: 250 },
//         1: { cellWidth: 'auto', overflow: 'linebreak' },
//       },
//     });
  
// const noteY = doc.autoTable.previous.finalY + 20;
// doc.setFontSize(12);
// doc.setTextColor(0, 0, 0);

// doc.text(
//   "Refund Timeline: The refundable security deposit (after deductions, if any) will be returned to the tenant within 30 days from the date of vacating, through Bank Transfer.",
//   40,
//   noteY,
//   { maxWidth: 500 }
// );

// doc.setFontSize(12);
// doc.setTextColor(0, 0, 0);
// doc.text(
//   `Declaration: This is to certify that the tenant has vacated the premises on ${formData.vacatingDate}. All dues have been reviewed, and the security deposit will be refunded within 30 days as per terms.`,
//   40,
//   noteY + 30,
//   { maxWidth: 500 }
// );

// doc.setFontSize(12);
// doc.text("Tenant Signature:", 40, 650);
// doc.line(150, 650, 280, 650); 

// doc.setFontSize(12);
// doc.text("Management Signature (with Seal):", 320, 650);
// doc.line(530, 650, 700, 650);

// // doc.addImage(stamp, 'PNG', 350, 570, 300, 150);

// doc.save(`${formData.name}_VacatingForm.pdf`);

// };

  
  const generateVacatingPDF = () => {
  const doc = new jsPDF("p", "pt", "a4");

  // Logo
  doc.addImage(logo, "PNG", 200, 35, 200, 150);

  // Address
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(
    "#26  PEERLESS COLONY, NEAR GARDEN CITY COLLEGE, BHATTRAHALLI, KR PURAM - 560049",
    70,
    180
  );

  // Subtitle + Title
  const subtitle = "#SAHANA LADIES PG";
  const title = "Tenant Vacating Acknowledgment Form";
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(title);
  // const xCoordinate = (pageWidth - textWidth) / 2;

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(subtitle, 200, 200);

  doc.setTextColor(255, 0, 0);
  doc.setFontSize(20);
  doc.text(title, 100, 230);

  // Main Table Data
  const tableData = [
    ["RESIDENT NAME:", toCaps(formData.name)],
    ["ROOM NO:", toCaps(formData.roomNumber)],
    ["Vacating Date", toCaps(formData.vacatingDate)],
    ["Notice Period (days)", toCaps(formData.noticePeriod)],
    ["Deposit Collected", `${formData.depositCollected}`],
    ["Deductions", `${formData.deductions || 0}`],
    ["Refundable Amount", `${formData.refundable}`],
    [
      "NOTICE PERIOD SERVED",
      formData.noticeprd === "Yes"
        ? "Yes – Tenant has served notice period."
        : "No – Tenant has NOT served notice period. As per terms, security deposit will NOT be refunded.",
    ],
    ["Any Damages", toCaps(formData.damage)],
  ];

  // Add damage details if applicable
  if (formData.damage === "Yes") {
    tableData.push(["Damaged Item", toCaps(formData.damageItem)]);
    tableData.push(["Damage Amount", `${formData.damageAmount}`]);
  }

  // Render Table
  doc.autoTable({
    body: tableData,
    startY: 250,
    styles: {
      fontSize: 12,
      halign: "left",
      valign: "middle",
      textColor: 0,
      lineWidth: 0.5,
      lineColor: 0,
    },
    theme: "grid",
    columnStyles: {
      0: { fontStyle: "bold", cellWidth: 220 },
      1: { cellWidth: 300, overflow: "linebreak" },
    },
  });

  // Notes Section
  const noteY = doc.autoTable.previous.finalY + 30;
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  doc.text(
    "Refund Timeline:",
    40,
    noteY
  );
  doc.setFont("helvetica", "normal");
  doc.text(
    "The refundable security deposit (after deductions, if any) will be returned within 30 days from the date of vacating, through Bank Transfer (if eligible).",
    40,
    noteY + 15,
    { maxWidth: 500 }
  );

  doc.setFont("helvetica", "bold");
  doc.text("Declaration:", 40, noteY + 50);
  doc.setFont("helvetica", "normal");
  doc.text(
    `This is to certify that the tenant has vacated the premises on ${formData.vacatingDate}. All dues have been reviewed and the refund will be processed as per terms.`,
    40,
    noteY + 65,
    { maxWidth: 500 }
  );

  // Signatures Section
  const signY = noteY + 130;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Tenant Signature:", 40, signY);
  doc.line(150, signY, 280, signY);

  doc.text("Management Signature (with Seal):", 320, signY);
  doc.line(530, signY, 700, signY);

  // Stamp (optional, uncomment if needed)
  doc.addImage(stamp, "PNG", 350, signY-15 , 180, 150);

  // Save
  doc.save(`${formData.name}_VacatingForm.pdf`);
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

    const subtitle= '#SAHANA LADIES PG';
  
    const title = formData.receiptType === 'Rent' ? 'RENT PAYMENT RECEIPT' : 'DEPOSIT PAYMENT RECEIPT';
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    const xCoordinate = (pageWidth - textWidth) / 2;
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text(subtitle,200,200)
    doc.setTextColor(255, 0, 0);
    doc.setFontSize(24);
    doc.text(title, xCoordinate, 230);
  
    const tableData = formData.receiptType === 'Rent'
      ? [
          ['RESIDENT NAME:', toCaps(formData.name)],
          ['ROOM NO:', toCaps(formData.roomNumber)],
          ['MODE OF PAYMENT:', toCaps(formData.modeOfPayment)],
          ['RENT AMOUNT:', toCaps(formData.amount)],
          ['DATE OF PAYMENT:', toCaps(formData.dateOfPayment)],
          ['OVERSTANDING DUES:', toCaps(formData.overstandingDues)],
          ['SHARING:', toCaps(formData.sharing)],
          ['RENT MONTH:', toCaps(formData.rentMonth)],
        ]
      : [
          ['RESIDENT NAME:', toCaps(formData.name)],
          ['ROOM NO:', toCaps(formData.roomNumber)],
          ['MODE OF PAYMENT:', toCaps(formData.modeOfPayment)],
          ['DEPOSIT OF AMOUNT:', toCaps(formData.amount)],
          ['DATE OF PAYMENT:', toCaps(formData.dateOfPayment)],
          ['AGREEMENT TENURE: ',toCaps(formData.tenure)]
        ];

    
  
    doc.autoTable({
      body: tableData,
      startY: 250, 
      styles: {
        fontSize: 20,
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
    
    if (formData.receiptType === "Rent") {    
      const noteY = doc.autoTable.previous.finalY + 20;
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Note: Payment should be done before 3rd of every month", 40, noteY);
  
      doc.addImage(stamp, 'PNG', 130, 570, 180, 150);
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
    doc.text(toCaps(formData.roomNo), 180, 70);
  
    doc.text("SHARING:", 150, 75);
    doc.text(toCaps(formData.sharing), 180, 75);
  
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
    doc.text(toCaps(formData.dateOfAdmission), 70, 140);
  
    doc.text("AGREEMENT PERIOD:", 20, 145);
    doc.text(`${formData.agreementPeriod} (MONTHS)`, 70, 145);
    doc.text("END DATE:", 20, 150);
    doc.text(calculateEndDate(), 70, 150);
    let studentType = formData.occupation === "Other" ? `Other - ${formData.otherDetails}` : formData.occupation;
  
    let healthStatus = formData.healthIssues === "Yes" ? `Yes - ${formData.healthDetails}` : "No";
  
    doc.autoTable({
      startY: 160,
      body: [
        ["NAME (BLOCK LETTERS)", toCaps(formData.name)],
        ["FATHER NAME", toCaps(formData.fatherName)],
        ["AGE", toCaps(formData.age)],
        ["PERMANENT RESIDENTIAL ADDRESS", toCaps(formData.address)],
        ["CONTACT NUMBER", toCaps(formData.contactNo)],
        ["STUDENT / EMPLOYEE / OTHER", toCaps(studentType)],
        ["RECOMMENDED BY", toCaps(formData.recommendedBy)],
        ["ADVANCE (DEPOSIT)", toCaps(formData.advanceDeposit)],
        ["GUARDIAN NUMBER", toCaps(formData.guardianNo)],
        ["HEALTH ISSUES", toCaps(healthStatus)],
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
  } else if (formData.receiptType === "Vacating") {
    generateVacatingPDF();
  }
  else {
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
              <option value="Vacating">Vacating</option>
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
              <option value="UPI">UPI</option>
              <option value="IMPS">IMPS</option>
              <option value="NEFT">NEFT</option>
              <option value="RTGS">RTGS</option>
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
          {formData.receiptType === "Vacating" && (
  <>
    <label className="label">
      Name:
      <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input" />
    </label>
    <label className="label">
      Room Number:
      <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required className="input" />
    </label>
    <label className="label">
      Vacating Date:
      <input type="date" name="vacatingDate" value={formData.vacatingDate} onChange={handleChange} required className="input" />
    </label>
    <label className="label">
      Notice Period Served (days):
      <input type="number" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} required className="input" />
    </label>
    <label className="label">
      Deposit Collected:
      <input type="number" name="depositCollected" value={formData.depositCollected} onChange={handleChange} required className="input" />
    </label>
    <label className="label">
      Deductions (if any):
      <input type="number" name="deductions" value={formData.deductions} onChange={handleChange} className="input" />
    </label>
    <label className="label">
      Refundable Amount:
      <input type="number" name="refundable" value={formData.refundable} onChange={handleChange} required className="input" />
    </label>
    <label className='label'>Notice Period Serverd:</label>
    <label className='radio-btn'>
        <input type="radio" name="noticeprd" value="Yes"  checked={formData.noticeprd === "Yes"} onChange={(e) => setFormData({ ...formData, noticeprd: e.target.value })} /> Yes
    </label>
    <label className='radio-btn' >
        <input type="radio" name="noticeprd" value="No"  checked={formData.noticeprd === "No"} onChange={(e) => setFormData({ ...formData, noticeprd: e.target.value })} /> No
    </label>

<label className="label">Any Damages?</label>
    <label className="radio-btn">
      <input
        type="radio"
        name="damage"
        value="Yes"
        checked={formData.damage === "Yes"}
        onChange={(e) => setFormData({ ...formData, damage: e.target.value })}
      /> Yes
    </label>
    <label className="radio-btn">
      <input
        type="radio"
        name="damage"
        value="No"
        checked={formData.damage === "No"}
        onChange={(e) => setFormData({ ...formData, damage: e.target.value })}
      /> No
    </label>

    {formData.damage === "Yes" && (
      <>
        <label className="label">
          Damaged Item:
          <input type="text" name="damageItem" value={formData.damageItem} onChange={handleChange} className="input" />
        </label>
        <label className="label">
          Damage Amount:
          <input type="number" name="damageAmount" value={formData.damageAmount} onChange={handleChange} className="input" />
        </label>
      </>
    )}
  </>
)}

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
