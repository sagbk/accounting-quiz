
import { useState } from "react";
import jsPDF from "jspdf";

export default function AccountingMaturityAssessment() {
  const questions = [
    "Do we close our books on a consistent schedule and produce timely, accurate financial statements that meet both internal and external requirements?",
    "Do we maintain well-documented policies and procedures for essential accounting activities (e.g., accounts payable, accounts receivable, payroll), and are they consistently followed?",
    "Are we leveraging modern accounting software, automation tools, and AI to streamline repetitive tasks, reduce manual errors, and focus on higher-level analysis?",
    "Does our finance team provide insightful analysis - beyond basic reporting - that supports strategic decision-making, forecasting, and planning?",
    "Are robust internal controls in place to safeguard assets, ensure compliance, and reduce fraud risk, with regular reviews to keep them effective?",
    "Does the accounting function effectively collaborate with other departments (sales, operations, HR) to ensure integrated decision-making and reliable information flows?",
    "Are we proactively staying informed about changing regulatory requirements (e.g., tax laws, GAAP/IFRS updates) and adjusting processes accordingly?",
    "Do we continuously invest in upskilling our team - through professional education, certifications, and learning opportunities - to support growth and innovation?"
  ];

  const [form, setForm] = useState({ name: "", email: "", responses: Array(8).fill("") });
  const [step, setStep] = useState("gate");

  const handleChange = (index, value) => {
    const newResponses = [...form.responses];
    newResponses[index] = value;
    setForm({ ...form, responses: newResponses });
  };

  const handleGateSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email) setStep("assessment");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Form:", form);

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Accounting & Finance Maturity Assessment Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${form.name}`, 20, 30);
    doc.text(`Email: ${form.email}`, 20, 38);

    questions.forEach((q, i) => {
      const y = 50 + i * 10;
      doc.text(`${i + 1}. ${q}`, 20, y);
      doc.text(`Answer: ${form.responses[i] || "Not Answered"}`, 25, y + 6);
    });

    doc.save("Accounting-Finance-Maturity-Report.pdf");
    setStep("submitted");
  };

  if (step === "gate") {
    return (
      <form onSubmit={handleGateSubmit} className="p-6 max-w-xl mx-auto bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Access the Free Assessment</h2>
        <p className="mb-4">Enter your name and email to begin.</p>
        <input
          type="text"
          required
          placeholder="Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          required
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Start Assessment
        </button>
      </form>
    );
  }

  if (step === "submitted") {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you, {form.name}!</h2>
        <p className="text-base">Your assessment has been submitted and downloaded. Please check your inbox for confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Team Accounting & Finance Maturity Assessment</h1>
      {questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-medium mb-2">{i + 1}. {q}</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`q${i}`}
                value="Yes"
                checked={form.responses[i] === "Yes"}
                onChange={() => handleChange(i, "Yes")}
                required
              /> Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name={`q${i}`}
                value="No"
                checked={form.responses[i] === "No"}
                onChange={() => handleChange(i, "No")}
              /> No
            </label>
          </div>
        </div>
      ))}
      <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        Submit & Download Report
      </button>
    </form>
  );
}
