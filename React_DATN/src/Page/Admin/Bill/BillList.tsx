import React, { useState } from 'react';
import { Divider, Select, Table, message } from 'antd';
import { useGetAllOrdersQuery, useUpdateOrderMutation } from '../../../Services/Api_Order';
import { IOrder } from '../../../Models/interfaces';
import Loading from '../../../Component/Loading';
import { Link } from 'react-router-dom';
import { Option } from 'antd/es/mentions';
import moment from 'moment';
import Input from 'antd/es/input/Input';
import { deburr } from 'lodash';

const BillList = () => {
  const { data, isLoading, error } = useGetAllOrdersQuery(undefined);

  const [filterStatus, setFilterStatus] = useState('');

  const [filterNameOrCode, setFilterNameOrCode] = useState('');

  const dataSource = data?.map((order: IOrder) => ({
    key: order._id,
    code_order: order?.code_order,
    userId: order?.userId?.username || "Khách hàng",
    createdAt: moment(order?.createdAt).format('HH:mm | DD-MM-YYYY'),
    status: order?.status,
  }));

  const [updateOrder] = useUpdateOrderMutation();

  const handleStatusChange = (value: string, orderId: string) => {
    updateOrder({ _id: orderId, status: value }).unwrap().then(() => {
      console.log("Trạng thái đã được cập nhật thành công.");
      message.success("Trạng thái đã được cập nhật thành công.");
    }).catch((error) => {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    });
  };

  const handleNameOrCodeFilter = (e) => {
    const filterValue = deburr(e.target?.value); // Loại bỏ các dấu trong chuỗi
    setFilterNameOrCode(filterValue);
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'code_order',
      key: 'code_order',
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: any, record: IOrder) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(value, record.key)}
          style={{ width: 150 }}
        >
          <Option value="0">Đang chờ xác nhận</Option>
          <Option value="1">Đã xác nhận</Option>
          <Option value="2">Đã hủy</Option>
          <Option value="3">Đang giao hàng</Option>
          <Option value="4">Đã nhận hàng</Option>
        </Select>
      ),
    },
    {
      title: 'Hành động',
      render: (record: any) => (
        <Link to={`/admin/bill/detail/${record.key}`}>Chi tiết</Link>
      ),
      key: 'actions',
    },
  ];

  const handleStatusFilter = (value: string) => {
    setFilterStatus(value);
  };

  const filteredData = dataSource?.filter((order: IOrder) => {
    const matchStatus = !filterStatus || order.status === filterStatus;
    const matchNameOrCode =
      !filterNameOrCode ||
      deburr(order.code_order.toLowerCase()).includes(deburr(filterNameOrCode.toLowerCase())) ||
      deburr(order.userId.toLowerCase()).includes(deburr(filterNameOrCode.toLowerCase()));
    return matchStatus && matchNameOrCode;
  });

  return (
    <div>
      <Divider />

      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'end' }}>
        <div>
          <span style={{ marginRight: '8px' }}>Tìm kiếm đơn hàng:</span>
          <Input
            value={filterNameOrCode}
            onChange={handleNameOrCodeFilter}
            style={{ width: 150 }}
          />
        </div>

        <div>
          <span style={{ marginRight: '8px', marginLeft: 50 }}>Lọc theo trạng thái:</span>
          <Select
            value={filterStatus}
            onChange={handleStatusFilter}
            style={{ width: 150 }}
          >
            <Option value="">Tất cả</Option>
            <Option value="0">Đang chờ xác nhận</Option>
            <Option value="1">Đã xác nhận</Option>
            <Option value="2">Đã hủy</Option>
            <Option value="3">Đang giao hàng</Option>
            <Option value="4">Đã nhận hàng</Option>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Table columns={columns} dataSource={filteredData} />
        </>
      )}
    </div>
  );
};

export default BillList;