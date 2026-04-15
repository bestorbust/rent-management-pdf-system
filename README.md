# 🧾 PG Rent Management System – PDF Automation Tool

🔗 Live Demo: https://genpdf.netlify.app/  

---

## 📌 Overview

Developed a web-based tool for a PG (Paying Guest) accommodation to automate the generation of rent receipts, deposit receipts, rental agreements, and vacating forms.

This system replaces manual paperwork by generating professionally formatted PDFs with dynamic user input.

---

## 💡 Problem

Managing rent receipts and agreements manually in PG accommodations is time-consuming and error-prone.

---

## 🚀 Solution

Built a React-based system that allows admins to:
- Enter tenant details
- Select document type (Rent / Deposit / Agreement / Vacating)
- Automatically generate formatted PDFs

---

## ✨ Features

- 🔐 Admin login system
- 🧾 Rent & deposit receipt generation
- 📄 Rental agreement generation (multi-page)
- 🚪 Vacating acknowledgment form
- 🖼️ Image upload (Aadhaar, photos, documents)
- 📊 Dynamic PDF formatting using jsPDF

---

## ⚙️ Tech Stack

- React.js
- JavaScript
- jsPDF & jspdf-autotable
- HTML/CSS

---

## 🧠 Key Implementation

- Dynamic form handling for multiple document types
- Conditional rendering based on receipt type
- File uploads converted to base64 for embedding in PDFs
- Multi-page PDF generation with images and tables

---

## 🧪 Real-world Usage

- Built for a PG management use case
- Helps automate administrative workflows
- Reduces manual effort and improves consistency

---

## ▶️ Run Locally

```bash
git clone https://github.com/bestorbust/pg-rent-management-system.git
cd pg-rent-management-system
npm install
npm start
