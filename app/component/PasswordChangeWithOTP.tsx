"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios"; // Import Axios
export default function PasswordChangeWithOTP() {
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const { data: session } = useSession();
  // @ts-ignore
  const userEmail: string = session?.user?.email;
  // @ts-ignore
  const user_id: number = session?.user?.id;
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      if (!userEmail) {
        throw new Error("No email associated with your account");
      }
      const response = await fetch(`/api/routers/otp/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email: userEmail }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to send OTP");
      }
      setEmailSent(true);
      setIsModalOpen(true); // Open the modal for OTP verification
      setSuccessMessage("OTP sent successfully. Check your email.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send OTP"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch(`/api/routers/otp/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Match backend expectation
        },
        body: new URLSearchParams({
          email: userEmail,
          otp,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Invalid OTP");
      }
      setIsModalOpen(false); // Close the modal after successful OTP verification
      setSuccessMessage("OTP verified successfully!");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "OTP verification failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // const handlePasswordChange = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setErrorMessage("");
  //   setSuccessMessage("");

  //   try {
  //     // Validate that passwords match
  //     if (newPassword !== confirmPassword) {
  //       throw new Error("Passwords do not match");
  //     }

  //     // Prepare the request payload
  //     const requestBody = {
  //       password: newPassword, // Match the `UserPasswordUpdate` model
  //     };

  //     // Send the request to the backend using Axios
  //     const response = await axios.put(
  //       `/api/routers/user/update_user_password_by_email/${encodeURIComponent(userEmail)}`,
  //       requestBody, // Request body
  //       {
  //         headers: {
  //           "Content-Type": "application/json", // Backend expects JSON
  //         },
  //       }
  //     );

  //     // Handle success (204 No Content)
  //     if (response.status === 204) {
  //       setSuccessMessage("Password changed successfully!");
  //       // Reset form fields
  //       setNewPassword("");
  //       setConfirmPassword("");
  //       setEmailSent(false);
  //     } else {
  //       throw new Error("Unexpected response from server");
  //     }
  //   } catch (error) {
  //     // Handle errors
  //     if (axios.isAxiosError(error)) {
  //       // Axios-specific error handling
  //       const errorMessage =
  //         error.response?.data?.detail || "Password change failed";
  //       setErrorMessage(errorMessage);
  //     } else {
  //       // Generic error handling
  //       setErrorMessage(
  //         error instanceof Error ? error.message : "Password change failed"
  //       );
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      // Validate that passwords match
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Prepare the request payload
      const requestBody = {
        password: newPassword, // Match the `UserPasswordUpdate` model
      };

      // Send the request to the backend using Axios
      const response = await axios.put(
        `/api/routers/user/update_user_password_by_id/${user_id}`, // Updated endpoint with user_id
        requestBody, // Request body
        {
          headers: {
            "Content-Type": "application/json", // Backend expects JSON
          },
        }
      );

      // Handle success (204 No Content)
      if (response.status === 204) {
        setSuccessMessage("Password changed successfully!");
        // Reset form fields
        setNewPassword("");
        setConfirmPassword("");
        setEmailSent(false);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        const errorMessage =
          error.response?.data?.detail || "Password change failed";
        setErrorMessage(errorMessage);
      } else {
        // Generic error handling
        setErrorMessage(
          error instanceof Error ? error.message : "Password change failed"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* OTP Verification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-xl font-bold mb-4">Verify OTP</h3>
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              maxLength={6}
              pattern="\d{6}"
              title="Please enter a 6-digit number"
              required
            />
            <button
              onClick={handleVerifyOTP}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form
        onSubmit={emailSent ? handlePasswordChange : handleSendOTP}
        className="bg-white p-8 rounded-lg shadow-md w-96 relative z-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {emailSent ? "Change Password" : "Initiate Password Change"}
        </h2>
        {/* Messages */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
        {!emailSent ? (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-4">
              OTP will be sent to your registered email
              {/* <strong>{userEmail}</strong> */}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
                minLength={8}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
                minLength={8}
              />
            </div>
          </>
        )}
        <button
          type="submit"
          disabled={isLoading || (!emailSent && !userEmail)}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoading
            ? "Processing..."
            : emailSent
              ? "Change Password"
              : "Send OTP"}
        </button>
      </form>
    </div>
  );
}
