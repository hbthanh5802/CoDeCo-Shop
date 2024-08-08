import axios from 'axios';

const addressBaseUrl = import.meta.env.VITE_ADDRESS_API_URL;
const addressApi = {};
const addressType = { MIEN: '1', TINH: '2', HUYEN: '3', XA: '4' };
const bodyCondition = {
  ma: '',
  ten: '',
  canCu: '',
  ngayVb: '',
  ngayTao: '',
  nguoiTao: '',
  maCha: '',
  maCu: '',
  maV: '',
  maT: '',
  maH: '',
  maX: '',
  loai: '',
  valid: '1',
  ngayHl: '',
  ngayKt: '',
  ngaySd: '',
  nguoiSd: '',
  ngayGd: '',
  nguoiGd: '',
  ngayKp: '',
  ngayDm: '',
  lyDo: '',
  start: 0,
  sizePerPage: 999999,
};

const prepareResponseData = (dataList = []) => {
  return dataList.map((item, index) => {
    const { ma, ten, maV, maT, maH, maX, loai } = item;
    return {
      id: ma,
      name: ten,
      regionId: maV,
      provinceId: maT,
      districtId: maH,
      wardId: maX,
      addressType: loai,
    };
  });
};

addressApi.getProvinces = async () => {
  try {
    const body = { ...bodyCondition, loai: addressType.TINH };
    const response = await axios.post(addressBaseUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response && response.data)
      return prepareResponseData(response.data.dataList);
    return response;
  } catch (error) {
    throw error;
  }
};

addressApi.getDistrictsByProvinceId = async (provinceId) => {
  try {
    const body = {
      ...bodyCondition,
      loai: addressType.HUYEN,
      maT: provinceId,
    };
    const response = await axios.post(addressBaseUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response && response.data)
      return prepareResponseData(response.data.dataList);
    return response;
  } catch (error) {
    throw error;
  }
};

addressApi.getWardByProvinceIdAndDistrictId = async (
  provinceId,
  districtId
) => {
  try {
    const body = {
      ...bodyCondition,
      loai: addressType.XA,
      maT: `${provinceId}`,
      maH: `${districtId}`,
    };
    const response = await axios.post(addressBaseUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response && response.data)
      return prepareResponseData(response.data.dataList);
    return response;
  } catch (error) {
    throw error;
  }
};

export default addressApi;
