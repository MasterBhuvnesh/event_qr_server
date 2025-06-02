import QRCode from "qrcode";

export const generateQR = async (data: object): Promise<string> => {
  const str = JSON.stringify(data);
  return await QRCode.toDataURL(str);
};
