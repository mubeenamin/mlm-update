import GetFund from "@/app/component/getfund";
import NewFundtransfer from "@/app/component/newFundtransfer";


export default function page() {
  return(
    <main>
    <div className="flex justify-end mb-4">
      <NewFundtransfer/>
    
    </div>
    <GetFund />
    </main>
)}
