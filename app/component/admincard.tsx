import Image from "next/image";
type data = {
  cardName: string;
  amount: number;
};

const AdminCard = ({ data }: { data: data }) => {
  return (
    <div className="rounded-2xl odd:bg-mlmSky text-mlmSkyBg even:bg-mlmSkyLight p-4 flex-1 min-w-[130px]">
      <h1 className="text-2xl font-semibold my-4">{data.amount}</h1>
      <h2 className="capitalize text-sm font-medium text-mlmSkyBg">
        {data.cardName}s
      </h2>
    </div>
  );
};

export default AdminCard;
