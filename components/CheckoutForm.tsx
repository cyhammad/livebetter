import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import classNames from "classnames";
import { Taxi } from "phosphor-react";
import { FormEvent, KeyboardEvent, MouseEvent, useState } from "react";

import { ModalButtons } from "components/ModalButtons";

interface CheckoutFormProps {
  onRequestPrevious?: (event?: MouseEvent | KeyboardEvent) => void;
  total: number;
}

export const CheckoutForm = ({
  onRequestPrevious,
  total,
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return null;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/order-confirmation`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <PaymentElement />
      {message ? (
        <p className="text-amber-600 text-sm sm:text-base font-semibold">
          {message}
        </p>
      ) : null}
      <div
        className="
          z-30 flex flex-col gap-3 justify-between
          p-4 sm:p-6 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6
          bg-white sticky
          bottom-0 border-t border-gray-200
        "
      >
        <ModalButtons
          secondaryButtonLabel="Back"
          secondaryButtonProps={{ onClick: onRequestPrevious }}
          primaryButtonLabel={
            <>
              <span className="flex items-center gap-2">
                <Taxi
                  color="currentColor"
                  size={24}
                  weight="bold"
                  className="w-6 h-6"
                />
                <span className="flex-none">Place order</span>
              </span>
              <span className="bg-white/20 px-2 py-1 rounded">
                ${total.toFixed(2)}
              </span>
            </>
          }
          primaryButtonProps={{
            className: classNames({
              "opacity-50":
                process.env.NODE_ENV === "production" ||
                !stripe ||
                !elements ||
                isLoading,
            }),
            disabled:
              process.env.NODE_ENV === "production" ||
              !stripe ||
              !elements ||
              isLoading,
            type: "submit",
          }}
        />
      </div>
    </form>
  );
};
