interface ManageEventIdPageParams {
  id: string;
}

const ManageEventIdPage = ({ params }: { params: ManageEventIdPageParams }) => {
  return <div>{params.id}</div>;
};

export default ManageEventIdPage;
