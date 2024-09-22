"use client";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ExchangeComplaint = () => {
  return (
    <div className="w-full py-6 px-6">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-primary">
          Exchange & Complaint
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          We're committed to resolving your issues quickly and efficiently.
        </p>
      </div>

      {/* Exchange Section */}
      <Card className="max-w-4xl mx-auto  p-8 mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Exchange Policy
        </h2>
        <Separator className="mb-6" />

        <div className="space-y-4">
          <p className="text-gray-700">
            <strong>Exchange is applicable:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>For size issues.</li>
            <li>
              For mistakes on our end, such as sending the wrong or damaged
              product.
            </li>
          </ul>

          <p className="text-gray-700">
            <strong>Exchange must be requested:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Within 3 days from the date you received the product.</li>
          </ul>

          <p className="text-gray-700">
            <strong>How to request an exchange:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              Send a short video of the product through WhatsApp to our customer
              support at <strong>+8801324250470</strong>.
            </li>
            <li>Don't forget to include your order ID in the video message.</li>
          </ul>

          <p className="text-gray-700">
            <strong>Delivery Cost:</strong> Customers must bear the delivery
            cost if the issue is not due to our mistake.
          </p>
        </div>
      </Card>

      {/* Complaint Section */}
      <Card className={cn("max-w-4xl mx-auto  p-8 ")}>
        <h2 className="text-2xl font-semibold text-primary mb-4">
          Complaint Procedure
        </h2>
        <Separator className="mb-6" />

        <div className="space-y-4">
          <p className="text-gray-700">
            For quick support, please contact us through:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <strong>Call Support:</strong> Reach us at{" "}
              <strong>+88001821117913</strong> for immediate assistance.
            </li>
            <li>
              <strong>WhatsApp:</strong> Submit your complaint through WhatsApp
              at <strong>+88001821117913</strong>.
            </li>
            <li>
              <strong>Facebook Page:</strong> You can also message us through
              our Facebook page inbox.
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default ExchangeComplaint;
