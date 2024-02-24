import { Event } from "@/app/types/event";
import { useRouter } from "@/navigation";
import { Button, Space, Table, TableProps } from "antd";
import React, { useMemo, useState } from "react";

interface OrganizerEventTableProps {
  dataSource?: Event[];
  sortingOption: "ASD" | "DESC";
  searchValue: string;
}

interface DataType {
  key: string;
  eventName: string;
  eventLocation: string;
  startDateTime: Date;
  endDateTime: Date;
  participantsNum: number;
  isAvailableReservation: boolean;
}

const OrganizerEventTable: React.FC<OrganizerEventTableProps> = ({
  dataSource,
  searchValue,
  sortingOption,
}) => {
  //   const [filteredDataSource, setFilteredDataSource] = useState(
  //     searchValue ? dataSource?.filter((e) => e.event_name.includes(searchValue)) : dataSource
  //   );

  const router = useRouter();

  const filteredDataSource = useMemo(
    () =>
      searchValue ? dataSource?.filter((e) => e.event_name.includes(searchValue)) : dataSource,
    [searchValue, dataSource]
  );

  let tableData = filteredDataSource
    ?.map((event) => ({
      key: event.id,
      eventName: event.event_name,
      eventLocation: event.loc_address,
      startDateTime: event.start_date,
      endDateTime: new Date(event.end_date),
      participantsNum: event.participant_num,
      isAvailableReservation: event.is_allow_reserve,
    }))
    .sort((a, b) =>
      sortingOption === "ASD"
        ? a.startDateTime.getTime() - b.startDateTime.getTime()
        : b.startDateTime.getTime() - a.startDateTime.getTime()
    );

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      render: (name, record) => (
        <a onClick={() => router.push("/organizer/event/manage/" + record.key)}>{name}</a>
      ),
    },
    {
      title: "Event Location",
      dataIndex: "eventLocation",
      key: "eventLocation",
    },
    {
      title: "Start Time",
      dataIndex: "startDateTime",
      key: "startDateTime",
      render: (value: Date) => (
        <div>{value.toLocaleDateString("en-US") + " " + value.toLocaleTimeString("en-US")}</div>
      ),
    },
    {
      title: "End Time",
      dataIndex: "endDateTime",
      key: "endDateTime",
      render: (value: Date) => (
        <div>{value.toLocaleDateString("en-US") + " " + value.toLocaleTimeString("en-US")}</div>
      ),
    },
    {
      title: "Participant(s)",
      dataIndex: "participantsNum",
      key: "participantsNum",
    },
    {
      title: "Status",
      dataIndex: "isAvailableReservation",
      key: "isAvailableReservation",
      render: (_, record) =>
        record.isAvailableReservation ? (
          <div className="text-green-500">Available</div>
        ) : (
          <div className="text-red-500">Not Available</div>
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size={"middle"}>
          <Button onClick={() => router.push("/organizer/event/manage/" + record.key)}>
            Manage / Stats
          </Button>
          <Button onClick={() => router.push("/organizer/event/edit/" + record.key)}>Edit</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default OrganizerEventTable;
