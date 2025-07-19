import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {VITE_BASE_API_URL} from "@/env.ts";
import type {RecruitmentResponse} from "@/types/recruitment.type.ts";
import type {RecruitmentSchema} from "@/zod/validation.schema.ts";

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

export function useAddPendaftar(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (pendaftar: RecruitmentSchema) => {
      const response = await axios.post(
        `${VITE_BASE_API_URL}/api/recruitment`,
        pendaftar,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["recruitment"]});
    }
  })
}

export function useUpdatePendaftar(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({pendaftar, id}: { pendaftar: Partial<RecruitmentSchema>, id: string }) => {
      const response = await axios.put(
        `${VITE_BASE_API_URL}/api/recruitment/${id}`,
        pendaftar,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["recruitment"]});
    }
  })
}

export function useDeletePendaftar(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(
        `${VITE_BASE_API_URL}/api/recruitment/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["recruitment"]});
    }
  })
}