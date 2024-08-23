import addressApi from '@/api/addressApi';
import userApi from '@/api/userApi';
import Spinner from '@/components/Spinner';
import schemas from '@/schemas';
import { fakeApi } from '@/utils/url';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddNewAddressForm = ({ onSubmit = () => {}, onClose = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedWardId, setSelectedWardId] = useState('');

  const [addressData, setAddressData] = useState({
    nation: 'Việt Nam',
    province: '',
    district: '',
    ward: '',
    detail: '',
    phoneReceiver: '',
    nameReceiver: '',
  });

  const [errors, setErrors] = useState({
    nation: '',
    province: '',
    district: '',
    detail: '',
    phoneReceiver: '',
    nameReceiver: '',
    ward: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
      setAddressData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectionChange = (e) => {
    const { name, value } = e.target;
    if (name && value) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
      const [index, id] = value?.split('-');
      if (name === 'province') {
        setSelectedProvinceId(value);
        setSelectedDistrictId('');
        setDistrictList([]);
        setSelectedWardId('');
        setWardList([]);
        setAddressData((prev) => ({
          ...prev,
          [name]: provinceList[index]?.name,
        }));
      } else if (name === 'district') {
        setSelectedDistrictId(value);
        setSelectedWardId('');
        setWardList([]);
        setAddressData((prev) => ({
          ...prev,
          [name]: districtList[index]?.name,
        }));
      } else if (name === 'ward') {
        setSelectedWardId(value);
        setAddressData((prev) => ({ ...prev, [name]: wardList[index]?.name }));
      }
    }
  };

  const isValidateData = async (data) => {
    let isValid = true;
    if (typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            [key]: 'Thông tin không được để trống',
          }));
          isValid = false;
        }
      });

      await schemas.phoneNumberSchema
        .validate(data.phoneReceiver)
        .then(() => {
          setErrors((prev) => ({ ...prev, phoneReceiver: '' }));
        })
        .catch((validationError) => {
          isValid = false;
          setErrors((prev) => ({
            ...prev,
            phoneReceiver: validationError.message,
          }));
        });

      return isValid;
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const isFormValid = await isValidateData(addressData);
    if (isFormValid) {
      setLoading(true);
      await userApi
        .createOneAddress(addressData)
        .then((response) => {
          toast.success('Thêm địa chỉ mới thành công', { autoClose: 1000 });
          if (response && response.result) {
            onSubmit(response.result);
          }
        })
        .catch((error) => {
          console.log('Failed to add new address at Create Order Page', error);
          toast.error('Có lỗi xảy ra, vui lòng thử lại.', { autoClose: 1000 });
        })
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (selectedProvinceId.trim()) {
      const [, provinceId] = selectedProvinceId?.split('-');
      addressApi
        .getDistrictsByProvinceId(provinceId)
        .then((response) => {
          setDistrictList(response);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedProvinceId]);

  useEffect(() => {
    if (selectedDistrictId.trim() && selectedProvinceId.trim()) {
      const [, districtId] = selectedDistrictId?.split('-');
      const [, provinceId] = selectedProvinceId?.split('-');
      addressApi
        .getWardByProvinceIdAndDistrictId(provinceId, districtId)
        .then((response) => {
          setWardList(response);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedDistrictId]);

  useEffect(() => {
    addressApi
      .getProvinces()
      .then((response) => {
        setProvinceList(response);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="w-full border border-[#f7f7f7] rounded p-[12px]">
      <form action="#" onSubmit={handleSubmitForm} className="space-y-3">
        <div className="flex flex-col md:flex-row gap-[12px]">
          <div className="form-control flex-1 flex flex-col gap-2">
            <input
              name="nameReceiver"
              type="text"
              placeholder="Họ tên người nhận..."
              className="duration-200 w-full p-[12px] text-[14px] outline-none border border-[#ccc] rounded placeholder:text-[#e7e7e7] focus:border-[#333] data-[error=true]:border-red-500"
              value={addressData.nameReceiver}
              onChange={handleInputChange}
              data-error={!!errors.nameReceiver}
            />
            {!!errors.nameReceiver && (
              <span className="text-[14px] text-red-600">
                {errors.nameReceiver}
              </span>
            )}
          </div>
          <div className="form-control flex-1">
            <input
              name="phoneReceiver"
              type="tel"
              placeholder="Số điện thoại..."
              className="duration-200 w-full p-[12px] text-[14px] outline-none border border-[#ccc] rounded placeholder:text-[#e7e7e7] focus:border-[#333] data-[error=true]:border-red-500"
              data-error={!!errors.phoneReceiver}
              value={addressData.phoneReceiver}
              onChange={handleInputChange}
            />
            {!!errors.phoneReceiver && (
              <span className="text-[14px] text-red-600">
                {errors.phoneReceiver}
              </span>
            )}
          </div>
        </div>
        {/* Address */}
        <div className="flex flex-col md:flex-row gap-[12px]">
          <div className="form-control flex-1">
            <select
              className="duration-200 w-full p-[12px] text-[14px] outline-none border border-[#ccc] rounded placeholder:text-[#e7e7e7] focus:border-[#333] data-[error=true]:border-red-500"
              name="province"
              id="province"
              value={selectedProvinceId}
              onChange={handleSelectionChange}
              data-error={!!errors.province}
            >
              <option value="" disabled>
                Chọn Tỉnh/Thành phố
              </option>
              {provinceList?.length &&
                provinceList.map((provinceData, index) => {
                  const { id, name } = provinceData;
                  return (
                    <option key={`province-${id}`} value={`${index}-${id}`}>
                      {name}
                    </option>
                  );
                })}
            </select>
            {!!errors.province && (
              <span className="text-[14px] text-red-600">
                {errors.province}
              </span>
            )}
          </div>
          <div className="form-control flex-1">
            <select
              className="duration-200 w-full p-[12px] text-[14px] outline-none border border-[#ccc] rounded placeholder:text-[#e7e7e7] focus:border-[#333] disabled:text-[#ccc] disabled:bg-[#f7f7f7] disabled:cursor-not-allowed data-[error=true]:border-red-500"
              name="district"
              id="district"
              value={selectedDistrictId}
              onChange={handleSelectionChange}
              data-error={!!errors.district}
              disabled={!districtList.length}
            >
              <option value="" disabled>
                Chọn Quận/Huyện
              </option>
              {districtList?.length &&
                districtList.map((districtData, index) => {
                  const { id, name } = districtData;
                  return (
                    <option key={`district-${id}`} value={`${index}-${id}`}>
                      {name}
                    </option>
                  );
                })}
            </select>
            {!!errors.district && (
              <span className="text-[14px] text-red-600">
                {errors.district}
              </span>
            )}
          </div>
          <div className="form-control flex-1">
            <select
              className="duration-200 w-full p-[12px] text-[14px] outline-none border border-[#ccc] rounded placeholder:text-[#e7e7e7] focus:border-[#333] disabled:text-[#ccc] disabled:bg-[#f7f7f7] disabled:cursor-not-allowed data-[error=true]:border-red-500"
              name="ward"
              id="ward"
              value={selectedWardId}
              onChange={handleSelectionChange}
              data-error={!!errors.ward}
              disabled={!wardList.length}
            >
              <option value="" disabled>
                Chọn Phường/Thị xã
              </option>
              {wardList?.length &&
                wardList.map((wardList, index) => {
                  const { id, name } = wardList;
                  return (
                    <option key={`ward-${id}`} value={`${index}-${id}`}>
                      {name}
                    </option>
                  );
                })}
            </select>
            {!!errors.ward && (
              <span className="text-[14px] text-red-600">{errors.ward}</span>
            )}
          </div>
        </div>
        <div className="form-control flex-1 flex flex-col gap-2">
          <input
            name="detail"
            type="text"
            placeholder="Địa chỉ chi tiết (Số nhà, tên đường,...)"
            className="duration-200 w-full p-[12px] text-[14px] outline-none border border-[#ccc] rounded placeholder:text-[#e7e7e7] focus:border-[#333] data-[error=true]:border-red-500"
            value={addressData.detail}
            onChange={handleInputChange}
            data-error={!!errors.detail}
          />
          {!!errors.detail && (
            <span className="text-[14px] text-red-600">{errors.detail}</span>
          )}
        </div>
        {/* Button */}
        <div className="flex flex-col gap-[12px]">
          <button
            className="duration-200 min-h-[50px] flex justify-center items-center p-[12px] bg-[var(--color-primary)] text-white hover:brightness-105 rounded disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <Spinner size={18} /> : <span>Thêm mới</span>}
          </button>
          <button
            className="duration-200 rounded p-[12px] hover:bg-[#f7f7f7]"
            onClick={onClose}
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewAddressForm;
