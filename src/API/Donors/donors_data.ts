import {Donor} from "src/types/donors/Donor";
import {axiosClient} from "./initialization";

export const createDonor = async (data: Donor) => {
  return axiosClient.post("donors", data);
};

export const updateDonor = async (
  id: string,
  data: { name?: string | null; email?: string | null; phone?: string | null; isGodFather?: boolean | null, mercadoPagoEmail?: string | null;}
) => {
  const dataToSend = {
    name: !data.name ? undefined : data.name,
    email: !data.email ? undefined : data.email,
    phone: !data.phone ? undefined : data.phone,
    mercadoPagoEmail: !data.mercadoPagoEmail ? undefined : data.mercadoPagoEmail,
    isGodFather: !data.isGodFather ? undefined : data.isGodFather
  };

  return axiosClient.put("donors/" + id, dataToSend);
};
