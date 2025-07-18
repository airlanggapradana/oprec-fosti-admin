import {useQuery} from "@tanstack/react-query";
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