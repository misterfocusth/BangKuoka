import { Reservation } from "@/app/types/reservation";
import { Table, TableProps } from "antd";
import React, { useMemo } from "react";

interface EventParticipantTableProps {
  dataSource?: Reservation[] | null;
  searchValue: string;
}

interface DataType {
  key: string;
  name: string;
  email: string;
  phoneNumber: string;
  nationality: "TH" | "JP";
  address: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "ID",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Nationality",
    dataIndex: "nationality",
    key: "nationality",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const EventParticipantTable: React.FC<EventParticipantTableProps> = ({
  dataSource,
  searchValue,
}) => {
  const filteredDataSource = useMemo(
    () =>
      searchValue
        ? dataSource?.filter(
            (e) =>
              e.user?.first_name.includes(searchValue) || e.user?.last_name.includes(searchValue)
          )
        : dataSource,
    [searchValue, dataSource]
  );

  const tableData = filteredDataSource?.map((reservation) => ({
    key: reservation.id,
    name: reservation.user!.first_name + " " + reservation.user?.last_name,
    email: reservation.user!.email,
    phoneNumber: reservation.user!.phone_number,
    nationality: reservation.user!.nationality,
    address: reservation.user!.address,
  }));

  return (
    <div>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default EventParticipantTable;
