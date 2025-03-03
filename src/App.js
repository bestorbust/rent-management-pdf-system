import React, { useState } from 'react';
import jsPDF from 'jspdf';
import logo from './image/LOGO.png'; 
import stamp from './image/paid.png'; 
import paid from './image/seal.png';
import 'jspdf-autotable';
import './App.css';

const ResidentForm = () => {
  const [formData, setFormData] = useState({
    receiptType: 'Rent', // Default type
    name: '',
    roomNumber: '',
    modeOfPayment: 'Cash',
    amount: '',
    dateOfPayment: '',
    overstandingDues: '',
    sharing: 'Single',
    rentMonth: 'Ongoing',
    vacatingDate: '',
    depositCleared: 'Yes',
    remainingDeposit: '',
    approvalDate: '',
    damage: 'No',
    damageList: '',
    parentApproval: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.addImage(logo, 'PNG', 200, -10, 200, 200);
    doc.setFontSize(10);
    doc.text('#26 PEERLESS COLONY, NEAR GARDEN CITY COLLEGE, BHATTRAHALLI, KR PURAM 560049', 70, 180);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 0, 0);

    // Dynamically set title
    let title;
    if (formData.receiptType === 'Rent') {
      title = 'RENT PAYMENT RECEIPT';
    } else if (formData.receiptType === 'Deposit') {
      title = 'DEPOSIT PAYMENT RECEIPT';
    } else {
      title = 'VACATING FORM RECEIPT';
    }

    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - textWidth) / 2, 210);

    // Generate different tables based on receipt type
    let tableData;
    if (formData.receiptType === 'Rent') {
      tableData = [
        ['Resident Name:', formData.name],
        ['Room No:', formData.roomNumber],
        ['Mode of Payment:', formData.modeOfPayment],
        ['Rent Amount:', formData.amount],
        ['Date of Payment:', formData.dateOfPayment],
        ['Overstanding Dues:', formData.overstandingDues],
        ['Sharing:', formData.sharing],
        ['Rent Month:', formData.rentMonth],
      ];
    } else if (formData.receiptType === 'Deposit') {
      tableData = [
        ['Resident Name:', formData.name],
        ['Room No:', formData.roomNumber],
        ['Mode of Payment:', formData.modeOfPayment],
        ['Deposit Amount:', formData.amount],
        ['Date of Payment:', formData.dateOfPayment],
      ];
    } else {
      tableData = [
        ['Resident Name:', formData.name],
        ['Room No:', formData.roomNumber],
        ['Date of Vacating:', formData.vacatingDate],
        ['Deposit Cleared:', formData.depositCleared],
      ];

      if (formData.depositCleared === 'No') {
        tableData.push(['Remaining Deposit:', formData.remainingDeposit]);
      }

      tableData.push(['Date with Approval:', formData.approvalDate]);
      tableData.push(['Damage Report:', formData.damage]);

      if (formData.damage === 'Yes') {
        tableData.push(['List of Damages:', formData.damageList]);
      }

      tableData.push(['Parent Approval:', formData.parentApproval]);
    }

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

    // Signature & Stamp
    doc.addImage(stamp, 'PNG', 300, doc.autoTable.previous.finalY + 50, 280, 70);
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);

    // Special message for vacating form
    if (formData.receiptType === 'Vacating') {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(
        'The resident mentioned above has vacated the premises and no longer has any association with SAHANA PG.',
        50,
        doc.autoTable.previous.finalY + 120,
        { maxWidth: 500, align: 'justify' }
      );
    }

    // Save PDF
    const fileName = `${formData.name}_${formData.dateOfPayment}_${formData.receiptType}Receipt.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="container">
      <div className="form">
        <h2 className="heading">Generate Rent, Deposit, or Vacating Form PDF</h2>
        <form onSubmit={(e) => { e.preventDefault(); generatePDF(); }}>
          <label className="label">
            Receipt Type:
            <select name="receiptType" value={formData.receiptType} onChange={handleChange} required className="input">
              <option value="Rent">Rent</option>
              <option value="Deposit">Deposit</option>
              <option value="Vacating">Vacating</option>
            </select>
          </label>

          {/* Common Fields */}
          <label className="label">
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input" />
          </label>
          <label className="label">
            Room Number:
            <input type="number" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required className="input" min="0" />
          </label>

          {/* Conditional Fields */}
          {formData.receiptType === 'Vacating' ? (
            <>
              <label className="label">
                Date of Vacating:
                <input type="date" name="vacatingDate" value={formData.vacatingDate} onChange={handleChange} required className="input" />
              </label>
              <label className="label">
                Deposit Cleared:
                <select name="depositCleared" value={formData.depositCleared} onChange={handleChange} required className="input">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
              {formData.depositCleared === 'No' && (
                <label className="label">
                  Remaining Deposit:
                  <input type="number" name="remainingDeposit" value={formData.remainingDeposit} onChange={handleChange} className="input" />
                </label>
              )}
              <label className="label">
                Damage:
                <select name="damage" value={formData.damage} onChange={handleChange} required className="input">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>
              {formData.damage === 'Yes' && (
                <label className="label">
                  List of Damages:
                  <input type="text" name="damageList" value={formData.damageList} onChange={handleChange} className="input" />
                </label>
              )}
              <label className="label">
                Parent Approval:
                <input type="text" name="parentApproval" value={formData.parentApproval} onChange={handleChange} required className="input" />
              </label>
            </>
          ) : null}

          <button type="submit" className="button">Generate PDF</button>
        </form>
      </div>
    </div>
  );
};

export default ResidentForm;








// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import logo from './image/LOGO.png'; 
// import stamp from './image/paid.png'; 
// import paid from './image/seal.png';
// import 'jspdf-autotable';
// import './App.css';

// const ResidentForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     roomNumber: '',
//     modeOfPayment: 'Cash',
//     amount: '',
//     dateOfPayment: '',
//     overstandingDues: '',
//     sharing: 'Single',
//     rentMonth: 'Ongoing',
//     receiptType: 'Rent', 
//     tenure:'',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF('p', 'pt', 'a4');
//     doc.addImage(logo, 'PNG', 200, 35, 200, 150);
//     doc.setFontSize(10);
//     doc.setTextColor(0, 0, 0);
//     doc.text('#26  PEERLESS COLONY ,NEAR GARDEN CITY COLLEGE ,BHATTRAHALLI , KR PURAM 560049', 70, 180);
//     doc.setFontSize(24);
//     doc.setTextColor(0, 0, 0);
//     doc.setFont('helvetica', 'bold');
//     doc.text('#SAHANA LADIES PG', 170, 205);
    
//     doc.setFontSize(30);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(255, 0, 0);
  
//     const title = formData.receiptType === 'Rent' ? 'RENT PAYMENT RECEIPT' : 'DEPOSIT PAYMENT RECEIPT';
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const textWidth = doc.getTextWidth(title);
//     const xCoordinate = (pageWidth - textWidth) / 2;
//     doc.text(title, xCoordinate, 240);
  
//     const tableData = formData.receiptType === 'Rent'
//       ? [
//           ['Resident Name:', formData.name],
//           ['Room No:', formData.roomNumber],
//           ['Mode of Payment:', formData.modeOfPayment],
//           ['Rent Amount:', formData.amount],
//           ['Date of Payment:', formData.dateOfPayment],
//           ['Overstanding Dues:', formData.overstandingDues],
//           ['Sharing:', formData.sharing],
//           ['Rent Month:', formData.rentMonth],
//         ]
//       : [
//           ['Resident Name:', formData.name],
//           ['Room No:', formData.roomNumber],
//           ['Mode of Payment:', formData.modeOfPayment],
//           ['Deposit Amount:', formData.amount],
//           ['Date of Payment:', formData.dateOfPayment],
//           ['Agreement Tenure: ',formData.tenure]
//         ];
  
//     doc.autoTable({
//       body: tableData,
//       startY: 250, 
//       styles: {
//         fontSize: 24,
//         halign: 'left',
//         valign: 'middle',
//         fillColor: null,
//         textColor: 0,
//         lineWidth: 0.9,
//         lineColor: 0,
//       },
//       theme: 'plain',
//       columnStyles: {
//         0: { fontStyle: 'bold', cellWidth: 250 },
//         1: { cellWidth: 'auto', overflow: 'linebreak' },
//       },
//     });
  
//     doc.addImage(stamp, 'PNG', 300, doc.autoTable.previous.finalY + 50, 120, 70);
//     doc.setFontSize(16);
//     doc.setTextColor(0, 0, 0);
//     doc.addImage(paid, 'JPG', 130, doc.autoTable.previous.finalY + 10, 180, 150); 
  
//     const fileName = `${formData.name}_${formData.dateOfPayment}_${formData.receiptType}Receipt.pdf`;
//     doc.save(fileName);
//   };
  
//   return (
//     <div className="container">
//       <div className="form">
//         <h2 className="heading">Generate Rent or Deposit Details PDF</h2>
//         <form onSubmit={(e) => { e.preventDefault(); generatePDF(); }}>
//           <label className="label">
//             Receipt Type:
//             <select name="receiptType" value={formData.receiptType} onChange={handleChange} required className="input">
//               <option value="Rent">Rent</option>
//               <option value="Deposit">Deposit</option>
//             </select>
//           </label>
//           <label className="label">
//             Name:
//             <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input" />
//           </label>
//           <label className="label">
//             Room Number:
//             <input type="number" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required className="input" min="0" />
//           </label>
//           <label className="label">
//             Mode of Payment:
//             <select name="modeOfPayment" value={formData.modeOfPayment} onChange={handleChange} required className="input">
//               <option value="Cash">Cash</option>
//               <option value="Bank Transfer">Bank Transfer</option>
//             </select>
//           </label>
//           <label className="label">
//             {formData.receiptType === 'Rent' ? 'Rent Amount:' : 'Deposit Amount:'}
//             <input
//               type="number"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//               className="input"
//               min="0"
//             />
//           </label>
//           <label className="label">
//             Date of Payment:
//             <input type="date" name="dateOfPayment" value={formData.dateOfPayment} onChange={handleChange} required className="input" />
//           </label>
//           {formData.receiptType === 'Deposit' &&(
//             <>
//             <label className="label">
//             Agreement Tenure:
//             <input type="text" name="tenure" value={formData.tenure} onChange={handleChange} required className="input" />
//           </label></>
//           )}
//           {formData.receiptType === 'Rent' && (
//             <>
//               <label className="label">
//                 Overstanding Dues:
//                 <input
//                   type="number"
//                   name="overstandingDues"
//                   value={formData.overstandingDues}
//                   onChange={handleChange}
//                   required
//                   className="input"
//                   min="0"
//                 />
//               </label>
//               <label className="label">
//                 Sharing:
//                 <select name="sharing" value={formData.sharing} onChange={handleChange} required className="input">
//                   <option value="Single">Single</option>
//                   <option value="Double">Double</option>
//                   <option value="Triple">Triple</option>
//                 </select>
//               </label>
//               <label className="label">
//                 Rent Month:
//                 <select name="rentMonth" value={formData.rentMonth} onChange={handleChange} required className="input">
//                   <option value="Ongoing">Ongoing</option>
//                   <option value="Previous">Previous</option>
//                 </select>
//               </label>
//             </>
//           )}
//           <button type="submit" className="button">Generate PDF</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResidentForm;
