// "use client"; // Ensures this is a Client Component

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { AiOutlineCheckCircle } from "react-icons/ai";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

// // Type definitions for order data
// interface OrderItem {
//   name: string;
//   quantity: number;
//   price: number;
//   discount?: number;
//   color: string;
//   size: string;
// }

// interface ShippingAddress {
//   fullName: string;
//   address: string;
//   phoneNumber: string;
//   country: string;
// }

// interface PaymentDetails {
//   method: string;
// }

// interface OrderData {
//   orderNumber: string;
//   orderDate: string;
//   totalAmount: number;
//   shippingCharge: number;
//   paymentDetails: PaymentDetails;
//   shippingAddress: ShippingAddress;
//   items: OrderItem[];
// }

// const OrderSuccess: React.FC = () => {
//   const [orderData, setOrderData] = useState<OrderData | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Retrieve the order data from local storage
//     const data = localStorage.getItem("orderData");
//     if (data) {
//       setOrderData(JSON.parse(data) as OrderData);
//       // Optionally, remove the data from local storage after retrieval
//       localStorage.removeItem("orderData");
//     }
//   }, []);

//   // Function to download the order summary as a PDF
//   const downloadAsPDF = async () => {
//     if (!orderData) return;

//     const element = document.getElementById("order-summary");
//     if (!element) return;

//     // Convert HTML to canvas and generate a PDF
//     const canvas = await html2canvas(element);
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`Order_${orderData.orderNumber}.pdf`);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
//       <div
//         id="order-summary"
//         className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl text-center"
//       >
//         <AiOutlineCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
//         <h1 className="text-2xl font-bold text-gray-800 mb-2">
//           Order Placed Successfully!
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Thank you for your purchase. Your order has been placed successfully.
//         </p>

//         {orderData ? (
//           <div className="text-left">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Order Summary
//             </h2>
//             <div className="bg-gray-100 p-4 rounded-lg mb-6">
//               <p className="text-gray-700">
//                 <strong>Order Number:</strong> {orderData.orderNumber}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Order Date:</strong>{" "}
//                 {new Date(orderData.orderDate).toLocaleDateString()}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Total Amount:</strong> $
//                 {orderData.totalAmount.toFixed(2)}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Shipping Charge:</strong> $
//                 {orderData.shippingCharge.toFixed(2)}
//               </p>
//               <p className="text-gray-700">
//                 <strong>Payment Method:</strong>{" "}
//                 {orderData.paymentDetails.method}
//               </p>
//             </div>

//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Shipping Address
//             </h3>
//             <div className="bg-gray-100 p-4 rounded-lg mb-6">
//               <p className="text-gray-700">
//                 {orderData.shippingAddress.fullName}
//               </p>
//               <p className="text-gray-700">
//                 {orderData.shippingAddress.address}
//               </p>
//               <p className="text-gray-700">
//                 Phone: {orderData.shippingAddress.phoneNumber}
//               </p>
//               <p className="text-gray-700">
//                 Country: {orderData.shippingAddress.country}
//               </p>
//             </div>

//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Ordered Items
//             </h3>
//             <ul className="bg-gray-100 p-4 rounded-lg">
//               {orderData.items.map((item, index) => (
//                 <li key={index} className="border-b border-gray-300 py-2">
//                   <p className="text-gray-700">
//                     <strong>{item.name}</strong> (Qty: {item.quantity})
//                   </p>
//                   <p className="text-gray-600">
//                     Price: ${item.price.toFixed(2)}
//                   </p>
//                   {item.discount && (
//                     <p className="text-gray-600">Discount: {item.discount}%</p>
//                   )}
//                   <p className="text-gray-600">
//                     Color: {item.color}, Size: {item.size}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           <p className="text-gray-600">No order data available.</p>
//         )}

//         <Button
//           className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
//           onClick={downloadAsPDF}
//         >
//           Download as PDF
//         </Button>

//         <Button
//           className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//           onClick={() => router.push("/")}
//         >
//           Continue Shopping
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default OrderSuccess;

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiDownload } from "react-icons/fi"; // Icon for the download button
import jsPDF from "jspdf"; // Importing jsPDF for PDF generation
import "jspdf-autotable"; // Importing autoTable plugin

const OrderSuccess = () => {
  const [orderData, setOrderData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("orderData");
    if (data) {
      setOrderData(JSON.parse(data));
      localStorage.removeItem("orderData");
    }
  }, []);

  const downloadPDF = () => {
    if (!orderData) return;

    const doc = new jsPDF();
    doc.text("Order Summary", 20, 10);
    doc.autoTable({
      startY: 20,
      head: [
        [
          "Order Number",
          "Order Date",
          "Total Amount",
          "Shipping Charge",
          "Payment Method",
        ],
      ],
      body: [
        [
          orderData.orderNumber,
          new Date(orderData.orderDate).toLocaleDateString(),
          `$${orderData.totalAmount.toFixed(2)}`,
          `$${orderData.shippingCharge.toFixed(2)}`,
          orderData.paymentDetails.method,
        ],
      ],
    });

    doc.text("Shipping Address", 20, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      body: [
        [
          orderData.shippingAddress.fullName,
          orderData.shippingAddress.address,
          `Phone: ${orderData.shippingAddress.phoneNumber}`,
          `Country: ${orderData.shippingAddress.country}`,
        ],
      ],
    });

    doc.text("Ordered Items", 20, doc.lastAutoTable.finalY + 10);
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Item Name", "Quantity", "Price", "Discount", "Color", "Size"]],
      body: orderData.items.map((item: any) => [
        item.name,
        item.quantity,
        `$${item.price.toFixed(2)}`,
        item.discount ? `${item.discount}%` : "N/A",
        item.color,
        item.size,
      ]),
    });

    doc.save(`Order_${orderData.orderNumber}.pdf`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl text-center">
        <AiOutlineCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {orderData ? (
          <div className="text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                <strong>Order Number:</strong> {orderData.orderNumber}
              </p>
              <p className="text-gray-700">
                <strong>Order Date:</strong>{" "}
                {new Date(orderData.orderDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Total Amount:</strong> $
                {orderData.totalAmount.toFixed(2)}
              </p>
              <p className="text-gray-700">
                <strong>Shipping Charge:</strong> $
                {orderData.shippingCharge.toFixed(2)}
              </p>
              <p className="text-gray-700">
                <strong>Payment Method:</strong>{" "}
                {orderData.paymentDetails.method}
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Shipping Address
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                {orderData.shippingAddress.fullName}
              </p>
              <p className="text-gray-700">
                {orderData.shippingAddress.address}
              </p>
              <p className="text-gray-700">
                Phone: {orderData.shippingAddress.phoneNumber}
              </p>
              <p className="text-gray-700">
                Country: {orderData.shippingAddress.country}
              </p>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Ordered Items
            </h3>
            <ul className="bg-gray-100 p-4 rounded-lg">
              {orderData.items.map((item: any, index: number) => (
                <li key={index} className="border-b border-gray-300 py-2">
                  <p className="text-gray-700">
                    <strong>{item.name}</strong> (Qty: {item.quantity})
                  </p>
                  <p className="text-gray-600">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  {item.discount && (
                    <p className="text-gray-600">Discount: {item.discount}%</p>
                  )}
                  <p className="text-gray-600">
                    Color: {item.color}, Size: {item.size}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-600">No order data available.</p>
        )}

        <Button
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/")}
        >
          Continue Shopping
        </Button>

        <Button
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          onClick={downloadPDF}
        >
          <FiDownload className="mr-2" />
          Download as PDF
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
