import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {VITE_BASE_API_URL} from "@/env.ts";
import type {RecruitmentResponse} from "@/types/recruitment.type.ts";

export function useFetchRecruitment(token: string) {
  return useQuery({
    queryKey: ["recruitment"],
    queryFn: async () => {
      const response = await axios.get(`${VITE_BASE_API_URL}/api/recruitment`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        method: "GET",
      }).then(res => res.data as RecruitmentResponse);
      return response.data;
    }
  })
}

export function useExportAsExcel(token: string) {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `${VITE_BASE_API_URL}/api/excel/export`,
        {
          responseType: "blob", // Important for handling binary data
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "DataOprecFOSTI_2025.xlsx"); // Set the file name
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  })
}