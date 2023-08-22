import {Donor} from "src/types/donors/Donor";
import {axiosClient} from "./initialization";

export const createDonor = async (data: Donor) => {
  return axiosClient.post("donors", data);
};

export const updateDonor = async (
  id: string,
  data: { name?: string | null; email?: string | null; phone?: string | null; isGodFather?: boolean | null }
) => {
  const dataToSend = {
    name: data.name === null ? undefined : data.name,
    email: data.email === null ? undefined : data.email,
    phone: data.phone === null ? undefined : data.phone,
    isGodFather: data.isGodFather === null ? undefined : data.isGodFather
  };

  return axiosClient.put("donors/" + id, dataToSend);
};
