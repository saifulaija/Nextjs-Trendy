
import { ShoppingCart } from "lucide-react";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <ShoppingCart size={48} className="text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700">
        Your Cart is Empty
      </h2>
      <p className="text-gray-500 mt-2">
        Looks like you haven't added anything to your cart yet.
      </p>
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => (window.location.href = "/shop")}
      >
        Start Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
