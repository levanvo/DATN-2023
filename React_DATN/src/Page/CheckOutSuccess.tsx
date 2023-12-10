import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useLocation  } from 'react-router-dom';
import { useAddOrderMutation } from "../Services/Api_Order"

const CheckOutSuccess = () => {
    const location = useLocation();    
    const [addOrder, { error }] = useAddOrderMutation();
    const [statusOrder, setStatusOrder] = useState(true);
    const contentSuccess = {
        title: 'Bạn đã thanh toán thành công !',
        image: "https://npay-214706.as.r.appspot.com/npay/660_0/cong-thanh-toan-la-gi-loi-ich-cua-cong-thanh-toan-dien-tu-1676616433.jpg",
    };

    const contentFail = {
        title: 'Bạn đã thanh toán thất bại!',
        image: "https://hieugoogle.vn/wp-content/uploads/that-bai-la-gi.jpg",
    };

    useEffect(() => {
        // Tạo một đối tượng URLSearchParams từ chuỗi truy vấn của URL   
        const fetchData = async () => {
            if (location.search.includes('vnp_ResponseCode=00')) {
                let orderDataString = localStorage.getItem('orderData')
                if(orderDataString){
                    let dataOrder = JSON.parse(orderDataString);
                    await addOrder(dataOrder)
                }
                setStatusOrder(true);
                localStorage.removeItem('orderData');
            } else {
                setStatusOrder(false);
            }
        }     

        fetchData();
    },[location.search]);

    
    return (
        <div className='w-[90vw] mx-auto mt-44'>
            <div className="wapper text-center">
                <h1>{statusOrder ? contentSuccess.title : contentFail.title}</h1>
                <img className='m-auto' src={`${statusOrder ? contentSuccess.image : contentFail.image}`} alt="" />
            </div>
        </div>
    )
}

export default CheckOutSuccess