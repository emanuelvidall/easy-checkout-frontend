import axiosInstance from "@/lib/axios-instance";

export class PaymentService {
  static async checkPaymentStatus(paymentId: string): Promise<{
    status: string;
    details: string;
  }> {
    try {
      const response = await axiosInstance.get("/payment/status", {
        params: { id: paymentId },
      });
      return response.data;
    } catch (error) {
      console.error("Error checking payment status:", error);
      throw new Error("Failed to check payment status");
    }
  }
}
