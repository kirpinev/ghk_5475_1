import { SelectedId } from "@alfalab/core-components/tabs/typings";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      e: "event",
      action: string,
      variant_name: Record<string, string>,
    ) => void;
  }
}

type Payload = {
  is_alfa_smart: number;
  is_info_alfa_smart: number;
  payment_type: SelectedId;
  final_sum: string;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbz5bX938i8vw8fWSv_cy9jTe37wEucFaO9nwoq1wBow_PsanoiMNmQag95kNlo0CCjWAg/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({
          date,
          variant: "ghk_5475_1",
          form_name: "forms1",
          ...payload,
        }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Error!", error);
  }
};
