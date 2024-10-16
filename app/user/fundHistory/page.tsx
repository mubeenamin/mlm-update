import GetUserFund from "@/app/component/getUserFund";
import NewFundtransfer from "@/app/component/newFundtransfer";

export default function page() {
  return (
    <main>
      <div className="flex justify-end mb-4">
        {/* <NewFundtransfer /> */}
      </div>
      <GetUserFund />
    </main>
  );
}
