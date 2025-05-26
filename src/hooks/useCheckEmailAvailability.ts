import { useState } from "react";
import axios from "axios";

type TStatus = "idle" | "checking" | "available" | "unavailable" | "failed";

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<TStatus>("idle");

  const [enteredEmail, setEnteredEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEmailAvailabilityStatus("checking");
    setEnteredEmail(email);

    try {
      const { data } = await axios.get(
        "https://serverjson-production.up.railway.app/users"
      );
      const isEmailAvailable = data.filter(
        (user: { email: string }) => user.email === email
      );
      if (!data.length) {
        setEmailAvailabilityStatus("available");
      } else if (!isEmailAvailable.length) {
        setEmailAvailabilityStatus("available");
      } else {
        setEmailAvailabilityStatus("unavailable");
      }
    } catch (error) {
      setEmailAvailabilityStatus("failed");
    }
  };
  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setEnteredEmail(null);
  };

  return {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  };
};

export default useCheckEmailAvailability;
