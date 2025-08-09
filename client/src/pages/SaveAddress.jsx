import React, { use, useState } from 'react'
import { useSelector } from 'react-redux';
import DeleteAddress from '../components/DeleteAddress';
import AddAddress from '../components/AddAddress';
import EditAddress from '../components/EditAddress';

const SaveAddress = () => {
  const addressList = useSelector(state => state.address.addressList);
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [addressId, setAddressId] = useState('');
  const [dataAddress, setDataAddress] = useState({});
  const [openAddAddress, setOpenAddAddress] = useState(false);


  return (
    <div className='w-full py-4 px-2'>
      <div className='grid gap-3'>
        {
          addressList[0] && addressList.map((address, index) => {
            return (
              <div key={index + address._id + "89"} className='bg-blue-50 p-4 border shadow-md md:flex gap-6 hover:bg-blue-100'>
                <div className='md:flex gap-6 md:w-[90%]'>
                  <div className='md:w-[50%]'>
                    <p className='text-sm text-neutral-600'>
                      <span className='font-semibold text-neutral-950'>Country: </span>
                      {address.country}
                    </p>
                    <p className='text-sm text-neutral-600'>
                      <span className='font-semibold text-neutral-950'>State: </span>
                      {address.state}
                    </p>
                    <p className='text-sm text-neutral-600'>
                      <span className='font-semibold text-neutral-950'>City: </span>
                      {address.city}
                    </p>
                    <p className='text-sm text-neutral-600'>
                      <span className='font-semibold text-neutral-950'>Pincode: </span>
                      {address.pincode}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-neutral-600'>
                      <span className='font-semibold text-neutral-950'>Street: </span>
                      {address.street}
                    </p>
                    <p className='text-sm text-neutral-600'>
                      <span className='font-semibold text-neutral-950'>Bilding: </span>
                      {address.bilding}
                    </p>
                    <p className='text-sm text-neutral-600'>
                      <span className='font-semibold text-neutral-950'>Address line: </span>
                      {address.address_line}
                    </p>
                    <p className='text-sm text-neutral-600'>
                      <span className='font-semibold text-neutral-950'>Mobile: </span>
                      {address.mobile}
                    </p>
                  </div>
                </div>
                <div className='grid  gap-6 ml-auto mt-6'>
                  <button
                    className='py-1 px-2 bg-green-700 hover:bg-green-600 text-white text-xs rounded-md'
                    onClick={() => {
                      setEditAddress(true)
                      setDataAddress(address)
                      setAddressId(address._id)
                    }}>
                    Update
                  </button>
                  <button
                    className='py-1 px-2 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md'
                    onClick={() => {
                      setDeleteAddress(true)
                      setAddressId(address._id)
                    }}>
                    Delete
                  </button>
                </div>
              </div>
            )
          })
        }
        <div
          className='h-16 bg-blue-50 border-2 border-dashed flex items-center justify-center cursor-pointer shadow-md'
          onClick={() => setOpenAddAddress(true)}>
          Add Address
        </div>
      </div>
      {
        openAddAddress && (
          <AddAddress close={() => setOpenAddAddress(false)} />
        )
      }
      {
        editAddress && (
          <EditAddress
            address={dataAddress}
            _id={addressId}
            close={() => setEditAddress(false)}
          />
        )
      }
      {
        deleteAddress && (
          <DeleteAddress
            _id={addressId}
            close={() => { setDeleteAddress(false) }}
          />
        )
      }
    </div>
  )
}

export default SaveAddress