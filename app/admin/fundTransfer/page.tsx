import GetFund from "@/app/component/getfund";
import NewFundTransfer from "@/app/component/newFundtransfer";

export default function page() {
  return (
    <main>
      <div className="flex justify-end mb-4">
        <NewFundTransfer />
      </div>
      <GetFund />
    </main>
  );
}
