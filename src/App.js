import React, { useState } from 'react';
import jsPDF from 'jspdf';
import logo from './image/LOGO.jpg'; 
import stamp from './image/paid.jpg'; 
import paid from './image/paid.png';
import 'jspdf-autotable'; 
import './App.css';

const ResidentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    roomNumber: '',
    modeOfPayment: 'Cash',
    depositAmount: '',
    dateOfPayment: '',
    overstandingDues: '',
    sharing: 'Single',
    rentMonth: 'Ongoing',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    //X,Y,W,H
    doc.addImage(logo, 'PNG', 200, -10, 200, 200);
    /*doc.setFontSize(25);
    doc.setFont('helvetica','bold');
    doc.setTextColor(0, 0, 255);
    doc.text('#SAHANA LADIES PG', 180, 160);*/
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('#26  PEERLESS COLONY ,NEAR GARDEN CITY COLLEGE ,BHATTRAHALLI , KR PURAM 560049', 70, 180);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 0, 0);
    doc.text('PAYMENT RECEIPT', 195, 210);

    const tableData = [
      ['Resident Name:', formData.name],
      ['Room No:', formData.roomNumber],
      ['Mode of Payment:', formData.modeOfPayment],
      ['Rent Amount:', formData.rentAmount],
      ['Date of Payment:', formData.dateOfPayment],
      ['Overstanding Dues:', formData.overstandingDues],
      ['Sharing:', formData.sharing],
      ['Rent Month:', formData.rentMonth],
    ];

    doc.autoTable({
      //head: [['Field', 'Details']],
      body: tableData,
      startY: 250, 
      styles: {
        fontSize: 24,
        halign: 'left',
        valign: 'middle',
        //cellPadding: 2,
        fillColor:null,
        textColor: 0,
        lineWidth:0.9,
        lineColor:0,
      },
      // tableLineWidth: 0.5,
      // tableLineColor:0,
      theme:'plain',
      columnStyles:{
        0: { fontStyle: 'bold', cellWidth: 250 },
        1: { cellWidth: 'auto',overflow:'linebreak' },
      }
    });

    doc.addImage(stamp, 'PNG', 300, doc.autoTable.previous.finalY + 50, 280, 70);
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    //doc.text('MANAGEMENT SIGNATURE', 350, doc.autoTable.previous.finalY + 130);
    doc.addImage(paid, 'JPG', 90, 600, 150, 150); 
    doc.save(`${formData.name}_${formData.dateOfPayment}_RentReceipt.pdf`);
  };

  return (
    <div className="container">
    <div className="form">
      <h2 className="heading">Generate Rent Details PDF</h2>
      <form onSubmit={(e) => { e.preventDefault(); generatePDF(); }}>
        <label className="label">
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input" />
        </label>
        <label className="label">
          Room Number:
          <input type="number" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required className="input" min="0"/>
        </label>
        <label className="label">
          Mode of Payment:
          <select name="modeOfPayment" value={formData.modeOfPayment} onChange={handleChange} required className="input">
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          {/* <input type="text" name="modeOfPayment" value={formData.modeOfPayment} onChange={handleChange} required className="input" /> */}
        </label>
        <label className="label">
          Rent Amount:
          <input type="number" name="rentAmount" value={formData.rentAmount} onChange={handleChange} required className="input" min="0"/>
        </label>
        <label className="label">
          Date of Payment:
          <input type="date" name="dateOfPayment" value={formData.dateOfPayment} onChange={handleChange} required className="input" />
        </label>
        <label className="label">
          Overstanding Dues:
          <input type="number" name="overstandingDues" value={formData.overstandingDues} onChange={handleChange} required className="input" min="0"/>
        </label>
        <label className="label">
          Sharing:
          <select name="sharing" value={formData.sharing} onChange={handleChange} required className="input">
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Double">Triple</option>
          </select>
          {/* <input type="text" name="sharing" value={formData.sharing} onChange={handleChange} required className="input" /> */}
        </label>
        <label className="label">
          Rent Month:
          <select name="rentMonth" value={formData.rentMonth} onChange={handleChange} required className="input">
            <option value="Ongoing">Ongoing</option>
            <option value="Previous">Previous</option>
          </select>
          {/* <input type="text" name="rentMonth" value={formData.rentMonth} onChange={handleChange} required className="input" /> */}
        </label>
        <button type="submit" className="button">Generate PDF</button>
      </form>
    </div>
    </div>
  );
};

export default ResidentForm;
