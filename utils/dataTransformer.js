export const transformData = (data) => {
  console.log(data);
    return {
      Manufacturing_Year: data.Manufacturing_Year || "",
      VC_Code: data.VC_Code || "",
      ppl: data.ppl || "",
      fuel_type: data.fuel_type || "",
      variant: data.variant || "",
      colour: data.color || "",
      Ex_Showroom_Price: data.Ex_Showroom_Price || "",
      Corporate_Offer_Top: data.Corporate_Offer_Top || "",
      additional: data.additional || "",
      RTO_Normal: data.RTO_Normal || "",
      Corporate_Offer: data.Corporate_Offer || "",
      other1: data.additional || "",
      RTO_Normal_scrap: data.RTO_Normal_scrap || "",
      RT_BH: data.RT_BH || "",
      RT_TRC: data.RT_TRC || "",
      insurance: data.insurances?.[0]?.insurance1 || "",
      quantity: data.quantity || "",
      color: data.color || "",

      insurance_details: data.insurances.reduce((acc, item, index) => {
        acc[`insurance${index + 1}`] = item.insurance;
        acc[`price${index + 1}`] = item.price;
        return acc;
      }, {}),

      Accessories:  data.accessories.reduce((acc, item, index) => {
        acc[`accessories_name${index + 1}`] = item.accessories_name;
        acc[`accessories_price${index + 1}`] = item.accessories_price;
        return acc;
      }, {}),

      VAS_data:  data.vas.reduce((acc, item, index) => {
        acc[`VAS_Name${index + 1}`] = item.VAS_Name;
        acc[`VAS_price${index + 1}`] = item.VAS_price;
        return acc;
      }, {}),


    };
  };
  