import axios from "axios";

const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/estimate`;

interface RequestPayload {
  text: string;
}

// interface ResponseData {
//   features: {
//     bed: number;
//     bath: number;
//     acre_lot: number;
//     house_size: number;
//     zip_code: number;
//   };
//   predictions: {
//     linearregression?: number;
//     ridge?: number;
//     lasso?: number;
//     randomforest?: number;
//     xgboost?: number;
//   };
//   aggregated: {
//     average: number;
//     median: number;
//     min: number;
//     max: number;
//     std_dev: number;
//     model_count: number;
//     original_count: number;
//   };
//   justification: string;
// }

interface ResponseData {
  message: string;
  justification: string;
  uuid: string;
  pdf_hash: string;
  tx_hash: string;
  pdf_base64: string;
  pdf_url: string;
}

export const fetchPriceEstimate = async (
  query: string
): Promise<ResponseData> => {
  const payload: RequestPayload = {
    text: query,
  };

  const response = await axios.post<ResponseData>(BACKEND_URL, payload);
  console.log(response);
  return response.data;
};
