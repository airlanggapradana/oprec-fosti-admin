import {useMutation, useQueryClient, queryOptions} from "@tanstack/react-query";
import axios from "axios";
import {VITE_BASE_API_URL, VITE_PUBLIC_KEY, VITE_SERVICE_ID, VITE_TEMPLATE_ID} from "@/env.ts";
import type {RecruitmentResponse} from "@/types/recruitment.type.ts";
import type {RecruitmentSchema} from "@/zod/validation.schema.ts";
import type {SeleksiResponse} from "@/types/seleksi.type.ts";

export function useFetchRecruitment(token: string, page?: number, limit?: number) {
  return queryOptions({
    queryKey: ["recruitment", {page, limit}],
    queryFn: async () => {
      const url = `${VITE_BASE_API_URL}/api/recruitment${(page !== undefined && limit !== undefined) ? `?limit=${limit}&page=${page}` : ""}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        method: "GET",
      }).then(res => res.data as RecruitmentResponse);
      return response;
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

export function useAddPendaftar(token: string, setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>) {
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
      setIsAddDialogOpen(false); // Close the dialog after successful addition
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

export function useSeleksiPendaftar(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axios.put(
          `${VITE_BASE_API_URL}/api/recruitment/seleksi/${id}`,
          {
            status: "ACCEPTED"
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            method: "PUT"
          },
        ).then(res => res.data as SeleksiResponse);

        await axios.post(`https://api.emailjs.com/api/v1.0/email/send`, {
          service_id: VITE_SERVICE_ID,
          template_id: VITE_TEMPLATE_ID,
          user_id: VITE_PUBLIC_KEY,
          template_params: {
            nama: response.data.nama,
            email: response.data.email,
          }
        })
      } catch (e) {
        throw new Error(`Error during selection: ${e instanceof Error ? e.message : "Unknown error"}`);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["recruitment"]});
    }
  })
}